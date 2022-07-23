const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'Products';

exports.handler = async (event) => {
    let currentTime = new Date().getTime();

    let scannedItems = [];
    scannedItems = scanTable(dynamodbTableName)
    console.log(scannedItems);
    return (200, scannedItems);
    // const params = {
    //     TableName: dynamodbTableName,
    //     Item : {
    //         time : currentTime
    //     },
    //     Key: {
    //         'sold': false
    //     },
        
    //     ExpressionAttributeValues: {
    //         ':timewhensold': currentTime,
    //         ':sold': true,
    //     },
    //     ConditionExpression:'((:timewhensold - timeathighestbid )/1000 * 3600) >= 4',

    //     UpdateExpression: `set sold = :sold, timewhensold =:timewhensold`,
    //     ReturnValues: 'UPDATED_NEW'
    
    // }
    // return await dynamodb.update(params).promise().then((response) => {
    //     const body = {
    //         Operation: 'UPDATE',
    //         Message: 'SUCCESS',
    //         UpdatedAttributes: response
    //       }
    //     return buildResponse(200, body);
    // }, (error) => {
    //     console.error("Unable to record the bid", error);
    // })


};

const scanTable = async (tableName) => {
    
    dynamodb.scan(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
    data.Items.forEach(function (element, index, array) {
      console.log(
          "printing",
          element
      );
    });
  }
})


};