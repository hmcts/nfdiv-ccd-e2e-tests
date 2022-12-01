const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO,moveCaseToBulk,
  updateCaseInCcd,bulkCaseListSchedule,bulkCaseListPronounced,moveCaseToConditionalOderPronounced,
  updateFinalOrderDateForNFDCaseInCcd
} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName, eventDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;
let bulkCaseReferenceId;


Feature('NFD - Create a single Case and move it to Final Order Pronounced');

// Commenting this out as it is flaky  between the states of 'Listed' and 'Pronounced' ,
// CCD downstream moves these in an Asyncrhonous fashion
// And hence it is not possible to automate this  unpredicatable 'WAIT' via a e2e Test.

Scenario('NFD - Verify Final Order pronounced', async function (I) {


  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.clickCreateCase();
  await I.fillCreateTestCaseFormAndSubmit();
  await I.fillCreateTestCase();
  caseNumber = await I.pressSubmit();

  caseNumber = caseNumber.toString();
  caseNumber = caseNumber.replace(/\D/g, '');
  console.log('--------------------------------------------- CASE NUMBER ------------------------------------------'+ caseNumber);

  //final order pages
  await I.checkState(stateDisplayName.AWAITING_FINAL_ORDER, events.TEST_CASE);

  await I.wait(3);
  await I.checkNextStepForEvent('Apply for final order');
  await I.submitApplyForFinalOrder();
  await I.submitApplyForFinalOrderCYA(caseNumber);
  await I.checkEventAndStateOnPageAndSignOut(stateDisplayName.FINAL_ORDER_REQUESTED, events.APPLY_FOR_FINAL_ORDER);

  // TODO Refactor or Delete this  - as there is no bulkCaseReference created yet .

  // await I.wait(5);
  // await I.amOnPage("/",testConfig.TestTimeToWaitForText);;
  // await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  // await I.wait(5);
  // await I.filterByBulkCaseReference(bulkCaseReferenceId);
  // await I.amOnPage('/case-details/' + caseNumber);
  // await I.wait(5);
  // await I.checkNextStepForEvent('Grant Final order');
  // await I.submitGrantFinalOrder(caseNumber);
  // await I.submitGrantFinalOrderCYA(caseNumber);
  //await I.checkState(stateDisplayName.FINAL_ORDER_COMPLETED, events.GRANT_FINAL_ORDER);


}).retry(testConfig.TestRetryScenarios);
