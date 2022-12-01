const {divorceOrDissolution, user, events, states} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createNFDCaseInCcd, updateNFDCaseInCcd} = require('../../../helpers/utils');
const assert = require('assert');

let caseNumber;

Feature('XBrowser based  Sole Divorce Case');

// XB spiders screens from AwaitingHWF till Issued . Both actions done by caseworker.
Scenario('Sole Divorce Case  - at Issued State', async (I) => {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  await I.wait(5);
  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(5);

  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(7);
  await I.checkNextStepForEvent('Application issue');
  await I.fillIssueApplicationMarriageDetails(divorceOrDissolution.DIVORCE);
  await I.checkYourAnswersIssueApplication(divorceOrDissolution.DIVORCE);

  await I.checkEventAndStateOnPageAndSignOut('AoS awaiting','Application issue');

//}).retry(testConfig.TestRetryScenarios);

}).tag('@crossbrowser').retry(testConfig.TestRetryScenarios);


const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};
