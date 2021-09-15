const {paymentType,yesorno,states, events , user} = require('../../../common/constants');
const testconfig = require('./../../config');
const {createNFDCaseInCcd,updateNFDCaseInCcd} = require('../../../helpers/utils');
const assert = require('assert');

let caseNumber;

Feature('General Email , General Referral and General Order');

Scenario('Create General Email , Referral , Order and verify state and events', async (I) => {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '.....caseCreated in CCD , caseId is ==  ' + caseNumber);

  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  // general Email
  await I.amOnHomePage();
  await I.login(testconfig.TestEnvCWUser, testconfig.TestEnvCWPassword);
  await I.wait(7);
  await I.shouldBeOnCaseListPage();
  await I.wait(5);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(5);
  await I.checkNextStepForEvent('Create general email');

  await I.wait(5);
  await I.createGeneralEmailDetails(caseNumber);
  await I.wait(2);
  await I.checkStateAndEvent(states.AWAITING_HWF,'Create general email');

  // General order
  await I.wait(2);
  await I.createGeneralOrderDetails(caseNumber);
  await I.wait(2);
  await I.checkStateAndEvent(states.AWAITING_HWF,'Create general order');

  // General Referral
  await I.wait(2);
  await I.createGeneralReferral(caseNumber);
  await I.wait(2);
  await I.checkStateAndEvent(states.AWAITING_GENERAL_CONSIDERATION,'General referral');

}).retry(testconfig.TestRetryScenarios);

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};
