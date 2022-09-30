const {createNFDCaseInCcd,updateNFDCaseInCcd} = require('../../../helpers/utils');
const {user,states,events} = require('../../../common/constants');

const assert = require('assert');
const testConfig = require('./../../config');

let caseNumber;

Feature('Help With Fees');

Scenario('HWF Refused by Caseworker', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '.....caseCreated in CCD and caseId is...... ' + caseNumber);

  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);

  await I.checkNextStepForEvent(events.HWF_REFUSED);

  await I.fillHwfRefused();

  // check event/state and SignOut
  await I.checkStateAndEvent('Awaiting applicant','HWF refused');

  console.log('~~~~~~~~~~~~~  Successfull HWF Refused by Caseworker ~~~~~');

}).retry(testConfig.TestRetryScenarios);

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};
