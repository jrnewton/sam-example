'use strict';

const yaml = require('yaml');
const toml = require('toml');
const fs = require('fs');
const path = require('path');

const samConfig = toml.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/samconfig.toml'), 'utf-8')
);
const region = samConfig.default.deploy.parameters.region;

const samTemplate = yaml.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/template.yaml'), 'utf-8')
);
const userPoolName = samTemplate.Resources.UserPool.Properties.UserPoolName;

module.exports = {
  region,
  userPoolName
};
