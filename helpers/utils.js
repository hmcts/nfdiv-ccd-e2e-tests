const { Logger } = require('@hmcts/nodejs-logging');
const requestModule = require('request-promise-native');
const request = requestModule.defaults();

const fs = require('fs');
const testConfig = require('../tests/config.js');
const {getOidcIdamToken} = require('./idam-utils.js');
const logger = Logger.getLogger('helpers/utils.js');
const env = testConfig.TestEnv;
const months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

async function getUserToken() {
  logger.info('.........Getting CW  Token');
  return getOidcIdamToken(testConfig.TestEnvCWUser,testConfig.TestEnvCWPassword);
}

async function getSystemUserToken() {
  logger.info('.........Getting NFD E2E SystemUser Token');
  return getOidcIdamToken(testConfig.TestNFDE2ESystemUser,testConfig.TestNFDE2ESystemUserPW);
}

async function getSolicitorUserToken() {
  logger.info('.........Getting Solicitor User Token');
  return getOidcIdamToken(testConfig.TestEnvSolUser,testConfig.TestEnvSolPassword);
}

async function getCourtAdminUserToken() {
  logger.info('.........Getting CourtAdmin User Token');
  return getOidcIdamToken(testConfig.TestEnvCourtAdminUser,testConfig.TestEnvCourtAdminPassword);
}

async function getRespondentAdminSolicitorUserToken() {
  logger.info('.........Getting Respondent Admin Solicitor User Token..........');
  return getOidcIdamToken(testConfig.TestEnvRespondentSolAdminUser,testConfig.TestEnvRespondentSolAdminPassword);
}

async function getRespondentSolicitorUserToken() {
  logger.info('.........Getting Respondent Solicitor User Token..........');
  return getOidcIdamToken(testConfig.TestEnvRespondentSolUser,testConfig.TestEnvRespondentSolPassword);
}

async function getRespondentSolicitor2UserToken() {

  logger.info('.........Getting RespSolicitor2 User Token..........');

  // Setup Details
  const username = testConfig.TestEnvRespondentSol2User;
  const password = testConfig.TestEnvRespondentSol2Password;
  const redirectUri = `https://div-pfe-${env}.service.core-compute-${env}.internal/authenticated`;
  const idamClientSecret = testConfig.TestIdamClientSecret;

  const idamBaseUrl = `https://idam-api.${env}.platform.hmcts.net`;

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

async function getLegalAdvisorUserToken() {
  logger.info('.........Legal Advisor User Token ............');
  return getOidcIdamToken(testConfig.TestEnvLegalAdvisorUser,testConfig.TestEnvLegalAdvisorPassword);
}

//TODO this will eventually replace the multiple getUserTokenXXX() methods above
async function getUserTokenFor(user) {

  logger.info('~~~~~~~~~~~~~Getting User Token for ~~~'+ user);

  var username;
  var password;

  if(user === user.SYS){
    username = testConfig.TestSystemUser;
    password = testConfig.TestSystemUserPW;
  }else if(user === user.CW){
    username = testConfig.TestEnvCWUser;
    password = testConfig.TestEnvCWPassword;
  }else if(user === user.SOLS){
    username = testConfig.TestEnvSolUser;
    password = testConfig.TestEnvSolPassword;
  }else if(user === user.CA){
    username = testConfig.TestEnvCourtAdminUser;
    password = testConfig.TestEnvCourtAdminPassword;
  }else if(user === user.RSA){
    username = testConfig.TestEnvRespondentSolAdminUser;
    password = testConfig.TestEnvRespondentSolAdminPassword;
  }else if(user === user.RS){
    username = testConfig.TestEnvRespondentSolUser;
    password = testConfig.TestEnvRespondentSolPassword;
  }else if(user === user.RS2) {
    username = testConfig.TestEnvRespondent2SolUser;
    password = testConfig.TestEnvRespondent2SolPassword;
  }else if(user === user.LA){
    // username = testConfig.TestEnv;
    // password = testConfig.TestSystemUserPW;
  }else {
    console.error('~~~~~ UNKNOWN USER Passed into method');
  }

  // Setup Details

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

async function getUserId(authToken) {

  const idamBaseUrl = `https://idam-api.${env}.platform.hmcts.net`;

  const idamDetailsPath = '/details';
  const userDetails = await request.get({
    uri: idamBaseUrl + idamDetailsPath,
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  logger.debug(JSON.parse(userDetails).id);

  return JSON.parse(userDetails).id;
}

async function getServiceToken() {

  const serviceSecret = testConfig.TestS2SAuthSecret;

  const s2sBaseUrl = `http://rpe-service-auth-provider-${env}.service.core-compute-${env}.internal`;
  const s2sAuthPath = '/testing-support/lease';
  const oneTimePassword = require('otp')({
    secret: serviceSecret
  }).totp();

  const serviceToken = await request({
    method: 'POST',
    uri: s2sBaseUrl + s2sAuthPath,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({microservice: 'nfdiv_case_api',oneTimePassword})})
  ;

  logger.debug(serviceToken);
  return serviceToken;
}

// TODO Temporary Patch , Remove once CCD-2009 is deployed
async function getManageOrgServiceToken() {
  logger.info('Getting ManageOrgServiceToken ........');

  const serviceSecret = testConfig.TestS2SAuthSecret;

  const s2sBaseUrl = 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal';
  const s2sAuthPath = '/testing-support/lease';
  const oneTimePassword = require('otp')({
    secret: serviceSecret
  }).totp();

  const serviceToken = await request({
    method: 'POST',
    uri: s2sBaseUrl + s2sAuthPath,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      microservice: 'xui_webapp',
      oneTimePassword
    })
  });

  logger.debug(serviceToken);

  return serviceToken;
}


async function createNFDCaseAndFetchResponse(dataLocation = 'data/ccd-basic-data.json') {

  const authToken = await getSolicitorUserToken();
  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken(); // S2S Auth

  var ccdApiUrl;
  if(testConfig.TestUrl.includes('localhost')){
    ccdApiUrl = 'http://localhost:4452';
    logger.info('Creating Case in Local Environment ...');
  }else{
    ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
    logger.info('Creating Case in..'+{env} );
  }

  const ccdStartCasePath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/event-triggers/solicitor-create-application/token`;
  const ccdSaveCasePath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases`;

  const startCaseOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartCasePath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startCaseResponse = await request(startCaseOptions);

  const eventToken = JSON.parse(startCaseResponse).token;

  var data = fs.readFileSync(dataLocation);
  var saveBody = {
    event: {
      id: 'solicitor-create-application'
    },
    data: JSON.parse(data),
    event_token: eventToken
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
  return saveCaseResponse;
}


async function createCaseInCcd(dataLocation = 'data/ccd-basic-data.json') {
  const saveCaseResponse = await createCaseInCcd(dataLocation).catch(error => {
    console.log(error);
  });

  const caseId = JSON.parse(saveCaseResponse).id;
  logger.info('Created case with id %s', caseId);
  return caseId;
}


async function getCaseDetailsFor(caseId) {
  const authToken = await getUserToken();
  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();

  var ccdApiUrl;

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else{
    ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  }

  const ccdGetCaseDetailsPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/`+caseId;

  const getCaseDetails = {
    method: 'GET',
    uri: ccdApiUrl + ccdGetCaseDetailsPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const getCaseResponse = await request(getCaseDetails);
  // can return state or anyother element from Response etc.
  // console.log('..... printint out the response '+getCaseResponse)
  return JSON.parse(getCaseResponse);
}

async function getCaseDetailsAsSolFor(caseId) {
  const authToken = await getCourtAdminUserToken();
  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();

  var ccdApiUrl;

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else{
    ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  }

  //ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdGetCaseDetailsPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/`+caseId;

  const getCaseDetails = {
    method: 'GET',
    uri: ccdApiUrl + ccdGetCaseDetailsPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const getCaseResponse = await request(getCaseDetails);
  return JSON.parse(getCaseResponse);
}

async function getCitizenCaseDetails(caseId) {
  const authToken = await getCourtAdminUserToken();
  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();

  var ccdApiUrl;

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else{
    ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  }

  //ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdGetCaseDetailsPath = `/citizens/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/`+caseId;

  const getCaseDetails = {
    method: 'GET',
    uri: ccdApiUrl + ccdGetCaseDetailsPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const getCaseResponse = await request(getCaseDetails);
  // can return state or anyother element from Response etc.
  return JSON.parse(getCaseResponse);
}

async function createNFDCaseInCcd(dataLocation = 'data/ccd-nfdiv-case-draft.json') {
  const saveCaseResponse = await createNFDCaseAndFetchResponse(dataLocation).catch(error => {
    console.log(error);
  });

  const caseId = JSON.parse(saveCaseResponse).id;
  logger.info('Created case with id %s', caseId);
  return caseId;
}

async function createCaseAndFetchResponse(dataLocation = 'data/ccd-basic-data.json') {

  const authToken = await getUserToken();

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Creating Case');

  const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartCasePath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NO_FAULT_DIVORCE18/event-triggers/AwaitingHWFDecision/token`;
  const ccdSaveCasePath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NO_FAULT_DIVORCE18/cases`;

  const startCaseOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartCasePath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startCaseResponse = await request(startCaseOptions);
  const eventToken = JSON.parse(startCaseResponse).token;

  var data = fs.readFileSync(dataLocation);
  var saveBody = {
    data: JSON.parse(data),
    event: {
      id: 'hwfCreate',
      summary: 'Creating Case',
      description: 'For CCD E2E Test'
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
  return saveCaseResponse;
}




async function getAuthTokenFor(userLoggedIn) {
  let authToken='';

  if (userLoggedIn === 'Solicitor') {
    authToken = await getSolicitorUserToken();
  }
  if (userLoggedIn === 'Caseworker') {
    authToken = await getUserToken();
  }
  if (userLoggedIn === 'CourtAdmin') {
    authToken = await getCourtAdminUserToken();
  }
  if (userLoggedIn === 'RespondentSolicitor') {
    authToken = await getRespondentSolicitorUserToken();
  }
  if (userLoggedIn === 'RespondentSolicitorAdmin') {
    authToken = await getRespondentAdminSolicitorUserToken();
  }
  if (userLoggedIn === 'RespondentSolicitor01') {
    authToken = await getRespondentSolicitorUserToken();
  }
  if (userLoggedIn === 'RespondentSolicitor2') {
    authToken = await getRespondentSolicitor2UserToken();
  }
  if (userLoggedIn === 'LegalAdvisor') {
    authToken = await getLegalAdvisorUserToken();
  }
  if (userLoggedIn === 'SystemUser') {
    authToken = await getSystemUserToken();
  }


  return authToken;
}

async function updateNFDCaseInCcd(userLoggedIn, caseId, eventId, dataLocation = 'data/ccd-nfd-draft-to-submitted-state') {

  let authToken='';
  authToken = await getAuthTokenFor(userLoggedIn, authToken);

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Updating case with id %s and event %s', caseId, eventId);

  var ccdApiUrl='';

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else{
    ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  }

  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/events`;

  const startEventOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startEventResponse = await request(startEventOptions);

  const eventToken = JSON.parse(startEventResponse).token;

  var data = fs.readFileSync(dataLocation);
  var saveBody = {
    data: JSON.parse(data),
    event: {
      id: eventId,
      summary: 'Updating Case',
      description: 'For CCD E2E Test'
    },
    'event_token': eventToken
  };


  const saveEventOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveEventResponse = await request(saveEventOptions);
  return saveEventResponse;
}

async function moveCaseToFinalOrderOverdue(userLoggedIn, caseId, eventId, dataLocation = 'data/final-order-overdue.json') {

  let authToken='';
  authToken = await getAuthTokenFor(userLoggedIn, authToken);

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Updating case with id %s and event %s', caseId, eventId);

  var ccdApiUrl='';

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else{
    ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  }

  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/events`;

  const startEventOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startEventResponse = await request(startEventOptions);

  const eventToken = JSON.parse(startEventResponse).token;

  var data =  fs.readFileSync(dataLocation).toString('utf8');
  let oneYearAgo = dateYYYYMMDD(-366);
  data = data.replace('replaceCoGrantedDate',oneYearAgo);

  var saveBody = {
    data: JSON.parse(data),
    event: {
      id: eventId,
      summary: 'Updating COGranted Date ',
      description: 'For CCD E2E Test'
    },
    'event_token': eventToken
  };


  const saveEventOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveEventResponse = await request(saveEventOptions);
  return saveEventResponse;
}


async function updateFinalOrderDateForNFDCaseInCcd(userLoggedIn, caseId, eventId, dataLocation = 'data/final-order-date-eligible-to-respondent.json') {

  let authToken='';
  authToken = await getAuthTokenFor(userLoggedIn, authToken);

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Updating case whose  id %s with the  event of  %s', caseId, eventId);

  var ccdApiUrl='';

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else if(testConfig.TestUrl.includes('aat')){
    ccdApiUrl = 'http://ccd-data-store-api-aat.service.core-compute-aat.internal';
  }else if(testConfig.TestUrl.includes('demo')){
    ccdApiUrl = 'http://ccd-data-store-api-demo.service.core-compute-demo.internal';
  }

  //const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/events`;

  const startEventOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startEventResponse = await request(startEventOptions);

  const eventToken = JSON.parse(startEventResponse).token;

  var data =  fs.readFileSync(dataLocation).toString('utf8');

  // 6 weeks and 1 day in the past For dateFinalOrderEligibleFrom
  var dateFinalOrderEligibleFrom = dateYYYYMMDD(-43);
  var foEligibleToRespondentDate = finalOrderEligbileToRespondentDate(dateFinalOrderEligibleFrom);

  console.log('Computing DateFinalOrderEligibleFrom  ie 6 weeks and 1 day in the PAST == '+ dateFinalOrderEligibleFrom);
  console.log('Computing 3 months From DateFinalOrderEligibleFrom  == '+ foEligibleToRespondentDate);

  data = data.replace('sixWeeksAndOneDayInThePast',dateFinalOrderEligibleFrom);
  data = data.replace('threeMonthsAfterDateFinalOrderEligibleFrom',foEligibleToRespondentDate);

  var saveBody = {
    data: JSON.parse(data),
    event: {
      id: eventId,
      summary: 'Updating Case For FinalOrder',
      description: 'For CCD E2E Test'
    },
    'event_token': eventToken
  };


  const saveEventOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveEventResponse = await request(saveEventOptions);
  return saveEventResponse;
}

async function soleCitizenApp2DraftAoS(userLoggedIn, caseId, eventId, dataLocation = 'data/final-order-date-eligible-to-respondent.json') {

  let authToken='';
  authToken = await getAuthTokenFor(userLoggedIn, authToken);
  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Citizen Sole Case - Applicant2 Does Draft AoS for case id  %s with Event of  %s', caseId, eventId);

  var ccdApiUrl='';

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else if(testConfig.TestUrl.includes('aat')){
    ccdApiUrl = 'http://ccd-data-store-api-aat.service.core-compute-aat.internal';
  }else if(testConfig.TestUrl.includes('demo')){
    ccdApiUrl = 'http://ccd-data-store-api-demo.service.core-compute-demo.internal';
  }

  //const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/events`;

  const startEventOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startEventResponse = await request(startEventOptions);

  const eventToken = JSON.parse(startEventResponse).token;

  var data =  fs.readFileSync(dataLocation).toString('utf8');

  var saveBody = {
    data: JSON.parse(data),
    event: {
      id: eventId,
      summary: 'Citizen Sole -Applicant2 Does Draft AoS',
      description: 'For CCD E2E Test'
    },
    'event_token': eventToken
  };


  const saveEventOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };
  const saveEventResponse = await request(saveEventOptions);
  return saveEventResponse;
}

async function soleCitizenApp2SubmitAoS(userLoggedIn, caseId, eventId, dataLocation = 'data/final-order-date-eligible-to-respondent.json') {

  let authToken='';
  authToken = await getAuthTokenFor(userLoggedIn, authToken);
  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Updating case whose  id %s with the  event of  %s', caseId, eventId);

  var ccdApiUrl='';

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else if(testConfig.TestUrl.includes('aat')){
    ccdApiUrl = 'http://ccd-data-store-api-aat.service.core-compute-aat.internal';
  }else if(testConfig.TestUrl.includes('demo')){
    ccdApiUrl = 'http://ccd-data-store-api-demo.service.core-compute-demo.internal';
  }

  //const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/events`;

  const startEventOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startEventResponse = await request(startEventOptions);

  //console.log( " ~~~~~~~~~~~~~~~Output of the GET call is " +  startEventResponse) ;

  const eventToken = JSON.parse(startEventResponse).token;

  var data =  fs.readFileSync(dataLocation).toString('utf8');

  // 6 weeks and 1 day in the past For dateFinalOrderEligibleFrom
  var dateFinalOrderEligibleFrom = dateYYYYMMDD(-43);
  var foEligibleToRespondentDate = finalOrderEligbileToRespondentDate(dateFinalOrderEligibleFrom);

  console.log('Computing DateFinalOrderEligibleFrom  ie 6 weeks and 1 day in the PAST == '+ dateFinalOrderEligibleFrom);
  console.log('Computing 3 months From DateFinalOrderEligibleFrom  == '+ foEligibleToRespondentDate);

  data = data.replace('sixWeeksAndOneDayInThePast',dateFinalOrderEligibleFrom);
  data = data.replace('threeMonthsAfterDateFinalOrderEligibleFrom',foEligibleToRespondentDate);

  //console.log( "data .... after Replacement of dates is  is " + data);

  var saveBody = {
    data: JSON.parse(data),
    event: {
      id: eventId,
      summary: 'Updating Case For FinalOrder',
      description: 'For CCD E2E Test'
    },
    'event_token': eventToken
  };


  const saveEventOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };
  const saveEventResponse = await request(saveEventOptions);
  return saveEventResponse;
}

async function soleCitizenApp2UpdateApplication(userLoggedIn, caseId, eventId, dataLocation = 'data/final-order-date-eligible-to-respondent.json') {

  let authToken='';
  authToken = await getAuthTokenFor(userLoggedIn, authToken);
  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Updating case whose  id %s with the  event of  %s', caseId, eventId);

  var ccdApiUrl='';

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else if(testConfig.TestUrl.includes('aat')){
    ccdApiUrl = 'http://ccd-data-store-api-aat.service.core-compute-aat.internal';
  }else if(testConfig.TestUrl.includes('demo')){
    ccdApiUrl = 'http://ccd-data-store-api-demo.service.core-compute-demo.internal';
  }

  //const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/events`;

  const startEventOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startEventResponse = await request(startEventOptions);

  //console.log( " ~~~~~~~~~~~~~~~Output of the GET call is " +  startEventResponse) ;

  const eventToken = JSON.parse(startEventResponse).token;

  var data =  fs.readFileSync(dataLocation).toString('utf8');

  // 6 weeks and 1 day in the past For dateFinalOrderEligibleFrom
  var dateFinalOrderEligibleFrom = dateYYYYMMDD(-43);
  var foEligibleToRespondentDate = finalOrderEligbileToRespondentDate(dateFinalOrderEligibleFrom);

  console.log('Computing DateFinalOrderEligibleFrom  ie 6 weeks and 1 day in the PAST == '+ dateFinalOrderEligibleFrom);
  console.log('Computing 3 months From DateFinalOrderEligibleFrom  == '+ foEligibleToRespondentDate);

  data = data.replace('sixWeeksAndOneDayInThePast',dateFinalOrderEligibleFrom);
  data = data.replace('threeMonthsAfterDateFinalOrderEligibleFrom',foEligibleToRespondentDate);

  //console.log( "data .... after Replacement of dates is  is " + data);

  var saveBody = {
    data: JSON.parse(data),
    event: {
      id: eventId,
      summary: 'Updating Case For FinalOrder',
      description: 'For CCD E2E Test'
    },
    'event_token': eventToken
  };


  const saveEventOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };
  const saveEventResponse = await request(saveEventOptions);
  return saveEventResponse;
}

async function updateRoleForCase(userLoggedIn, caseId, roleToUpdate) {

  let authToken;
  authToken = await getAuthTokenFor(userLoggedIn, authToken);

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  var ccdApiUrl;

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else{
    if(testConfig.TestUrl.includes('demo')){
      console.log('... Env  is DEMO');
    }else if(testConfig.TestUrl.includes('aat')){
      console.log('... Env is AAT');
    }

    ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  }
  const ccdUpdateRolePath ='/case-users';

  const data = {
    'case_users':[
      { 'case_id':caseId,
        'user_id':userId,
        'case_role':'[APPTWOSOLICITOR]'
      }
    ]
  };


  var body = {
    data: JSON.stringify(data)
  };

  console.log('.....printing the body', body);

  const updateCaseRoleCall = {
    method: 'POST',
    uri: ccdApiUrl + ccdUpdateRolePath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const saveEventResponse = await request(updateCaseRoleCall);
  return saveEventResponse;
}

async function updateCaseInCcd(caseId, eventId, dataLocation = 'data/ccd-nfd-update-data.json') {

  const authToken = await getUserToken();

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Updating case with id %s and event %s', caseId, eventId);

  const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NO_FAULT_DIVORCE18/cases/${caseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NO_FAULT_DIVORCE18/cases/${caseId}/events`;

  const startEventOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startEventResponse = await request(startEventOptions);

  const eventToken = JSON.parse(startEventResponse).token;

  var data = fs.readFileSync(dataLocation);
  var saveBody = {
    data: JSON.parse(data),
    event: {
      id: eventId,
      summary: 'Updating Case',
      description: 'For CCD E2E Test'

    },
    'event_token': eventToken
  };

  const saveEventOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveEventResponse = await request(saveEventOptions);
  return saveEventResponse;
}

async function shareCaseToRespondentSolicitor(userLoggedIn, caseId) {
  console.log('.....user  is ..... '+ userLoggedIn );
  const authToken = await getAuthTokenFor(userLoggedIn);
  const serviceToken = await getManageOrgServiceToken();

  var aacHost;

  if(testConfig.TestUrl.includes('localhost') ) {
    aacHost = 'http://localhost:4096';
  }else{
    aacHost = 'http://aac-manage-case-assignment-aat.service.core-compute-aat.internal';
  }

  const caseAssignmentUrl = '/case-assignments';

  const data = {
    assignee_id:'4c152236-a40a-423a-b97e-b9535dda633c',
    //assignee_id:'51087730-dfc0-4c1c-a44d-0ee8e75c3c43', // this is the id of the RS2
    case_id:caseId,
    case_type_id:'NFD'
  };

  const shareCaseToRespondentSolicitor = {
    method: 'POST',
    uri: aacHost + caseAssignmentUrl,
    headers: {
      'Authorization':`Bearer ${authToken}`,
      'ServiceAuthorization':`${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  const saveEventResponse = await request(shareCaseToRespondentSolicitor);
  return saveEventResponse;
}

async function moveFromHoldingToAwaitingCO(dataLocation = 'data/await-co-data.json',caseId) {

  const authToken = await getSystemUserToken();
  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();
  const eventTypeId ='system-progress-held-case';

  var ccdApiUrl='';

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else{
    ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  }


  //const ccdApiUrl =`http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/event-triggers/${eventTypeId}/token`;
  const ccdSubmitEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/events`;

  const startCaseOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startCaseResponse = await request(startCaseOptions);

  const eventId = 'system-progress-held-case';

  const eventToken = JSON.parse(startCaseResponse).token;

  var data =  fs.readFileSync(dataLocation).toString('utf8');
  let dateSixMonthsAgo = dateYYYYMMDD(-180);
  console.log( 'Date six months earlier ' + dateSixMonthsAgo);
  data = data.replace('dueDateToBeReplaced',dateSixMonthsAgo);

  var saveBody = {
    event: {
      id: eventId
    },
    data: JSON.parse(data),
    event_token: eventToken
  };

  const postURL = ccdApiUrl + ccdSubmitEventPath;

  const saveCaseOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSubmitEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  logger.info('----- Before CALL to POST / submitEvent ') ;
  const saveCaseResponse =  await request(saveCaseOptions);
  console.log('~~~~~~~~~~~~----- After CALL to POST / submitEvent  ' + postURL);
  return saveCaseResponse;
}

async function moveCaseToBulk(dataLocation = 'data/bulk-case-data.json',caseId) {

  const authToken = await getSystemUserToken();
  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();
  const eventTypeId ='create-bulk-list';
  const nfdBulkAction ='NO_FAULT_DIVORCE_BulkAction';


  var ccdApiUrl='';

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else{
    ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  }

  //const ccdApiUrl = 'http://ccd-data-store-api-${env}.service.core-compute-${env}.internal';
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/${nfdBulkAction}/event-triggers/${eventTypeId}/token`;
  const ccdSubmitEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/${nfdBulkAction}/cases`;

  const startCaseOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startCaseResponse = await request(startCaseOptions);

  const eventId = 'create-bulk-list';

  const eventToken = JSON.parse(startCaseResponse).token;

  var data =  fs.readFileSync(dataLocation).toString('utf8');
  data = data.replace('caseIdToBeReplaced',caseId);

  var saveBody = {
    event: {
      id: eventId
    },
    data: JSON.parse(data),
    event_token: eventToken
  };

  const postURL = ccdApiUrl + ccdSubmitEventPath;

  const saveCaseOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSubmitEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveCaseResponse =  await request(saveCaseOptions);
  var bulkCaseReferenceId = JSON.parse(saveCaseResponse).id;
  console.log('~~~~~~~~~~~~....bulkCaseReferenceId === ' + bulkCaseReferenceId);
  return bulkCaseReferenceId;
}

async function moveMultipleCasesToBulk(dataLocation = 'data/bulk-case-list-with-three-cases.json', casesList) {

  console.log( 'within the moveMultipleCasesToBulk() method ');

  const authToken = await getSystemUserToken();
  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();
  const eventTypeId ='create-bulk-list';
  const nfdBulkAction ='NO_FAULT_DIVORCE_BulkAction';


  var ccdApiUrl='';

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl = 'http://localhost:4452';
  }else{
    ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  }

  //const ccdApiUrl = 'http://ccd-data-store-api-${env}.service.core-compute-${env}.internal';
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/${nfdBulkAction}/event-triggers/${eventTypeId}/token`;
  const ccdSubmitEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/${nfdBulkAction}/cases`;

  const startCaseOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startCaseResponse = await request(startCaseOptions);

  const eventId = 'create-bulk-list';

  const eventToken = JSON.parse(startCaseResponse).token;

  var data =  fs.readFileSync(dataLocation).toString('utf8');
  data = data.replace('replaceCaseId1',casesList[0]);
  data = data.replace('replaceCaseId2',casesList[1]);
  data = data.replace('replaceCaseId3',casesList[2]);




  var saveBody = {
    event: {
      id: eventId
    },
    data: JSON.parse(data),
    event_token: eventToken
  };

  const postURL = ccdApiUrl + ccdSubmitEventPath;

  const saveCaseOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSubmitEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveCaseResponse =  await request(saveCaseOptions);
  var bulkCaseReferenceId = JSON.parse(saveCaseResponse).id;
  console.log('~~~~~~~~~~~~....bulkCaseReferenceId === ' + bulkCaseReferenceId);
  return bulkCaseReferenceId;
}


async function bulkCaseListSchedule(userLoggedIn, bulkcaseId, caseId, eventId, dataLocation = 'data/bulk-case-list-schedule-data.json') {

  const authToken = await getUserToken();

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Scheduling cases for listing for bulkcase %s AND  the event is %s', bulkcaseId, eventId);


  const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;

  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NO_FAULT_DIVORCE_BulkAction/cases/${bulkcaseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NO_FAULT_DIVORCE_BulkAction/cases/${bulkcaseId}/events`;

  const startEventOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startEventResponse = await request(startEventOptions);
  const eventToken = JSON.parse(startEventResponse).token;

  var courtName = 'birmingham';
  var decisionDateDay = '2014-10-27';
  // hearingDate in Future ( currentTime + 1 Minute )
  var hearingDateInFuture = addMinutesToDate(1);

  const monthDisplayed = padLeadingZeroFor(hearingDateInFuture.getMonth()+1);
  const minutesDisplayed = padLeadingZeroFor(hearingDateInFuture.getMinutes());
  const secondsDisplayed = padLeadingZeroFor(hearingDateInFuture.getSeconds());

  console.log('Decision date is : ' + decisionDateDay   + ':: CaseID is :: ' + caseId  +' and the  Courtname is :: ' + courtName);

  console.log('HearingDateTime == CurrentTime + 2 minutes along  with 0 Padding for Month(MM) and Minutes(mm)  == ' +
    hearingDateInFuture.getFullYear()+
    '-'+monthDisplayed+
    '-'+hearingDateInFuture.getDate()+
    'T'+hearingDateInFuture.getHours()+
    ':'+minutesDisplayed+
    ':'+secondsDisplayed+
    '.'+hearingDateInFuture.getMilliseconds());

  var formattedHearingDateTime = hearingDateInFuture.getFullYear()+
    '-'+monthDisplayed+
    '-'+hearingDateInFuture.getDate()+
    'T'+hearingDateInFuture.getHours()+
    ':'+minutesDisplayed+
    ':'+secondsDisplayed+
    '.'+hearingDateInFuture.getMilliseconds();

  var data =  fs.readFileSync(dataLocation).toString('utf8');

  data = data.replace('decisionDateToBeReplaced', decisionDateDay);
  data = data.replace('caseIdToBeReplaced',caseId);
  data = data.replace('courtNameToBeReplaced', courtName);
  data = data.replace('hearingDateTimeToBeReplaced',formattedHearingDateTime);

  var saveBody = {
    event: {
      id: eventId
    },
    data: JSON.parse(data),
    'event_token': eventToken
  };

  const saveEventOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveEventResponse = await request(saveEventOptions);

  return saveEventResponse;
}

async function bulkCaseListPronounced(userLoggedIn, bulkcaseId, caseId, eventId, dataLocation = 'data/data/bulk-case-list-pronounce-data.json') {

  const authToken = await getUserToken();

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Pronounce list for bulkcase %s AND  the event is %s', bulkcaseId, eventId);

  const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NO_FAULT_DIVORCE_BulkAction/cases/${bulkcaseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NO_FAULT_DIVORCE_BulkAction/cases/${bulkcaseId}/events`;

  const startEventOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startEventResponse = await request(startEventOptions);

  const eventToken = JSON.parse(startEventResponse).token;

  var judgePronounced = 'Yes';

  var data =  fs.readFileSync(dataLocation).toString('utf8');
  data = data.replace('Yes', judgePronounced);


  var saveBody = {
    event: {
      id: eventId
    },
    data: JSON.parse(data),
    'event_token': eventToken
  };

  const saveEventOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveEventResponse = await request(saveEventOptions);

  return saveEventResponse;
}

async function moveCaseToConditionalOderPronounced(eventId, dataLocation = 'data/conditional-order-pronounced.json',caseId) {

  const authToken = await getSystemUserToken();
  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();
  const eventTypeId ='system-pronounce-case';

  logger.info('Moving case to pronounced state for caseID %s AND  the event is %s', caseId, eventId);

  const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/${caseId}/event-triggers/${eventTypeId}/token`;
  const ccdSubmitEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/${caseId}/cases`;

  const startCaseOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startCaseResponse = await request(startCaseOptions);

  const eventToken = JSON.parse(startCaseResponse).token;

  var caseState = 'ConditionalOrderPronounced';

  var data =  fs.readFileSync(dataLocation).toString('utf8');
  data = data.replace('state',caseState);

  var saveBody = {
    event: {
      id: eventId
    },
    data: JSON.parse(data),
    event_token: eventToken
  };

  const postURL = ccdApiUrl + ccdSubmitEventPath;

  const saveCaseOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSubmitEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveEventResponse = await request(saveCaseOptions);

  return saveEventResponse;
}

async function updateFinalOrderEligibleFromDate(caseId, eventId, dataLocation = 'data/final-order-date-eligible-to-respondent.json') {

  const authToken = await getUserToken();

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Updating dateFinalOrderEligibleFrom for Case %s AND  the event is %s', caseId, eventId);

  const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/events`;

  const startEventOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startEventResponse = await request(startEventOptions);

  const eventToken = JSON.parse(startEventResponse).token;
  var eventId = 'system-progress-case-awaiting-final-order';

  //dateFinalOrderEligibleFrom is set to 6weeks and 1 day in the past from today.
  var dateInPast = datechange(-43);
  console.log('6 weeks and 1 day in the PAST  is == ' + dateInPast);

  var data = fs.readFileSync(dataLocation).toString('utf8');
  data = data.replace('sixWeeksOneDayInThePast', dateInPast);

  var saveBody = {
    event: {
      id: eventId
    },
    data: JSON.parse(data),
    'event_token': eventToken
  };

  const saveEventOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveEventResponse = await request(saveEventOptions);

  return saveEventResponse;
}

async function updateAoSToAoSOverdue(caseId, eventId, dataLocation = 'data/aos-overdue.json') {

  const authToken = await getSystemUserToken();
  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();

  logger.info('Updating dueDate for Case %s AND  the event is %s', caseId, eventId);

  var ccdApiUrl;

  if(testConfig.TestUrl.includes('localhost') ) {
    ccdApiUrl='http://localhost:4452';
  }else{
    ccdApiUrl=`http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  }

  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases/${caseId}/events`;

  const startCaseOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startCaseResponse = await request(startCaseOptions);

  const eventToken = JSON.parse(startCaseResponse).token;

  var data =  fs.readFileSync(dataLocation).toString('utf8');
  var dateToBeReplaced = '2021-02-16';
  data = data.replace('dateToBeReplaced',dateToBeReplaced);


  var saveBody = {
    event: {
      id: eventId
    },
    data: JSON.parse(data),
    event_token: eventToken
  };

  const postURL = ccdApiUrl + ccdSaveEventPath;

  const saveEventOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveEventResponse = await request(saveEventOptions);

  return saveEventResponse;
}

function firstLetterToCaps(value){
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

function datechange(numberOfDaysToAdd){
  let currentDateTime = new Date();
  let newDate = new Date();
  newDate = new Date(newDate.setDate(currentDateTime.getDate()+numberOfDaysToAdd));
  let formattedDate = newDate.getDate() + ' ' + months[newDate.getMonth()] + ' ' + newDate.getFullYear();
  console.log( 'Date is ' +  formattedDate);
  return formattedDate;
};

function addMinutesToDate(minutes) {
  return new Date(new Date().getTime() + minutes * 60000);
}

function dateYYYYMMDD(numberOfDaysToAdd){
  let currentDateTime = new Date();
  let newDate = new Date();
  newDate = new Date(newDate.setDate(currentDateTime.getDate()+numberOfDaysToAdd));

  // Padding with leading zero's for MM and DD
  var month = newDate.getMonth()+1;
  month = padLeadingZeroFor(month);

  var day= newDate.getDate();
  day = padLeadingZeroFor(day);

  return  newDate.getFullYear() +'-'+month +'-'+day;
}

function finalOrderEligbileToRespondentDate(dateFinalOrderEligibleFrom){
  let currentDateTime = new Date();
  let newDate = new Date();;
  var foEligibleForRespDate = new Date(newDate.setDate(currentDateTime.getDate()+47)) ; // 47 days from today

  var month = foEligibleForRespDate.getMonth()+1;
  month = padLeadingZeroFor(month);

  var day= foEligibleForRespDate.getDate();
  day = padLeadingZeroFor(day);

  console.log(' FinalOrderEligibleForRespondentDate = Today LESS dateFinalOrderEligibleFrom(ie 43 days )  PLUS  90 days , ' +
    'ie 47 days from today  ==' + foEligibleForRespDate.getFullYear() +'-'+month +'-'+day ) ;

  return  foEligibleForRespDate.getFullYear() +'-'+month +'-'+day;
}

function padLeadingZeroFor(dayOrMonthValue){
  return dayOrMonthValue <= 9 ? dayOrMonthValue = '0'+dayOrMonthValue : dayOrMonthValue;
}

function formatDateToCcdDisplayDate(givenDate = new Date()) {
  let formattedDate = givenDate.getDate() + ' ' + months[givenDate.getMonth()] + ' ' + givenDate.getFullYear();
  return formattedDate;
};

module.exports = {
  createCaseInCcd,
  createNFDCaseInCcd,
  createCaseAndFetchResponse,
  updateCaseInCcd,
  updateNFDCaseInCcd,
  datechange,
  formatDateToCcdDisplayDate,
  firstLetterToCaps,
  updateRoleForCase,
  shareCaseToRespondentSolicitor,
  moveFromHoldingToAwaitingCO,
  moveCaseToBulk,
  dateYYYYMMDD,
  updateFinalOrderDateForNFDCaseInCcd,
  updateFinalOrderEligibleFromDate,
  bulkCaseListSchedule,
  bulkCaseListPronounced,
  moveCaseToConditionalOderPronounced,
  getCaseDetailsFor,
  updateAoSToAoSOverdue,
  getUserId,
  getServiceToken,
  getCaseDetailsAsSolFor,
  getSystemUserToken,
  getCourtAdminUserToken,
  moveMultipleCasesToBulk,
  moveCaseToFinalOrderOverdue,
  getCitizenCaseDetails,
  soleCitizenApp2DraftAoS,
  soleCitizenApp2UpdateApplication,
  soleCitizenApp2SubmitAoS

};
