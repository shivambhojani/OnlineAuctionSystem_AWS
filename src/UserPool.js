import { CognitoUserPool } from 'amazon-cognito-identity-js';
import {userPool_REGION, UserPoolId, ClientId} from './Configs/config'

const poolData = {
  REGION: userPool_REGION,
  UserPoolId: UserPoolId,
  ClientId: ClientId,
};
export default new CognitoUserPool(poolData); 
