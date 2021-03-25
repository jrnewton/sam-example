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

  it('calls /ping', async function () {
    try {
      const endpoint = await getEndpoint();
      const url = endpoint + '/ping?accessToken=' + user.accessToken;

      console.log('GET', url);

      const response = await axios.get(url, {
        headers: {
          Authorization: user.idToken
        }
      });

      assert.notStrictEqual(response, null);
      assert.strictEqual(response.status, 200);

      console.log('response', response.data);
    } catch (error) {
      assert.fail('ping caught error ' + error);
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
