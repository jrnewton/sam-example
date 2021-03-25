'use strict';

const { region, apiName, apiStageName } = require('./config');

const {
  APIGatewayClient,
  GetRestApisCommand
} = require('@aws-sdk/client-api-gateway');

const client = new APIGatewayClient({ region: region });

const getEndpoint = async () => {
  try {
    const response = await client.send(new GetRestApisCommand({}));
    for (const item of response.items) {
      if (item.name === apiName) {
        //https://0n0a9sxkzl.execute-api.us-west-2.amazonaws.com/Test/list
        return `https://${item.id}.execute-api.${region}.amazonaws.com/${apiStageName}`;
      }
    }
  } catch (error) {
    console.log('failed to get REST API', error);
    return null;
  }
};

module.exports = {
  getEndpoint
};
