const {createNFDCaseInCcd,updateNFDCaseInCcd} = require('../../../helpers/utils');
const {states,events,user,stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('Verify NFD CW Upload Doc');

Scenario('NFD - Adding a doc as CW in Submitted state', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '.....caseCreated in CCD , caseId is ==  ' + caseNumber);

  // solServiceMethod == solicitorService is chosen during  SoT
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  await I.amOnHomePage();
  await I.wait(5);
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(3);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(5);
  await I.see('Submitted');
  await I.see('Case submission');
  await I.checkNextStepForEvent('Upload document');
  await I.submitUploadDocCW(caseNumber);
  await I.submitUploadDocCWSubmit(caseNumber);
  await I.checkStateAndEvent(stateDisplayName.SUBMITTED, events.UPLOAD_DOCUMENT);
}).retry(testConfig.TestRetryScenarios);
