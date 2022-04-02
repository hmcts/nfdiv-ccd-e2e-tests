const {paymentType,yesorno,divorceOrDissolution} = require('../../../common/constants');
const testConfig = require('./../../config');

let caseNumber;

Feature('XBrowser based  Sole Divorce Case');

Scenario('Sole Divorce Application - at Submitted State', async (I) => {

  await I.amOnHomePage();
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.clickCreateCase();
  await I.fillCreateCaseFormAndSubmit();
  await I.fillSoleOrJointOptionForDivorce(yesorno.Yes, divorceOrDissolution.DIVORCE); // 'Yes' for Sole, 'No' for Joint.

  // About Solicitor
  await I.fillAboutSolicitorFormAndSubmit();

  // Marriage - Irretrievably Broken Down
  await I.marriageBrokenDown(divorceOrDissolution.DIVORCE);

  // About Applicant1
  await I.fillAboutThePetitionerFormAndSubmit(divorceOrDissolution.DIVORCE);

  // About Applicant2
  await I.fillAboutTheRespondentFormAndSubmit(divorceOrDissolution.DIVORCE, yesorno.Yes);

  // Applicant 2 Service Details
  await I.fillAboutRespSolicitorFormAndSubmit();

  // Marriage Certificate Details
  await I.completeMarriageCertificateDetailsPageAndSubmit();

  // Jurisdiction
  await I.selectJurisdictionQuestionPageAndSubmit();

  // Other Legal Proceedings
  await I.otherLegalProceedingsDiv();

  // Financial Orders
  await I.financialOrdersSelectButton();

  // Marriage certificate - skipping upload of Marriage Certificate owing to known XB Issues.
  await I.skipUploadingMarriageCertificate();

  // Create Application 'Save Application' and 'Check Your Answers'
  await I.solicitorCreateCheckYourAnswerAndSubmit(divorceOrDissolution.DIVORCE);

  caseNumber = await I.solicitorCaseCreatedAndSubmit();
  caseNumber = caseNumber.toString();
  caseNumber = caseNumber.replace(/\D/g, '');
  console.log('--------------------------------------------- CASE NUMBER ------------------------------------------'+ caseNumber);

  //screen needs to fixed to run successfully
  await I.statementOfTruthAndReconciliationPageFormAndSubmit(yesorno.No, divorceOrDissolution.DIVORCE);

  // Case Submission  - Help With Fees Page and Fees Reference Number.
  await I.paymentWithHelpWithFeeAccount();
  await I.casePaymentWithHWFAndSubmissionPageFormAndSubmit();
  await I.caseOrderSummaryPageFormAndSubmit(paymentType.HWF);

  // Case Submission Check Your Answers.
  await I.caseCheckYourAnswersPageFormAndSubmit();

  // No draft petition should be present , but Uploaded Docs should be present.
  await I.solAwaitingPaymentConfPageFormAndSubmit();
  console.log('~~~~~~~~~~~~~  Solicitor Submit Done ~~~~~~~~');
}).tag('@crossbrowser').retry(testConfig.TestRetryScenarios);
