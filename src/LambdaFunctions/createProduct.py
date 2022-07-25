import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Products')

def lambda_handler(event, context):
    try:
        table.put_item(
            Item={
                'product_id' : event['Product_ID'],
                'Product_Description' : event['Product_Description'],
                'Product_category': event['Product_category'],
                'Product_Name' : event['Product_Name'],
                'Product_InitialPrice' : event['Product_InitialPrice'],
                'Product_highestBid' : event['Product_highestBid'],
                'Product_imageURL' : event['Product_imageURL'],
                'SellerID' : event['SellerID'],
                'Highest_Bidder_ID' : event['Highest_Bidder_ID'],
                'Sold': event['Sold'],
                'On_sale_DateTime' : event['On_sale_DateTime'],
                'HighestBid_DateTime': event['HighestBid_DateTime'],
                'Sold_DateTime': event['Sold_DateTime'],
            }
        )
    except Exception as ee:
        print(ee)
        return {
            'statusCode': 200,
            'body': {
                'message':'Inserted Successfully'
            },
            'error': ee
        }
           
    return {
        'statusCode': 200,
        'body': {
            'message':'Inserted Successfully'
        }
    }
