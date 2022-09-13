const { Logger } = require('@hmcts/nodejs-logging');
const requestModule = require('request-promise-native');
const request = requestModule.defaults();
const {getServiceToken,getUserId,dateYYYYMMDD,getSystemUserToken} = require('../helpers/utils.js');

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

async function createRespondentCitizenUser() {

  const generatedEmail = 'nfdiv.E2E.Respondent'+new Date().getDate()+Math.random().toString().substr(2, 4)+'@hmcts.net';
  dataLocation = 'data/nfdiv/fixtures/citizen/create-citizen-respondent-user.json';

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
    console.log('Exception while trying to create Respondent user with email of '+ generatedEmail +  '   ' + error);
  }

  console.log(' Respondent Created : ' + idamUserCreatedResponse);
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


async function createNFDJointCitizenBasic(username,password, app2UserName, app2Password, dataLocation = 'data/ccd-nfdiv-joint-citizen-user-base-data.json') {

  const authToken = await getUserTokenForCitizenUser(username,password);

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Creating JOINT Citizen  Case');

  let ccdApiUrl ='';

  if(testConfig.TestUrl.includes('localhost') ) {
    console.log('... Env  is LOCALHOST');
    ccdApiUrl = 'http://localhost:4452';
    console.log('... ccdApiUrl  is ..' + ccdApiUrl );
  } else if(testConfig.TestUrl.includes('demo')){
    console.log('... Env  is DEMO');
    ccdApiUrl = 'http://ccd-data-store-api-demo.service.core-compute-demo.internal';
  } else if(testConfig.TestUrl.includes('aat')){
    console.log('... Env is AAT');
    ccdApiUrl = 'http://ccd-data-store-api-aat.service.core-compute-aat.internal';
  }

  const ccdStartCasePath = '/citizens/${userId}/jurisdictions/DIVORCE/case-types/NFD/event-triggers/citizen-create-application/token';
  const ccdSaveCasePath = '/citizens/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases';

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

  const authTokenRespondent = await getUserTokenForCitizenUser(app2UserName,app2Password);
  const app2UserId = await getUserId(authTokenRespondent);

  console.log('..... app2UserId is ....' +  app2UserId);

  var data =  fs.readFileSync(dataLocation).toString('utf8');
  data = data.replace('replaceApplicant1EmailAddress',username); // username == emailId.
  data = data.replace('replaceApplicant2EmailAddress',app2UserName); // app2UserName == applicant2 Email Id.
  data = data.replace('REPLACE_APP_2_USER_ID',app2UserId); // app2UserName == applicant2 Email Id.

  var saveBody = {
    data: JSON.parse(data),
    event: {
      id: 'citizen-create-application',
      summary: 'Creating JOINT  Citizen Case',
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


async function inviteApplicant2(username,caseId,dataLocation = 'data/citizen-invite-applicant-2.json',eventId){

  const authToken = await getUserTokenForCitizenUser(username,'Testing123');
  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();

  console.log('Invite Applicant 2 To Case %s'+ caseId);

  let ccdApiUrl = '';

  if(testConfig.TestUrl.includes('localhost') ) {
    console.log('... inviteApplicant2() .... Env  is LOCALHOST');
    ccdApiUrl = 'http://localhost:4452';
    console.log('... ccdApiUrl  is ..' + ccdApiUrl );
  }else if(testConfig.TestUrl.includes('demo')){
    console.log('... Env  is DEMO');
    ccdApiUrl ='http://ccd-data-store-api-demo.service.core-compute-demo.internal';
  }else if(testConfig.TestUrl.includes('aat')){
    console.log('... Env is AAT');
    ccdApiUrl ='http://ccd-data-store-api-aat.service.core-compute-aat.internal';
  }

  //const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartEventPath = '/citizens/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/event-triggers/${eventId}/token';
  const ccdSaveEventPath = '/citizens/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/events';

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

  let data =  fs.readFileSync(dataLocation).toString('utf8');

  let saveBody = {
    data: JSON.parse(data),
    event: {
      id: eventId,
      summary: 'Invite Applicant 2 To Case',
      description: 'NFD Citizen E2E Test'
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

async function systemLinkApplicant2(caseId,dataLocation = 'data/citizen-invite-applicant-2.json',eventId){

  const authToken = getSystemUserToken();
  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();

  console.log('System Link  Applicant 2 For  Case  %s ', caseId);

  let ccdApiUrl = '';

  if(testConfig.TestUrl.includes('localhost') ) {
    console.log('... inviteApplicant2() .... Env  is LOCALHOST');
    ccdApiUrl = 'http://localhost:4452';
    console.log('... ccdApiUrl  is ..' + ccdApiUrl );
  }else if(testConfig.TestUrl.includes('demo')){
    console.log('... Env  is DEMO');
    ccdApiUrl = 'http://ccd-data-store-api-demo.service.core-compute-demo.internal';
  }else if(testConfig.TestUrl.includes('aat')){
    console.log('... Env is AAT');
    ccdApiUrl = 'http://ccd-data-store-api-aat.service.core-compute-aat.internal';
  }

  const ccdStartGetToken = `/citizens/${userId}/jurisdictions/DIVORCE/case-types/NFD/event-triggers/system-link-applicant2/token`;
  const ccdStartEventPath = `/citizens/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/event-triggers/${eventId}`;
  //const ccdSaveEventPath = `/citizens/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/events`;

  const getTokenOnly = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartGetToken,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const tokenOnlyResponse = await request(getTokenOnly);

  console.log('... tokenOnlyResponse  is ' + tokenOnlyResponse);

  const eventToken  = JSON.parse(tokenOnlyResponse).token;

  const getCaseData = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const resp = await request(getCaseData);

  console.log('... getCaseData ===  ' + resp);

  const accessCode  = JSON.parse(resp).accessCode;

  console.log('... accessCode IS  ===  ' + accessCode);

  return ;
  //
  // let data =  fs.readFileSync(dataLocation).toString('utf8');
  //
  // let saveBody = {
  //   data: JSON.parse(data),
  //   event: {
  //     id: eventId,
  //     summary: 'Invite Applicant 2 To Case',
  //     description: 'NFD Citizen E2E Test'
  //   },
  //   'event_token': eventToken
  // };
  //
  //
  // const saveCaseOptions = {
  //   method: 'POST',
  //   uri: ccdApiUrl + ccdSaveEventPath,
  //   headers: {
  //     'Authorization': `Bearer ${authToken}`,
  //     'ServiceAuthorization': `Bearer ${serviceToken}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(saveBody)
  // };
  //
  // const saveCaseResponse =  await request(saveCaseOptions);
  // return JSON.parse(saveCaseResponse);
}



async function updateNFDCitizenCaseWithId(username,pw,caseId,dataLocation = 'data/ccd-nfdiv-sole-citizen-user-base-data.json',eventId){

  const authToken = await getUserTokenForCitizenUser(username,pw);

  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();

  console.log('Updating case  %s and event %s', caseId, eventId);

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

  const dueDate = dateYYYYMMDD(16);
  let data =  fs.readFileSync(dataLocation).toString('utf8');
  data = data.replace('REPLACE_DUE_DATE',dueDate);

  let saveBody = {
    data: JSON.parse(data),
    event: {
      id: eventId,
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

  logger.info('....... Within the getUserTokenForCitizenUser ....' + username);

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
  createNFDJointCitizenBasic,
  createCitizenUser,
  createRespondentCitizenUser,
  deleteUser,
  updateNFDCitizenCaseWithId,
  inviteApplicant2,
  systemLinkApplicant2
};
