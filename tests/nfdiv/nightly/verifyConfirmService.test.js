const {createNFDCaseInCcd,updateNFDCaseInCcd} = require('../../../helpers/utils');
const {states,events,user,stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('Verify NFD Confirm Service');

Scenario('NFD - Move case to ConfirmService State', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '.....caseCreated in CCD , caseId is ==  ' + caseNumber);

  // solServiceMethod == solicitorService is chosen during  SoT
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  // await I.amOnHomePage();
  // await I.wait(5);
  // await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  // await I.wait(3);
  // await I.filterByCaseId(caseNumber);
  // await I.amOnPage('/case-details/' + caseNumber);
  // await I.wait(5);
  // await I.see('Awaiting service');
  // await I.see('Issue solicitor service pack');
  // await I.checkNextStepForEvent('Solicitor Confirm Service');
  // await I.confirmServiceForSolicitor(caseNumber);
  // await I.submitConfirmService(caseNumber);
  // await I.checkStateAndEvent(stateDisplayName.AOS_AWAITING_NAME, events.SOLICITOR_CONFIRM_SERVICE);

}).retry(testConfig.TestRetryScenarios);
