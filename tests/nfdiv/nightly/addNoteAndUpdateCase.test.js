const { paymentType,yesorno,events, user, states} = require('../../../common/constants');
const testconfig = require('./../../config');
const {createNFDCaseInCcd, updateNFDCaseInCcd} = require('../../../helpers/utils');
const assert = require('assert');

let caseNumber;

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};


Feature('Add Note , Update Contact, Update Language , Update DueDate and Update Application Type');

Scenario('Create General Email , Referral , Order and verify state and events', async (I) => {

  // Create a Case
  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '.....caseCreated in CCD , caseId is ==  ' + caseNumber);

  //SoT solServiceMethod == solicitorService is chosen during  SoT
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  // await I.amOnHomePage();
  // await I.login(testconfig.TestEnvSolUser, testconfig.TestEnvSolPassword);
  // await I.filterByCaseId(caseNumber);
  // await I.amOnPage('/case-details/' + caseNumber);
  //
  // //SoT & SoR
  // await I.checkNextStepForEvent('Case submission');
  // await I.statementOfTruthAndReconciliationPageFormAndSubmit(yesorno.No);
  //
  // // Case Submission  - Help With Fees Page and Fees Reference Number.
  // await I.paymentWithHelpWithFeeAccount();
  //
  // // HWF Reference Entered ....
  // await I.casePaymentWithHWFAndSubmissionPageFormAndSubmit();
  //
  // //Case Submission - ORDER Summary
  // await I.caseOrderSummaryPageFormAndSubmit(paymentType.HWF);
  //
  // // Case Submission - Before You Submit
  // await I.caseApplicationCompletePageFormAndSubmit();
  //
  // // Case Submission Check Your Answers.
  // await I.caseCheckYourAnswersPageFormAndSubmit();
  //
  // await I.solAwaitingPaymentConfPageFormAndSubmit();
  //
  // console.log('~~~~~~~~~~~~~  Solicitor Submit Done and Logout ~~~~~~~~');
  // console.log('~~~~~~~~~~~~~  Solicitor Login to Create General Email ~~~~~~~~~~~~~');

  await I.amOnHomePage();
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
  await I.createAddCaseNoteEventSummary(caseNumber);
  await I.checkState('Submitted','Add note');

  // Update Application Type
  await I.wait(2);
  await I.checkNextStepForEvent('Update application type');
  await I.updateApplicationType(caseNumber);
  await I.updateApplicationTypeSubmit(caseNumber);
  await I.wait(2);
  await I.checkState('Submitted','Update application type');

  // // Update Due Date
  await I.wait(2);
  await I.checkNextStepForEvent('Update due date');
  await I.updateDueDate();
  await I.wait(2);
  await I.updateDueDateEventSummary(caseNumber);
  await I.checkState('Submitted','Update due date');

  // TODO
  // upload Confidential Document
  // upload Document as caseworker.

}).retry(testconfig.TestRetryScenarios);
