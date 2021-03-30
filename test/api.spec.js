'use strict';

const assert = require('assert');

const axios = require('axios').default;

const { createUser, loginUser, deleteUser } = require('./cognitolib');
const { getEndpoint } = require('./apigatewaylib');

//Remember: Passing arrow functions to Mocha is discouraged https://mochajs.org/#arrow-functions
describe('api smoke tests with authentication', function () {
  let user = null;

  before('create user and login', async function () {
    try {
      console.log('creating user...');
      user = await createUser();

      console.log('login...');
      await loginUser(user);
    } catch (error) {
      assert.fail('before caught error ' + error);
    }
  });

  // it('calls /hello', async function () {
  //   try {
  //     const endpoint = await getEndpoint();
  //     const url = endpoint + '/hello';

  //     console.log('GET', url);
  //     console.log('Authorization', user.idToken);

  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: user.idToken
  //       }
  //     });

  //     assert.notStrictEqual(response, null);
  //     assert.strictEqual(response.status, 200);
  //     assert.strictEqual(response.data, 'test from west');
  //     console.log(JSON.stringify(response.data));
  //   } catch (error) {
  //     assert.fail('hello caught error ' + error);
  //   }
  // });

  // it('calls /ping', async function () {
  //   try {
  //     const endpoint = await getEndpoint();
  //     const url = endpoint + '/ping?accessToken=' + user.accessToken;

  //     console.log('GET', url);
  //     console.log('Authorization', user.idToken);

  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: user.idToken
  //       }
  //     });

  //     assert.notStrictEqual(response, null);
  //     assert.strictEqual(response.status, 200);
  //     assert.strictEqual(response.data.status, 'ping okay');
  //   } catch (error) {
  //     assert.fail('ping caught error ' + error);
  //   }
  // });

  // it('calls GET /archive', async function () {
  //   try {
  //     const endpoint = await getEndpoint();
  //     const url = endpoint + '/archive?accessToken=' + user.accessToken;

  //     console.log('GET', url);

  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: user.idToken
  //       }
  //     });

  //     assert.notStrictEqual(response, null);
  //     assert.strictEqual(response.status, 200);
  //     console.log(response.data);
  //     //assert.strictEqual(response.data.status, 'GET archive okay');
  //   } catch (error) {
  //     assert.fail('GET archive caught error ' + error);
  //   }
  // });

  it('calls POST /archive', async function () {
    try {
      const endpoint = await getEndpoint();
      const url = endpoint + '/archive?accessToken=' + user.accessToken;

      console.log('POST', url);
      console.log('Authorization', user.idToken);

      const response = await axios.post(url, {
        headers: {
          //prettier-ignore
          'Authorization': user.idToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url:
            'https://tapedeck-sample-files.s3.us-east-2.amazonaws.com/test.m3u',
          desc: 'Backwoods Halloween 2020'
        })
      });

      assert.notStrictEqual(response, null);

      console.log(JSON.stringify(response));

      assert.strictEqual(response.status, 200);
      //assert.strictEqual(response.data.status, 'GET archive okay');
    } catch (error) {
      assert.fail('POST archive caught error ' + JSON.stringify(error));
    }
  });

  after('delete user', async function () {
    if (user) {
      try {
        console.log('deleting user...');
        await deleteUser(user);
      } catch (error) {
        assert.fail('delete caught error ' + error);
      }
    } else {
      console.log('no user to delete');
    }
  });
});
