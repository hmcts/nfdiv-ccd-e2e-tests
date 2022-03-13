const {paymentType,yesorno,states,divorceOrDissolution} = require('../../../common/constants');
const {getCaseDetailsFor} = require('../../../helpers/utils');
const testConfig = require('./../../config');
const assert = require('assert');

let caseNumber;

Feature('Create Sole Civil Application ');

Scenario('Dissolution Application with Documents, HWF accepted and Submit  & Issue Case ', async (I) => {

  await I.amOnHomePage();
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.clickCreateCase();

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
  await I.fillAboutTheRespondentFormAndSubmit(divorceOrDissolution.DISSOLUTION);

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
  await I.uploadTheMarriageCertificateOptional();

  // Create Application 'Save Application' and 'Check Your Answers'
  await I.solicitorCreateCheckYourAnswerAndSubmit(divorceOrDissolution.DISSOLUTION);
  // TODO ASSERT the STATE of the case here after Case Creation
  // Case Submission Steps

  caseNumber = await I.solicitorCaseCreatedAndSubmit();
  caseNumber = caseNumber.toString();
  caseNumber = caseNumber.replace(/\D/g, '');
  console.log('--------------------------------------------- CASE NUMBER ------------------------------------------'+ caseNumber);

  await I.statementOfTruthAndReconciliationPageFormAndSubmit(yesorno.No);

  // Case Submission  - Help With Fees Page and Fees Reference Number.
  await I.paymentWithHelpWithFeeAccount();

  // HWF Reference Entered ....
  await I.casePaymentWithHWFAndSubmissionPageFormAndSubmit();

  //Case Submission - ORDER Summary
  await I.caseOrderSummaryPageFormAndSubmit(paymentType.HWF);

  // Case Submission - Before You Submit

  // Case Submission Check Your Answers.
  await I.caseCheckYourAnswersPageFormAndSubmit();

  // No draft petition should be present , but Uploaded Docs should be present.
  await I.solAwaitingPaymentConfPageFormAndSubmit();

  console.log('~~~~~~~~~~~~~  Solicitor Submit Done ~~~~~~~~');

  await I.wait(8);

  //Login as CaseWorker and Validate HWF Reference
  console.log('~~~~~~~~~~~~~  Caseworker Login to Validate HWF Code ~~~~~~~~~~~~~');

  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(10);
  await I.shouldBeOnCaseListPage();

  await I.wait(5);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(7);
  await I.checkNextStepForEvent('HWF application accepted');

  await I.wait(3);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(8);

  await I.checkNextStepForEvent('HWF application accepted');
  await I.hwfAccepted(caseNumber);
  await I.wait(2);
  await I.checkStateAndEvent('Submitted','HWF application accepted');

  console.log('~~~~~~~~~~~~~   HWF Code Accepted && State is now Submitted  ~~~~~~~~~~~~~');

  //Login As CourtAdmin and Issue the Case ( ie Move case from Submitted State to Issued )
  console.log('....... Login as CourtAdmin And Issue the Case - ie Move case from Submitted to Issued............');

  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(8);
  await I.shouldBeOnCaseListPage();
  await I.wait(7);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(7);
  await I.checkNextStepForEvent('Application issue');
  await I.fillIssueApplicationMarriageDetails(divorceOrDissolution.DISSOLUTION);
  await I.checkYourAnswersIssueApplication(divorceOrDissolution.DISSOLUTION);

  let caseResponse =  await getCaseDetailsFor(caseNumber);

  assert.strictEqual(states.AOS_AWAITING,caseResponse.state);

  console.log('~~~~~~~~~~~~~  Case State now is AoS awaiting ~~~~~~~~~~~~ ');

}).retry(testConfig.TestRetryScenarios);

