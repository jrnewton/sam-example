'use strict';

const assert = require('assert');

const axios = require('axios').default;

const { createUser, loginUser, deleteUser } = require('./cognitolib');

const REGION = 'us-west-2';

//Remember: Passing arrow functions to Mocha is discouraged https://mochajs.org/#arrow-functions
describe('api smoke tests with authentication', function () {
  let user = null;

  before('create user and login', async function () {
    user = await loginUser(await createUser());
  });

  it('calls /ping', async function () {
    axios.get('?accessToken=' + user.accessToken, {
      headers: {
        Authorization: user.idToken
      }
    });
  });

  // it('calls /list', async function () {
  //   assert.strictEqual(true, true);
  // });

  after('delete user', async function () {
    await deleteUser(user);
  });
});
