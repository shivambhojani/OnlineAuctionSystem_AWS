import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../../UserPool';
import { useNavigate } from 'react-router-dom';

const AccountContext = createContext();

const Account = props => {

  const navigate = useNavigate();

  const [userId, setuserId] = React.useState("");

  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });

  const authenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: data => {
          console.log('onSuccess:', data);
          resolve(data);

          getSession().then((data) => {
            console.log('Profile Session', data)
            // setuserId(data['accessToken']['payload']['username']);

            setuserId(data['accessToken']['payload']['username']);
          });
        },

        onFailure: err => {
          console.error('onFailure:', err);
          reject(err);
        },

        newPasswordRequired: data => {
          console.log('newPasswordRequired:', data);
          resolve(data);
        }
      });
    });

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      setuserId("");
      navigate("/signin");
      console.log('session after logout', user.getSession)
    }
  }

  return (
    <AccountContext.Provider value={{
      authenticate,
      getSession,
      logout
    }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };