const { paymentType, yesorno, soleOrJoint} = require('../common/constants');
const testconfig = require('./config');
const { reasonsForDivorce } = require('../common/constants');

let caseNumber;

Feature('Solicitor create NFD case - with fee account');

//NFD Create Case + Submit Application
Scenario('Solicitor create case and make payment', async (I) => {

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
  // No draft petition should be present , but Uploaded Docs should be present

  console.log('....... before Signing Out..........')
  await I.solAwaitingPaymentConfPageFormAndSubmit();
  console.log('....... ALL Done . E2E Completed for Solicitor Create Case and Submit Application.. ');
}).retry(testconfig.TestRetryScenarios);
