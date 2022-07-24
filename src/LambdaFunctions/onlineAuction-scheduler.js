
const AWS = require('aws-sdk');
const { error } = require('console');
const { callbackify } = require('util');
const { DynamoDB } = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'Products';

exports.handler = async (event, ctx, callback) => {
  let currentTime = new Date().getTime();
  currentTime = Number(currentTime);
  
  console.log('currentTime', currentTime);

  let scannedItems = [];

  const params = {
    TableName: dynamodbTableName
  }

  var allProducts = [];
  allProducts = await scanDynamoRecords(params, []);
  var filteredProducts = [];
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].sold === false) {
      console.log(currentTime - (Number(allProducts[i].timeathighestbid)))
      if (currentTime - (Number(allProducts[i].timeathighestbid)) >= 14400000)
        filteredProducts.push(allProducts[i])
    }
  }
  
  console.log('filteredProducts.length', filteredProducts.length)
  console.log(filteredProducts);
  
  for (let i = 0; i < filteredProducts.length; i++) {
    markProductSold(filteredProducts[i].productId, currentTime)
  }
  
  const body = {
    filteredProducts: filteredProducts
  }
  return buildResponse(200, filteredProducts);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch (error) {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  }
}

async function markProductSold(productId, timewhensold) {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'productId': productId
        },
        UpdateExpression: `set sold = :sold, timewhensold =:timewhensold`,

        ExpressionAttributeValues: {
            ':timewhensold': timewhensold,
            ':sold': true,
        },
        ReturnValues: 'UPDATED_NEW'
    
    }
    return await dynamodb.update(params).promise().then((response) => {
        const body = {
            Operation: 'UPDATE',
            Message: 'SUCCESS',
            UpdatedAttributes: response
          }
        return buildResponse(200, body);
    }, (error) => {
        console.error("Unable to record the bid", error);
    })
}


function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PATCH"
    },
    body: JSON.stringify(body),
    "isBase64Encoded": false
  }
}