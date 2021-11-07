const {createNFDCaseInCcd,updateNFDCaseInCcd} = require('../../../helpers/utils');
const {states,events,user,stateDisplayName,eventDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('Reissue Application');

Scenario('Reissue - Digital , Offline and Reissue AoS', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '.....caseCreated in CCD , caseId is ==  ' + caseNumber);

  // solServiceMethod == solicitorService is chosen during  SoT
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AWAITING_SERVICE);

  await I.amOnHomePage();
  await I.wait(5);
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.wait(3);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(5);
  await I.see('Awaiting service');
  await I.see('Issue solicitor service pack');
  await I.checkNextStepForEvent('Solicitor confirm service');
  await I.confirmServiceForSolicitor(caseNumber);
  await I.submitConfirmService(caseNumber);
  await I.checkStateAndEvent(stateDisplayName.AOS_AWAITING_NAME, eventDisplayName.SOLICITOR_CONFIRM_SERVICE);

}).retry(testConfig.TestRetryScenarios);

