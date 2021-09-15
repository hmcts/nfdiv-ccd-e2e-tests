const {createNFDCaseInCcd} =  require('../../../helpers/utils');
const {yesorno,paymentType, states,events} =require('../../../common/constants');
const assert = require('assert');
const testconfig = require('./../../config');

let caseNumber;

Feature('PBA Payment');

Scenario('NFD - Submit Sole Divorce Case using PBA ', async function (I) {

  // Create a Case
  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '~~~ Case with CaseNumber ' + caseNumber + ' created in CCD ');

  await I.amOnHomePage();
  await I.login(testconfig.TestEnvSolUser, testconfig.TestEnvSolPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);

  await I.checkNextStepForEvent('Case submission');
  await I.statementOfTruthAndReconciliationPageFormAndSubmit(yesorno.No);

  // - PBA Account
  await I.paymentWithPbaAccount();

  // PBA Account Reference and Number
  await I.fillPba();

  //Case Submission - ORDER Summary
  await I.caseOrderSummaryPageFormAndSubmit(paymentType.FEE_ACCOUNT);

  // Case Submission - Before You Submit
  await I.caseApplicationCompletePageFormAndSubmit();

  // Case Submission Check Your Answers.
  await I.caseCheckYourAnswersPageFormAndSubmit();

  await I.checkStateAndEvent(states.SUBMITTTED,events.CASE_SUBMISSION);

  // Save & SignOut
  console.log('~~~~~~~~~~~~~  Completed Successfull test for PBA Payment   ~~~~~~~~');

}).retry(testconfig.TestRetryScenarios);
