const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor} = require('../../../helpers/utils');
const { states, events , user} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');


const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD  Share A Case');

Scenario('NFD - Share a Case and Submit AoS', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT solServiceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  const shareACase = await updateRoleForCase(user.CA,caseNumber,'APPTWOSOLICITOR');

  //const caseAvailableToRespondentSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);
  //const caseAvailableToRespondentSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseId);
}).retry(testConfig.TestRetryScenarios);
