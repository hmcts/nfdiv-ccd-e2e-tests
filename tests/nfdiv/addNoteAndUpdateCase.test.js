const { paymentType,yesorno,events } = require('../../common/constants');
const testconfig = require('./../config');
const {createNFDCaseInCcd} = require('../../helpers/utils');
const assert = require('assert');

let caseNumber;
let caseNumberWithHyphen;


Feature('Add Note , Update Contact, Update Language , Update DueDate and Update Application Type');


Scenario('Create General Email , Referral , Order and verify state and events', async (I) => {


  // Create a Case
  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '~~~ Case with CaseNumber ' + caseNumber + ' created in CCD ');

  await I.amOnHomePage();
  await I.login(testconfig.TestEnvSolUser, testconfig.TestEnvSolPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);

  //SoT & SoR
  await I.checkNextStepForEvent('Case submission');
  await I.statementOfTruthAndReconciliationPageFormAndSubmit(yesorno.No);

  // Case Submission  - Help With Fees Page and Fees Reference Number.
  await I.paymentWithHelpWithFeeAccount();

  // HWF Reference Entered ....
  await I.casePaymentWithHWFAndSubmissionPageFormAndSubmit();

  //Case Submission - ORDER Summary
  await I.caseOrderSummaryPageFormAndSubmit(paymentType.HWF);

  // Case Submission - Before You Submit
  await I.caseApplicationCompletePageFormAndSubmit();

  // Case Submission Check Your Answers.
  await I.caseCheckYourAnswersPageFormAndSubmit();

  await I.solAwaitingPaymentConfPageFormAndSubmit();

  console.log('~~~~~~~~~~~~~  Solicitor Submit Done and Logout ~~~~~~~~');
  console.log('~~~~~~~~~~~~~  Solicitor Login to Create General Email ~~~~~~~~~~~~~');


  await I.login(testconfig.TestEnvCWUser, testconfig.TestEnvCWPassword);
  await I.wait(7);
  await I.shouldBeOnCaseListPage();
  await I.wait(5);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(5);
  await I.checkNextStepForEvent('Add note');

  // Add Case Note
  await I.wait(5);
  await I.createAddCaseNotes(caseNumber);
  await I.wait(2);
  //await I.createAddCaseNoteEventSummary(caseNumber);
  await I.checkStateAndEvent('Awaiting HWF decision','Add note');

  // Update Application Type
  await I.wait(2);
  await I.updateApplicationType(caseNumber);
  await I.wait(2);
 // await I.updateApplicationTypeEventSummary(caseNumber);
  await I.checkStateAndEvent('Awaiting HWF decision','Update application type');

  // Update Due Date
  await I.wait(2);
  await I.updateDueDate();
  await I.wait(2);
  //await I.updateDueDateEventSummary(caseNumber);
  await I.checkStateAndEvent('Awaiting HWF decision','Update due date');

}).retry(testconfig.TestRetryScenarios);
