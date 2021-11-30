const { paymentType, yesorno, soleOrJoint} = require('../common/constants');
const testconfig = require('./config');
const { reasonsForDivorce } = require('../common/constants');

let caseNumber;

Feature('CaseWorker Validates HWF Code Successfully for a Case');

Scenario('Caseworker validate HWF Reference and moves State to Application Submitted', async (I) => {

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

  // Jurisdiction
  await I.selectJurisdictionQuestionPageAndSubmit();

  // Create Application 'Save Application' and 'Check Your Answers'
  await I.solicitorCreateCheckYourAnswerAndSubmit();
  // TODO ASSERT the STATE of the case here after Case Creation
  // Case Submission Steps
  caseNumber = await I.solicitorCaseCreatedAndSubmit();
  caseNumber = caseNumber.replace(/\D/gi, '');
  console.log('--------------------------------------------- CASE NUMBER ------------------------------------------'+ caseNumber);

  // Case Submission - StatementOfTruth Reconciliation Page.
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

  // Add a Assert EndState of Solicitor -
  // No draft petition PDF should be present , but Uploaded Docs MUST  be present
  await I.solAwaitingPaymentConfPageFormAndSubmit();
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~~~~~~  Solicitor Submit Application Done ~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ');

  await I.wait(5);

  // Login as CaseWorker and Validate HWF Reference
  console.log('....... Login as Caseworker && Validate HWF Code ..... ');

  await I.login(testconfig.TestEnvCWUser, testconfig.TestEnvCWPassword);
  await I.wait(3);
  await I.shouldBeOnCaseListPage();
  await I.wait(2);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(6);

  await I.selectHWFReferenceValidation();
  await I.validateHWFCode();
  await I.fillHwfEventSummaryFor(caseNumber);
  await I.wait(2);
  //await I.see('Application paid and submitted');
  await I.caseWorkerCheckStateEventAndSignOut('Application paid and submitted','Validate HWF Code');
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~~~~~~  Application State Change to Submitted ...  ~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ');




}).retry(testconfig.TestRetryScenarios);
