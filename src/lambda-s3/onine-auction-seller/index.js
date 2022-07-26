const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const dynamodbTableName = 'Products';
const healthPath = '/seller-health';
const productPath = '/product';
const productsPath = '/auction-products';

exports.handler = async function(event) {
    console.log('Request event: ', event);
    let response;
    switch(true) {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = buildResponse(200);
            break;
        case event.httpMethod === 'GET' && event.path === productPath:
            response = await getProduct(event.queryStringParameters.productId);
            break;
        case event.httpMethod === 'GET' && event.path === productsPath:
            response = await getProducts();
            break;
        case event.httpMethod === 'POST' && event.path === productPath:
            response = await saveProduct(JSON.parse(event.body));
            break;
        case event.httpMethod === 'PATCH' && event.path === productPath:
            const requestBody = JSON.parse(event.body)
            response = await modifyProduct(requestBody.productId, requestBody.updateKey, requestBody.updateValue);
            break;
        case event.httpMethod === 'DELETE' && event.path === productPath:
            response = await deleteProduct(JSON.parse(event.body).productId);
            break;
        default:
            response = buildResponse(404, '404 Not Found');
            break;
    }
    return response;
}

async function getProduct(productId) {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'productId': productId
        }
    }
    return dynamodb.get(params).promise().then((response) => {
        return buildResponse(200, response.Item);
    }, (error) => {
        console.error('Error while getting product: ', error);
    });
}

async function getProducts() {
    const params = {
        TableName: dynamodbTableName
    }
    const allProducts = await scanDynamoRecords(params, []);
    const body = {
        products: allProducts
    }
    return buildResponse(200, body);
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

async function saveProduct(requestBody) {
    requestBody.productId = AWS.util.uuid.v4();
    requestBody.category = "test";
      const resultUrl =   await saveImageToS3(requestBody.productId, requestBody.imgString)
      delete requestBody["imgString"];
      requestBody.imgUrl = resultUrl;
      const params = {
        TableName: dynamodbTableName,
        Item: requestBody
    }
    return dynamodb.put(params).promise().then(() => {
        const body = {
            Operation: 'SAVE',
            Message: 'SUCCESS',
            Item: requestBody
        }
        return buildResponse(200, body);
    }, (error) => {
        const body = {
            Operation: 'SAVE',
            Message: 'Failure',
            Error: error
        }
        return buildResponse(500, body);
    })
}

async function saveImageToS3(imgName, imgString) {
  const decodedImage = new Buffer.from(imgString.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // Getting the file type, ie: jpeg, png or gif
  const type = imgString.split(';')[0].split('/')[1];
    let filePath =  imgName
    let params = {
        Body: decodedImage,
        Bucket: "online-auction-images",
        Key: filePath,
        ACL: 'public-read',
        ContentEncoding: 'base64', 
        ContentType: `image/${type}` 
   };
   let location = '';
   try {
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
    console.log(location, key);
  } catch (error) {
     console.log(error)
  }
  return location;
}

async function modifyProduct(productId, updateKey, updateValue) {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'productId': productId
        },
        UpdateExpression: `set ${updateKey} = :value`,
        ExpressionAttributeValues: {
            ':value': updateValue
        },
        ReturnValues: 'UPDATED_NEW'
    }
    return dynamodb.update(params).promise().then((response) => {
        const body = {
            Operation: 'UPDATE',
            Message: 'SUCCESS',
            UpdatedAttributes: response
        }
        return buildResponse(200, body);
    }, (error) => {
        console.error('Do your custom error handling here. I am just gonna log it: ', error);
    })
}

async function deleteProduct(productId) {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'productId': productId
        },
        ReturnValues: 'ALL_OLD'
    }
    return dynamodb.delete(params).promise().then((response) => {
        const body = {
            Operation: 'DELETE',
            Message: 'SUCCESS',
            Item: response
        }
        return buildResponse(200, body);
    }, (error) => {
        console.error('Do your custom error handling here. I am just gonna log it: ', error);
    })
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PATCH"
        },
        body: JSON.stringify(body),
        "isBase64Encoded": false
    }
}