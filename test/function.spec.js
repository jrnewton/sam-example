'use strict';

const assert = require('assert');

const app = require('../src/hello/app');

describe('api smoke tests with authentication', function () {
  it('run the handler', async function () {
    const result = await app.handler();
    assert.notStrictEqual(result, null);
    console.log(result);
  });
});
