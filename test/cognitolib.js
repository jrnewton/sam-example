'use strict';

const assert = require('assert');

const {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  ListUserPoolsCommand,
  ListUserPoolClientsCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
  AdminDeleteUserCommand
} = require('@aws-sdk/client-cognito-identity-provider');

const { region, userPoolName } = require('./config');

const client = new CognitoIdentityProviderClient({ region: region });

const pwdgen = require('generate-password');

/*
Min length: 8
Require numbers
Require special character
Require uppercase letters
Require lowercase letters
*/
const pwdPolicy = {
  length: 8,
  numbers: true,
  symbols: true,
  uppercase: true,
  strict: true
};

let userPool = null;

const getUserPool = async () => {
  if (userPool) {
    return userPool;
  }

  let id = null;
  let clientId = null;

  try {
    const poolResponse = await client.send(
      new ListUserPoolsCommand({ MaxResults: 5 })
    );

    for (let pool of poolResponse.UserPools) {
      if (pool.Name === userPoolName) {
        id = pool.Id;
      }
    }

    const clientResponse = await client.send(
      new ListUserPoolClientsCommand({ UserPoolId: id })
    );

    assert.strictEqual(clientResponse.UserPoolClients.length, 1);
    clientId = clientResponse.UserPoolClients[0].ClientId;

    assert.notStrictEqual(id, null);
    assert.notStrictEqual(clientId, null);

    userPool = {
      id,
      clientId
    };

    //console.log('returning', userPool);

    return userPool;
  } catch (error) {
    console.error('failed to get userpool', error);
    return null;
  }
};

const createUser = async () => {
  const username = 'testuser1';
  const password = pwdgen.generate(pwdPolicy);
  const userPool = await getUserPool();

  try {
    const createUserResponse = await client.send(
      new AdminCreateUserCommand({
        UserPoolId: userPool.id,
        Username: username,
        TemporaryPassword: password,
        MessageAction: 'SUPPRESS' /* do not send welcome message */
      })
    );

    //console.log(JSON.stringify(createUserResponse, null, 2));

    assert.strictEqual(createUserResponse.User.Username, username);

    return {
      username,
      password
    };
  } catch (error) {
    console.error('failed to create user', error);
    return null;
  }
};

const loginUser = async (user) => {
  const userPool = await getUserPool();

  const authResponse = await client.send(
    new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: userPool.clientId,
      AuthParameters: {
        USERNAME: user.username,
        PASSWORD: user.password
      }
    })
  );

  //console.log(JSON.stringify(authResponse, null, 2));

  const challengeName = authResponse.ChallengeName;
  const session = authResponse.Session;

  let authResult = authResponse.AuthenticationResult;

  if (challengeName && session) {
    //newly created user requires new password
    assert.strictEqual(challengeName, 'NEW_PASSWORD_REQUIRED');
    assert.notStrictEqual(session, null);

    user.password = pwdgen.generate(pwdPolicy);

    const challengeResponse = await client.send(
      new RespondToAuthChallengeCommand({
        ClientId: userPool.clientId,
        ChallengeName: challengeName,
        ChallengeResponses: {
          USERNAME: user.username,
          NEW_PASSWORD: user.password
        },
        Session: session
      })
    );

    //console.log(JSON.stringify(challengeResponse, null, 2));
    authResult = challengeResponse.AuthenticationResult;
  }

  user.idToken = authResult.IdToken;
  user.accessToken = authResult.AccessToken;

  // console.log('idToken', user.idToken);
  // console.log('accessToken', user.accessToken);

  return user;
};

const deleteUser = async (user) => {
  const userPool = await getUserPool();

  await client.send(
    new AdminDeleteUserCommand({
      Username: user.username,
      UserPoolId: userPool.id
    })
  );
};

module.exports = {
  createUser,
  loginUser,
  deleteUser
};
