const {createNFDCaseInCcd,updateNFDCaseInCcd} = require('../../../helpers/utils');
const {states,events,user,stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('Alternative Service');


Scenario('Confirm Alternative Service - Journey', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '.....caseCreated in CCD , caseId is ==  ' + caseNumber);

  // solServiceMethod == solicitorService is chosen during  SoT
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AWAITING_SERVICE);

  // General Referral Event
  const awaitingGenConsideration  = await updateNFDCaseInCcd(user.CA,caseNumber, 'caseworker-general-referral','data/ccd-nfd-cw-general-referral.json');
  verifyState(awaitingGenConsideration, states.AWAITING_GEN_CONSIDERATION);

  // Serve By Alternative Method Event
  const serveByAlternativeMethod  = await updateNFDCaseInCcd(user.CA,caseNumber, 'caseworker-serve-by-alternative-method','data/ccd-nfd-update-data.json');
  verifyState(serveByAlternativeMethod, states.AWAITING_ALTERNATIVE_SERVICE);

  // Confirm Alternative service
  const confirmAlternativeService  = await updateNFDCaseInCcd(user.CA,caseNumber, 'caseworker-confirm-alternative-service','data/ccd-nfd-update-data.json');
  verifyState(confirmAlternativeService, states.HOLDING);

}).retry(testConfig.TestRetryScenarios);



