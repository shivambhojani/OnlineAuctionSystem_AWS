const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'Products';
const healthPath = '/health';
const bidPath = '/bid';

exports.handler = async function (event) {
    console.log('Request event: ', event);
    let response;
    switch (true) {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = buildResponse(200);
            break;
        case event.httpMethod === 'PUT' && event.path === bidPath:
            const requestBody = JSON.parse(event.body);
            response = await placeBidByproductID(event.queryStringParameters.productId, requestBody.highestbid, requestBody.highestbidderid, requestBody.timeathighestbid);
            break;
        default:
            response = buildResponse(404, '404 Not Found');
    }
    return response;
}

async function placeBidByproductID(productId, highestbid, highestbidderid, timeathighestbid) {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'productId': productId
        },
        UpdateExpression: `set highestbid = :highestbid, highestbidderid = :highestbidderid, timeathighestbid =:timeathighestbid`,

        ExpressionAttributeValues: {
            ':highestbid': highestbid,
            ':highestbidderid': highestbidderid,
            ':timeathighestbid':timeathighestbid   
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
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        },
        body: JSON.stringify(body)
    }
}