const {paymentType,yesorno,states,divorceOrDissolution} = require('../../../common/constants');
const {getCaseDetailsFor, getCaseDetailsAsSolFor} = require('../../../helpers/utils');
const testConfig = require('./../../config');
const assert = require('assert');

let caseNumber;

Feature('Create Sole CP Case');

Scenario('CP Case with Documents, HWF and Case Issued', async (I) => {

  await I.amOnHomePage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.clickCreateCase();
  await I.wait(15);
  await I.fillCreateCaseFormAndSubmit();

  // Sole &&  Dissolution
  await I.fillSoleOrJointOptionForDivorce(yesorno.Yes,divorceOrDissolution.DISSOLUTION);

  // About Solicitor
  await I.fillAboutSolicitorFormAndSubmit();

  // Marriage - Irretrievably Broken Down
  await I.marriageBrokenDown(divorceOrDissolution.DISSOLUTION);

  // About Applicant1
  await I.fillAboutThePetitionerFormAndSubmit(divorceOrDissolution.DISSOLUTION);

  // About Applicant2
  await I.fillAboutTheRespondentFormAndSubmit(divorceOrDissolution.DISSOLUTION, yesorno.Yes);

  // Applicant 2 Service Details
  await I.fillAboutRespSolicitorFormAndSubmit();

  // Marriage Certificate Details
  await I.completeMarriageCertificateDetailsPageAndSubmit();

  // Jurisdiction
  await I.selectJurisdictionQuestionPageAndSubmit();

  // Other Legal Proceedings
  await I.otherLegalProceedingsCivil();

  // Financial Orders
  await I.financialOrdersSelectButton();

  // Upload the marriage certificate
  await I.skipUploadingMarriageCertificate();

  // Create Application 'Save Application' and 'Check Your Answers'
  await I.solicitorCreateCheckYourAnswerAndSubmit(divorceOrDissolution.DISSOLUTION);
  // TODO ASSERT the STATE of the case here after Case Creation
  // Case Submission Steps

  await I.wait(7);

  caseNumber = await I.solicitorCaseCreatedAndSubmit();
  caseNumber = caseNumber.toString();
  caseNumber = caseNumber.replace(/\D/g, '');
  console.log('--------------------------------------------- CASE NUMBER ------------------------------------------'+ caseNumber);

  await I.statementOfTruthAndReconciliationPageFormAndSubmit(yesorno.No, divorceOrDissolution.DISSOLUTION);

  // Case Submission  - Help With Fees Page and Fees Reference Number.
  await I.paymentWithHelpWithFeeAccount();

  // HWF Reference Entered ....
  await I.casePaymentWithHWFAndSubmissionPageFormAndSubmit();

  //Case Submission - ORDER Summary
  await I.caseOrderSummaryPageFormAndSubmit(paymentType.HWF);

  // Case Submission Check Your Answers.
  await I.caseCheckYourAnswersPageFormAndSubmit();


  // No draft petition should be present , but Uploaded Docs should be present.
  await I.solAwaitingPaymentConfPageFormAndSubmit();
  console.log('Checked State AwaitingHWFDecision');



}).retry(testConfig.TestRetryScenarios);

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};
