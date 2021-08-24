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

async function getSolicitorUserToken() {
  logger.info('.........Getting Solicitor User Token');

  // Setup Details
  const username = testConfig.TestEnvSolUser;
  const password = testConfig.TestEnvSolPassword;
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

async function getCourtAdminUserToken() {
  logger.info('.........Getting CourtAdmin User Token');

  // Setup Details
  const username = testConfig.TestEnvCourtAdminUser;
  const password = testConfig.TestEnvCourtAdminPassword;
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

async function getRespondentAdminSolicitorUserToken() {

  logger.info('.........Getting Respondent AdminSolicitor User Token..........');

  // Setup Details
  const username = testConfig.TestEnvRespondentSolAdminUser;
  const password = testConfig.TestEnvRespondentSolAdminPassword;
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

async function getRespondentSolicitorUserToken() {

  logger.info('.........Getting Respondent Solicitor User Token..........');

  // Setup Details
  const username = testConfig.TestEnvRespondentSolUser;
  const password = testConfig.TestEnvRespondentSolPassword;
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

  const idamBaseUrl = 'https://idam-api.aat.platform.hmcts.net';

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
  const s2sAuthPath = '/lease';
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
      microservice: 'nfdiv_case_api',
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

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

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
  return authToken;
}

async function updateNFDCaseInCcd(userLoggedIn, caseId, eventId, dataLocation = 'data/ccd-nfd-draft-to-submitted-state') {

  let authToken;
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
  //console.log(`.....printing the response `, JSON.parse(saveEventResponse));
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

  console.log('.......... inside the shareCaseToRespondentSolicitor and caseId is'+caseId);
  console.log('.....userLoggedin is'+ userLoggedIn );

  let authToken;
  authToken = await getAuthTokenFor(userLoggedIn, authToken);

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  const ccdApiUrl = 'http://aac-manage-case-assignment-${env}.service.core-compute-${env}.internal';
  const caseAssignmentUrl = '/case-assignments';

  const data = {
    assignee_id: '4c152236-a40a-423a-b97e-b9535dda633c',
    case_id: caseId,
    case_type_id: 'NFD'
  };


  var body = {
    data: JSON.stringify(data)
  };

  console.log('.....printing the body'+ body);

  const shareCaseToRespondentSolicitor = {
    method: 'POST',
    uri: ccdApiUrl+caseAssignmentUrl,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  const saveEventResponse = await request(shareCaseToRespondentSolicitor);
  console.log('.....printing the response ', JSON.parse(saveEventResponse).pretty);
  return saveEventResponse;
}




const getBaseUrl = () => {
  return 'manage-case.aat.platform.hmcts.net';
};

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
  getBaseUrl,
  datechange,
  formatDateToCcdDisplayDate,
  firstLetterToCaps,
  updateRoleForCase,
  shareCaseToRespondentSolicitor
};
