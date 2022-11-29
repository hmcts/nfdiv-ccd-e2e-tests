const { Logger } = require('@hmcts/nodejs-logging');
const requestModule = require('request-promise-native');
const request = requestModule.defaults();
const testConfig = require('../tests/config.js');
const fs = require('fs');
const NodeCache = require('node-cache');
const idamTokenCache = new NodeCache({ stdTTL: 25200, checkperiod: 1800 });


const logger = Logger.getLogger('helpers/utils.js');

const env = testConfig.TestEnv;
const months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

async function getOidcIdamToken(userName, password) {
  const isCachingEnabled = testConfig.IsCachingEnabled;

  if (isCachingEnabled && idamTokenCache.get(userName)) {
    console.log(`User Token for ${userName} fetched from Cache.....`);
    return idamTokenCache.get(userName);
  } else if (isCachingEnabled) {
    console.log(`Generating access token for User::  ${userName} and Caching it`);
    const tokenz = getAccessTokenFromIdam(userName, password);
    idamTokenCache.set(userName, tokenz);
    return tokenz;
  } else {
    // No Caching set, Call IDAM everytime.
    console.log('No Caching used . Calling IDAM ');
    return getAccessTokenFromIdam(userName, password);
  }
}


async function getAccessTokenFromIdam(userId, password){

  console.log(`Generating access token For userId ::  ${userId} `);

  const redirectUri = `https://div-pfe-${env}.service.core-compute-${env}.internal/authenticated`;
  const idamClientSecret = testConfig.TestIdamClientSecret;

  const idamBaseUrl = `https://idam-api.${env}.platform.hmcts.net`;

  const idamCodePath = `/oauth2/authorize?response_type=code&client_id=divorce&redirect_uri=${redirectUri}`;

  const codeResponse = await request.post({
    uri: idamBaseUrl + idamCodePath,
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${userId}:${password}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).catch(error => {
    console.log(error);
  });

  const code = JSON.parse(codeResponse).code;

  const idamAuthPath = `/oauth2/token?grant_type=authorization_code&client_id=divorce&client_secret=${idamClientSecret}&redirect_uri=${redirectUri}&code=${code}`;
  const authTokenResponse = await request.post({
    uri: idamBaseUrl + idamAuthPath,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });


  return JSON.parse(authTokenResponse)['access_token'];
}

module.exports = {
  getOidcIdamToken
};
