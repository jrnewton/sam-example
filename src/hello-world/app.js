'use strict';

// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} _event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} _context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Promise<any>} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (_event, _context) => {
  console.log('event', _event);
  console.log('context', _context);
  try {
    // const ret = await axios(url);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello world ' + Date.now()
        // location: ret.data.trim()
      })
    };
    console.log('response', JSON.stringify(response));
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
