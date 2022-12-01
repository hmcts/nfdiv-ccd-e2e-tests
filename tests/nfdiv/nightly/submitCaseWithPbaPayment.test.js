const {createNFDCaseInCcd} =  require('../../../helpers/utils');
const {yesorno,paymentType, states,events, divorceOrDissolution} =require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

let caseNumber;

Feature('PBA Payment');

Scenario('NFD - Submit Sole Divorce Case using PBA ', async function (I) {

  // Create a Case
  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '~~~ Case with CaseNumber ' + caseNumber + ' created in CCD ');

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  //await I.filterByCaseId(caseNumber);
  await I.wait(5);
  await I.amOnPage('case-details/' + caseNumber);
  await I.wait(7);
  await I.checkNextStepForEvent('Sign and submit');
  await I.wait(5);
  await I.statementOfTruthAndReconciliationPageFormAndSubmit(yesorno.No, divorceOrDissolution.DIVORCE);

  // - PBA Account
  await I.paymentWithPbaAccount();

  // PBA Account Reference and Number
  await I.fillPba();

  //Case Submission - ORDER Summary
  await I.caseOrderSummaryPageFormAndSubmit(paymentType.FEE_ACCOUNT);

  // Case Submission - Before You Submit
  await I.caseCheckYourAnswersPageFormAndSubmit();

  await I.checkStateAndEvent(states.SUBMITTTED,events.CASE_SUBMISSION);

  // Save & SignOut
  console.log('~~~~~~~~~~~~~  Completed Successfull test for PBA Payment   ~~~~~~~~');

}).retry(testConfig.TestRetryScenarios);
