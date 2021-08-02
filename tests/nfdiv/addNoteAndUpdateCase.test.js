const { paymentType,yesorno,events } = require('../../common/constants');
const testconfig = require('./../config');
const {createNFDCaseInCcd} = require('../../helpers/utils');
const assert = require('assert');

let caseNumber;
let caseNumberWithHyphen;


Feature('Add Note , Update Contact, Update Language , Update DueDate and Update Application Type');


Scenario('Create General Email , Referral , Order and verify state and events', async (I) => {


  await I.amOnHomePage();
  await I.login(testconfig.TestEnvSolUser, testconfig.TestEnvSolPassword);
  await I.clickCreateCase();

  await I.fillCreateCaseFormAndSubmit();
  await I.fillSoleOrJointOptionForDivorce();

  // About Solicitor
  await I.fillAboutSolicitorFormAndSubmit();

  // Marriage - Irretrievably Broken Down
  await I.marriageBrokenDown();

  // About Applicant1
  await I.fillAboutThePetitionerFormAndSubmit();

  // About Applicant2
  await I.fillAboutTheRespondentFormAndSubmit();

  // Applicant 2 Service Details
  await I.fillAboutRespSolicitorFormAndSubmit();

  // Marriage Certificate Details
  await I.completeMarriageCertificateDetailsPageAndSubmit();

  // Jurisdiction
  await I.selectJurisdictionQuestionPageAndSubmit();

  // Other Legal Proceedings
  await I.otherLegalProceedings();

  // Financial Orders
  await I.financialOrdersSelectButton();

  // Claim Costs
  await I.claimForCostsSelectButton();

  // Upload the marriage certificate
  await I.uploadTheMarriageCertificateOptional();

  // Select Language
  await I.languagePreferenceSelection();


  // Create Application 'Save Application' and 'Check Your Answers'
  await I.solicitorCreateCheckYourAnswerAndSubmit();
  // TODO ASSERT the STATE of the case here after Case Creation
  // Case Submission Steps

  caseNumber = await I.solicitorCaseCreatedAndSubmit();

  caseNumber = caseNumber.replace(/\D/gi, '');
  console.log('..................... '+caseNumber+' .............');

  //await I.shouldBeAbleToFilterAndSearch(caseNumber);

  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~ Start Draft to Submit   ~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ');

  await I.statementOfTruthAndReconciliationPageFormAndSubmit(yesorno.Yes);

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
  await I.createAddCaseNoteEventSummary(caseNumber);
  await I.checkStateAndEvent('Draft','Add note');

  // Update Application Type
  await I.wait(2);
  await I.updateApplicationType(caseNumber);
  await I.wait(2);
  await I.updateApplicationTypeEventSummary(caseNumber);
  await I.checkStateAndEvent('Draft','Update application type');

  // Update Due Date
  await I.wait(2);
  await I.updateDueDate();
  await I.wait(2);
  await I.updateDueDateEventSummary(caseNumber);
  await I.checkStateAndEvent('Draft','Update due date');

}).retry(testconfig.TestRetryScenarios);
