const { Logger } = require('@hmcts/nodejs-logging');
const requestModule = require('request-promise-native');
const request = requestModule.defaults();
const {getServiceToken,getUserId,dateYYYYMMDD} = require('../helpers/utils.js');

const fs = require('fs');
const testConfig = require('../tests/config.js');
const logger = Logger.getLogger('helpers/citizen-utils.js');
const env = testConfig.TestEnv;
let  dataLocation;


async function createCitizenUser() {

  const generatedEmail = 'nfdiv.E2E.Applicant1'+new Date().getDate()+Math.random().toString().substr(2, 4)+'@hmcts.net';
  dataLocation = 'data/nfdiv/fixtures/citizen/create-citizen-user.json';

  let bodyPayload =  fs.readFileSync(dataLocation).toString('utf8');
  bodyPayload = bodyPayload.replace('REPLACE_WITH_GENERATED_EMAIL',generatedEmail); // username == generatedEmail.

  const idamApiUrl = 'https://idam-api.aat.platform.hmcts.net/testing-support/accounts';

  const createCitzUser = {
    method: 'POST',
    uri: idamApiUrl,
    headers: {
      'Content-Type': 'application/json'
    },
    body: bodyPayload
  };

  let idamUserCreatedResponse;
  try{
    idamUserCreatedResponse =  await request(createCitzUser);
  }catch(error){
    console.log('Exception while trying to create Citizen user with email ${generatedEmail} .......'+ error);
  }

  console.log(' User Created :' + idamUserCreatedResponse);
  return  JSON.parse(idamUserCreatedResponse);

}

async function deleteUser(userEmail){

  const deleteUserURL = 'https://idam-api.aat.platform.hmcts.net/testing-support/accounts/'+userEmail;

  const deleteUser = {
    method: 'DELETE',
    uri: deleteUserURL
  };

  let idamUserCreatedResponse;
  try{
    idamUserCreatedResponse =  await request(deleteUser);
  }catch(exception){
    console.log('Exception while trying to DELETE Citizen user with email '+userEmail + ' and error is... ' +  exception);
  }
  console.log(' User with email | '+ userEmail  + ' | has been DELETED  :');
}

async function createNFDCitizenBasicCaseAndFetchResponse(username,password,dataLocation = 'data/ccd-nfdiv-sole-citizen-user-base-data.json') {

  const authToken = await getUserTokenForCitizenUser(username,password);

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Creating Citizen  Case');

  const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartCasePath = `/citizens/${userId}/jurisdictions/DIVORCE/case-types/NFD/event-triggers/citizen-create-application/token`;
  const ccdSaveCasePath = `/citizens/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases`;

  const getTokenOnly = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartCasePath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const tokenOnlyResponse = await request(getTokenOnly);
  const eventToken  = JSON.parse(tokenOnlyResponse).token;

  var data =  fs.readFileSync(dataLocation).toString('utf8');
  data = data.replace('replaceApplicant1EmailAddress',username);// username == emailId.

  var saveBody = {
    data: JSON.parse(data),
    event: {
      id: 'citizen-create-application',
      summary: 'Creating Basic Citizen Case',
      description: 'For NFD Citizen E2E Test'
    },
    'event_token': eventToken
  };

  const saveCaseOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveCasePath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };
  const saveCaseResponse =  await request(saveCaseOptions);
  return JSON.parse(saveCaseResponse).id;
}

async function updateNFDCitizenCaseWithId(username,pw,caseId,dataLocation = 'data/ccd-nfdiv-sole-citizen-user-base-data.json',eventId){

  const authToken = await getUserTokenForCitizenUser(username,pw);

  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();

  console.log('Updating case with id %s and event %s', caseId, eventId);

  const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartEventPath = `/citizens/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/citizens/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/events`;

  const getTokenOnly = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const tokenOnlyResponse = await request(getTokenOnly);
  const eventToken  = JSON.parse(tokenOnlyResponse).token;

  const dueDate = dateYYYYMMDD(0);
  var data =  fs.readFileSync(dataLocation).toString('utf8');
  data = data.replace('REPLACE_DUE_DATE',dueDate);// username == emailId.
  //data = data.replace("REPLACE_DATE_SUBMITTED","\"2022-02-14T16:41:34.684\"");


  var saveBody = {
    data: JSON.parse(data),
    event: {
      id: 'citizen-update-application',
      summary: 'Updating Citizen E2E Case',
      description: 'NFD Citizen E2E Update'
    },
    'event_token': eventToken
  };

  const saveCaseOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveCaseResponse =  await request(saveCaseOptions);
  return JSON.parse(saveCaseResponse);
}

async function getUserTokenForCitizenUser(username,password) {

  logger.info('....... Within the getUserTokenForCitizenUser');

  // Setup Details
  //const username = testConfig.TestEnvCitizenUser;
  //const password = testConfig.TestEnvCitizenPassword;
  const redirectUri = `https://div-pfe-${env}.service.core-compute-${env}.internal/authenticated`;
  const idamClientSecret = testConfig.TestIdamClientSecret;

  const idamBaseUrl = 'https://idam-api.aat.platform.hmcts.net';

  const idamCodePath = `/oauth2/authorize?response_type=code&client_id=divorce&redirect_uri=${redirectUri}`;

  const codeResponse = await request.post({
    uri: idamBaseUrl + idamCodePath,
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
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

  logger.debug(JSON.parse(authTokenResponse)['access_token']);

  return JSON.parse(authTokenResponse)['access_token'];
}

module.exports = {
  createNFDCitizenBasicCaseAndFetchResponse,
  createCitizenUser,
  deleteUser,
  updateNFDCitizenCaseWithId
};
