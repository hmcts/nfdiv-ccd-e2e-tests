const {paymentType,yesorno,states, events , user} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createNFDCaseInCcd,updateNFDCaseInCcd} = require('../../../helpers/utils');
const assert = require('assert');

let caseNumber;

Feature('General Email , General Referral and General Order');

Scenario('Create General Email , Referral , Order', async (I) => {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '.....caseCreated in CCD , caseId is ==  ' + caseNumber);

  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  // general Email
  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(8);
  //await I.shouldBeOnCaseListPage();
  await I.wait(5);
  await I.amOnPage('/cases/case-details/' + caseNumber);

  await I.wait(30);
  await I.checkNextStepForEvent('Create general email');

  await I.wait(5);
  await I.createGeneralEmailDetails(caseNumber);
  await I.wait(2);
  await I.fillGeneralEmailCya(caseNumber);
  await I.checkState(states.SUBMITTTED,'Create general email');

  // // General Referral
  await I.wait(5);
  await I.checkNextStepForEvent('General referral');
  await I.createGeneralReferral(caseNumber);
  await I.wait(3);
  await I.checkState(states.AWAITING_GENERAL_REFERRAL_PAYMENT,events.GENERAL_REFERRAL);

  //General order
  await I.wait(5);
  await I.checkNextStepForEvent('Create general order');
  await I.wait(3);
  await I.createGeneralOrderDetails(caseNumber);
  await I.wait(2);
  await I.fillGeneralOrderCya(caseNumber);
  await I.checkStateAndEvent(states.AWAITING_GENERAL_REFERRAL_PAYMENT,events.CREATE_GENERAL_ORDER);

}).retry(testConfig.TestRetryScenarios);

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};
