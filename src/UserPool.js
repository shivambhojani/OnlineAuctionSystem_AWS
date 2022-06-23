import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  REGION: "us-east-1",
  UserPoolId: 'us-east-1_tevclSLOZ',
  ClientId: 'quuiqsf86866ce5a9dnk4t7pa',
};
export default new CognitoUserPool(poolData); 
