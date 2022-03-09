const {divorceOrDissolution, user, events, states} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createNFDCaseInCcd, updateNFDCaseInCcd} = require('../../../helpers/utils');

let caseNumber;

Feature('XBrowser based  Sole Divorce Case');

// XB spiders screens from AwaitingHWF till Issued . Both actions done by caseworker.
xScenario('Sole Divorce Case  - at Issued State', async (I) => {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(10);
  await I.shouldBeOnCaseListPage();

  await I.wait(5);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(7);
  await I.checkNextStepForEvent('HWF application accepted');

  await I.wait(3);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(8);

  await I.checkNextStepForEvent('HWF application accepted');
  await I.hwfAccepted(caseNumber);
  await I.wait(2);
  await I.checkStateAndEvent('Submitted','HWF application accepted');

  console.log('~~~~~~~~~~~~~   HWF Code Accepted && State is now Submitted  ~~~~~~~~~~~~~');

  await I.wait(8);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(5);
  await I.checkNextStepForEvent('Application issue');
  await I.fillIssueApplicationMarriageDetails(divorceOrDissolution.DIVORCE);
  await I.checkYourAnswersIssueApplication(divorceOrDissolution.DIVORCE);
  await I.checkStateAndEvent('AoS awaiting','Application issue');

  console.log('~~~~~~~~~~~~~  Case has been Issued and is in AoS awaiting ~~~~~~~~~~~~ ');

}).tag('@crossbrowser').retry(testConfig.TestRetryScenarios);


