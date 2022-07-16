const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'Users';
const healthPath = '/health';
const usersPath = '/user';

exports.handler = async function (event) {
    console.log('Request event: ', event);
    let response;
    switch (true) {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === usersPath:
            response = await saveUser(JSON.parse(event.body));
            break;
        case event.httpMethod === 'GET' && event.path === usersPath:
            response = await getProduct(event.queryStringParameters.userId);
            break;
        // case event.httpMethod === 'GET' && event.path === usersPath:
        //     response = await getUsers();
        //     break;
        default:
            response = buildResponse(404, '404 Not Found');
    }
    return response;
}

async function getProduct(userId) {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'userId': userId
        }
    }
    return await dynamodb.get(params).promise().then((response) => {
        return buildResponse(200, response.Item);
    }, (error) => {
        console.error("Unable to fetch the user", error);
    })
}


async function saveUser(requestBody) {
    const params = {
        TableName: dynamodbTableName,
        Item: requestBody
    }
    return await dynamodb.put(params).promise().then(() => {
        const body = {
            Operation: 'SAVE',
            Message: 'SUCCESS',
            Item: requestBody
        }
        return buildResponse(200, body);
    }, (error) => {
        console.error('Error while saving user', error)
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
        body: JSON.stringify(body)
    }
}