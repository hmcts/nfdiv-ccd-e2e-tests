const {createNFDCaseInCcd} = require('../../helpers/utils');
const {yesorno,paymentType,states,events} = require('../../common/constants');
const assert = require('assert');
const testconfig = require('./../config');

let caseNumber;

Feature('Help With Fees');

Scenario('HWF Refused by Caseworker', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-draft-case.json');
  console.log( '.....caseCreated in CCD and caseId is...... ' + caseNumber);

  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-to-submitted-state.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  await I.amOnHomePage();
  await I.login(testconfig.TestEnvCWUser, testconfig.TestEnvCWPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);

  await I.checkNextStepForEvent(events.HWF_REFUSED);

  await I.fillHwfRefused();

  // check event/state and SignOut
  await I.checkStateAndEvent('Awaiting applicant','HWF Refused');

  console.log('~~~~~~~~~~~~~  Successfull HWF Refused by Caseworker ~~~~~');

}).retry(testconfig.TestRetryScenarios);

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};
