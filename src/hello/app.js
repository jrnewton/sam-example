'use strict';

const AWS = require('aws-sdk');

exports.handler = async (_event, _context) => {
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'us-west-2'
  });

  const params = {
    Bucket: 'hello-world',
    Key: Math.random() + '',
    Body: Buffer.from("I'm a string!", 'utf-8')
  };
  const upload = s3.upload(params).promise();
  const data = await upload;
  console.log('[upload] finished write to s3', data);

  return 'test from west';
  // throw new Error('Something went wrong');
};
