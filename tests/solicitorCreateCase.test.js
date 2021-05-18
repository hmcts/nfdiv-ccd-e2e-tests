const { paymentType, yesorno, soleOrJoint} = require('../common/constants');
const testconfig = require('./config');
const { reasonsForDivorce } = require('../common/constants');

let caseNumber;

Feature('Solicitor create case - with fee account');

Scenario('Solicitor create case and make payment', async (I) => {

  await I.amOnHomePage();
  await I.login(testconfig.TestEnvSolUser, testconfig.TestEnvSolPassword);
  await I.clickCreateCase();

  //Kasi

  await I.fillCreateCaseFormAndSubmit();

//  await I.fillSoleOrJointOptionForDivorce(soleOrJoint.SOLE);

  await I.fillSoleOrJointOptionForDivorce();


  await I.fillAboutSolicitorFormAndSubmit();

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

  // Jurisdiction - Apply for a divorce
  await I.selectJurisdictionQuestionPageAndSubmit();

  // Marriage - Irretrievably Broken Down
  await I.marriageBrokenDown();

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
  await I.casePaymentWithFeeAccountAndSubmissionPageFormAndSubmit();

  // HWF Reference Entered ....
  await I.casePaymentWithHWFAndSubmissionPageFormAndSubmit();

  // Case Submission - Before You submit
  await I.caseApplicationCompletePageFormAndSubmit();

  // Case Submission Check Your Answers.
  await I.caseCheckYourAnswersPageFormAndSubmit();

  // Add a Page to Assert EndState of Solicitor - Awaiting Payment Confirmation on Case submission
  // No draft petition should be present , but Uploaded Docs should be present
  // /case-details/1621252499527814

  console.log('....... before Signing Out..........')
  pause();
  await I.solAwaitingPaymentConfPageFormAndSubmit();
  console.log('....... ALL Done . E2E Completed .. ');

  // await I.statementOfTruthAndReconciliationPageFormAndSubmit(yesorno.No);
  // await I.casePaymentWithFeeAccountAndSubmissionPageFormAndSubmit();
  // await I.caseOrderSummaryPageFormAndSubmit(paymentType.FEE_ACCOUNT);
  // await I.caseApplicationCompletePageFormAndSubmit();
  // await I.caseCheckYourAnswersPageFormAndSubmit();
  // await I.solAwaitingPaymentConfPageFormAndSubmit();

  // await I.selectReasonForTheDivorceQuestionPageAndSubmit(reasonsForDivorce.ADULTERY);
  // await I.fillAdulteryDetailsFormAndSubmit();
  // await I.fillAdulteryDetailsSecondPageFormAndSubmit();
  // await I.otherLegalProceedings();
  // await I.financialOrdersSelectButton();
  // await I.claimForCostsSelectButton();
  // await I.uploadTheMarriageCertificateOptional();
  // await I.languagePreferenceSelection();
  // await I.solicitorCreateCheckYourAnswerAndSubmit();
  // caseNumber = await I.solicitorCaseCreatedAndSubmit();
  // caseNumber = caseNumber.replace(/\D/gi, '');
  // console.log(caseNumber);
  // await I.statementOfTruthAndReconciliationPageFormAndSubmit(yesorno.No);
  // await I.casePaymentWithFeeAccountAndSubmissionPageFormAndSubmit();
  // await I.caseOrderSummaryPageFormAndSubmit(paymentType.FEE_ACCOUNT);
  // await I.caseApplicationCompletePageFormAndSubmit();
  // await I.caseCheckYourAnswersPageFormAndSubmit();
  // await I.solAwaitingPaymentConfPageFormAndSubmit();
}).retry(testconfig.TestRetryScenarios);
