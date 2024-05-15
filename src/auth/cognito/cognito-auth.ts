// cognito-auth.ts
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-southeast-1_lfkXeZ4pT", // Your user pool id here
  ClientId: "1ueg8g84ocuikn2fk8b305af1f" // Your client id here
};

const userPool = new CognitoUserPool(poolData);

/**
 * Sign in a user with the given username and password.
 * @param username The username of the user.
 * @param password The password of the user.
 */
export async function signIn(username: string, password: string): Promise<any> {
  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log("access token + " + result.getAccessToken().getJwtToken());
        resolve(result);
      },
      onFailure: (err) => {
        console.error(err);
        reject(err);
      },
    });
  });
}
