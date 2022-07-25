import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Products')

def lambda_handler(event, context):
    # TODO implement
    response = table.scan()
    # items = response['Products']
    return {
        'statusCode': 200,
        'body': response
    }
