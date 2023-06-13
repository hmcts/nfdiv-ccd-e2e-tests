const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase, getCaseDetailsFor
} = require('../../../helpers/utils');
const { states, events , user, eventDisplayName, stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

let caseNumber;

Feature('NFD - Scanned Documents ');

Scenario('NFD - Attach and Remove Scanned Documents Journey', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log('..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT serviceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS, caseNumber, events.SOLICITOR_SUBMIT_APPLICATION, 'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CW, caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED, 'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA, caseNumber, events.ISSUED_FROM_SUBMITTED, 'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  const shareACase = await updateRoleForCase(user.RS, caseNumber, 'APPTWOSOLICITOR');
  console.log('~~~~~~~~~ Case with Id ' + caseNumber + ' has been SUCCESSFULLY SHARED  to Respondent Solicitior');

  const draftAoS = await updateNFDCaseInCcd(user.RS, caseNumber, events.DRAFT_AOS, 'data/ccd-draft-aos.json');
  verifyState(draftAoS, states.AOS_DRAFTED);

  const submitAoS = await updateNFDCaseInCcd(user.RS, caseNumber, events.SUBMIT_AOS, 'data/ccd-submit-aos.json');
  verifyState(submitAoS, states.HOLDING);

  await I.wait(5);
  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.wait(8);
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(5);
  //await I.shouldBeOnCaseListPage();
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(30);
  await I.checkNextStepForEvent('Attach scanned docs');

  await I.attachScannedDocs(caseNumber);
  // await I.submitScannedDocs(caseNumber);
  await I.checkState(states.ATTACH_SCAN_DOCS,eventDisplayName.OFFLINE_DOCS_RECEIVED_BY_CW);
  await I.checkNextStepForEvent(events.REMOVE_SCANNED_DOCS);
  await I.removeScanDoc();
  await I.checkState(stateDisplayName.OFFLINE_DOCS_RECEIVED_BY_CW,events.REMOVE_SCANNED_DOCS);


}).retry(testConfig.TestRetryScenarios);

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};
