const { Logger } = require('@hmcts/nodejs-logging');
const requestModule = require('request-promise-native');
const request = requestModule.defaults();

const fs = require('fs');
const testConfig = require('../tests/config.js');

const logger = Logger.getLogger('helpers/utils.js');

const env = testConfig.TestEnv;
const months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

async function getUserToken() {

  logger.info('~~~~~~~~~~~~~Getting CaseWorker User Token');

  // Setup Details
  const username = testConfig.TestEnvCWUser;
  const password = testConfig.TestEnvCWPassword;
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

async function getSystemUserToken() {

  const username=testConfig.TestSystemUser;
  const password=testConfig.TestSystemUserPW;

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

async function getSolicitorUserToken() {
  logger.info('.........Getting Solicitor User Token');

  // Setup Details
  const username = testConfig.TestEnvSolUser;
  const password = testConfig.TestEnvSolPassword;
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

async function getCourtAdminUserToken() {
  logger.info('.........Getting CourtAdmin User Token');

  // Setup Details
  const username = testConfig.TestEnvCourtAdminUser;
  const password = testConfig.TestEnvCourtAdminPassword;
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
    return Promise.reject(error);
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

async function getRespondentAdminSolicitorUserToken() {

  logger.info('.........Getting Respondent AdminSolicitor User Token..........');

  // Setup Details
  const username = testConfig.TestEnvRespondentSolAdminUser;
  const password = testConfig.TestEnvRespondentSolAdminPassword;
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
    return Promise.reject(err);
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

async function getRespondentSolicitorUserToken() {
  // Setup Details
  const username = testConfig.TestEnvRespondentSolUser;
  const password = testConfig.TestEnvRespondentSolPassword;
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

  // Setup Details
  const username = testConfig.TestEnvLegalAdvisorUser;
  const password = testConfig.TestEnvLegalAdvisorPassword;
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
  logger.info('Getting User Id');

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
  logger.info('Getting Service Token');

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

async function createCaseInCcd(dataLocation = 'data/ccd-basic-data.json') {
  const saveCaseResponse = await createCaseInCcd(dataLocation).catch(error => {
    console.log(error);
  });

  const caseId = JSON.parse(saveCaseResponse).id;
  logger.info('Created case with id %s', caseId);
  return caseId;
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

async function createNFDCaseAndFetchResponse(dataLocation = 'data/ccd-basic-data.json') {

  const authToken = await getSolicitorUserToken();
  //const authToken = await getUserTokenFor(user.SOLS);

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken(); // S2S Auth

  logger.info('Creating Case');

  const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
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

  return authToken;
}

async function updateNFDCaseInCcd(userLoggedIn, caseId, eventId, dataLocation = 'data/ccd-nfd-draft-to-submitted-state') {

  let authToken='';
  authToken = await getAuthTokenFor(userLoggedIn, authToken);

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Updating case with id %s and event %s', caseId, eventId);

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

async function updateRoleForCase(userLoggedIn, caseId, roleToUpdate) {

  let authToken;
  authToken = await getAuthTokenFor(userLoggedIn, authToken);

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
  const ccdUpdateRolePath ='/cases/'+caseId+'/users/'+userId;



  const data = {
    user_id: userId,
    case_roles: ['[APPTWOSOLICITOR]']
  };

  var body = {
    data: JSON.stringify(data)
  };

  console.log('.....printing the body', body);

  const updateCaseRoleCall = {
    method: 'PUT',
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

  const aacHost = 'http://aac-manage-case-assignment-aat.service.core-compute-aat.internal';
  const caseAssignmentUrl = '/case-assignments';

  const data = {
    assignee_id:'4c152236-a40a-423a-b97e-b9535dda633c',
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
  const ccdApiUrl = 'http://ccd-data-store-api-aat.service.core-compute-aat.internal';
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

  var data = fs.readFileSync(dataLocation);

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

  const ccdApiUrl = 'http://ccd-data-store-api-aat.service.core-compute-aat.internal';
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

async function updateAoSToAoSOverdue(dataLocation = 'data/aos-overdue.json',caseId) {

  const authToken = await getSystemUserToken();
  const userId = await getUserId(authToken);
  const serviceToken = await getServiceToken();
  const eventTypeId ='system-progress-to-aos-overdue';

  const ccdApiUrl = 'http://ccd-data-store-api-aat.service.core-compute-aat.internal';
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/event-triggers/${eventTypeId}/token`;
  const ccdSubmitEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/NFD/cases`;

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

  const eventId = 'system-progress-to-aos-overdue';

  const eventToken = JSON.parse(startCaseResponse).token;

  var data =  fs.readFileSync(dataLocation).toString('utf8');
  var fortnightAgo = datechange(-15); // 14 days in the past ... Check this
  data = data.replace('dueDate',fortnightAgo);


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
  console.log( '...... response from CCD is ' + saveCaseResponse);
  return saveCaseResponse;
}

function firstLetterToCaps(value){
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

function datechange(numberOfDaysToAdd){
  let currentDateTime = new Date();
  let newDate = new Date();
  newDate = new Date(newDate.setDate(currentDateTime.getDate()+numberOfDaysToAdd));
  let formattedDate = newDate.getDate() + ' ' + months[newDate.getMonth()] + ' ' + newDate.getFullYear();
  return formattedDate;
};

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
  updateAoSToAoSOverdue

};



