const {paymentType,yesorno,divorceOrDissolution,url} = require('../../../common/constants');
const testConfig = require('./../../config');

let caseNumber;

Feature('Create Sole Application ');

Scenario('Divorce Application with Documents, HWF accepted and Submit the Case ', async (I) => {

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  //Commenting out to check old way
  await I.wait(10);
  await I.refreshPage();
  //await I.createCaseWithUrl(url.HOW_DO_YOU_WANT_TO_APPLY);
  //await I.wait(5);
  //pause();

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
  await I.fillAboutTheRespondentFormAndSubmit(divorceOrDissolution.DIVORCE,yesorno.Yes);

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

  // Upload the marriage certificate
  await I.uploadTheMarriageCertificateOptional();

  // Create Application 'Save Application' and 'Check Your Answers'
  await I.solicitorCreateCheckYourAnswerAndSubmit(divorceOrDissolution.DIVORCE);
  // TODO ASSERT the STATE of the case here after Case Creation
  // Case Submission Steps

  caseNumber = await I.solicitorCaseCreatedAndSubmit();
  caseNumber = caseNumber.toString();
  caseNumber = caseNumber.replace(/\D/g, '');
  console.log('--------------------------------------------- CASE NUMBER ------------------------------------------'+ caseNumber);

  //screen needs to fixed to run successfully
  await I.statementOfTruthAndReconciliationPageFormAndSubmit(yesorno.No, divorceOrDissolution.DIVORCE);

  // Case Submission  - Help With Fees Page and Fees Reference Number.
  await I.paymentWithHelpWithFeeAccount();

  // HWF Reference Entered ....

  // Start here ....
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

  // //Login as CaseWorker and Validate HWF Reference
  console.log('~~~~~~~~~~~~~  Caseworker Login to Validate HWF Code ~~~~~~~~~~~~~');

  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(10);
  //await I.shouldBeOnCaseListPage();

  await I.wait(5);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(7);
  await I.checkNextStepForEvent('HWF application accepted');

  await I.hwfAccepted(caseNumber);
  await I.wait(2);
  await I.checkStateAndEvent('Submitted','HWF application accepted');

  console.log('~~~~~~~~~~~~~   HWF Code Accepted && State is now Submitted  ~~~~~~~~~~~~~');

  //Login As CourtAdmin and Issue the Case ( ie Move case from Submitted State to Issued )
  console.log('....... Login as CourtAdmin And Issue the Case - ie Move case from Submitted to Issued............');

  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(8);
  //await I.shouldBeOnCaseListPage();
  await I.wait(7);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(7);
  await I.checkNextStepForEvent('Application issue');
  await I.fillIssueApplicationMarriageDetails(divorceOrDissolution.DIVORCE);
  await I.checkYourAnswersIssueApplication(divorceOrDissolution.DIVORCE);
  await I.checkStateAndEvent('AoS awaiting','Application issue');

  console.log('~~~~~~~~~~~~~  Case State now is AoS awaiting ~~~~~~~~~~~~ ');

}).retry(testConfig.TestRetryScenarios);

// covered in the solicitorCreateSoleCivilPartnershipApplication.test.js . To Delete.
xScenario('Dissolution Application with Documents, HWF accepted and Submit the Case ', async (I) => {

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);

  await I.clickCreateCase();
  await I.fillCreateCaseFormAndSubmit();

  await I.wait(8);
  //await I.createCaseWithUrl(url.HOW_DO_YOU_WANT_TO_APPLY);

  // Sole &&  Dissolution
  await I.fillSoleOrJointOptionForDivorce(yesorno.Yes,divorceOrDissolution.DISSOLUTION);

  // About Solicitor
  await I.fillAboutSolicitorFormAndSubmit();

  // Marriage - Irretrievably Broken Down
  await I.marriageBrokenDown(divorceOrDissolution.DISSOLUTION);

  // About Applicant1
  await I.fillAboutThePetitionerFormAndSubmit(divorceOrDissolution.DISSOLUTION);

  // About Applicant2
  await I.fillAboutTheRespondentFormAndSubmit(divorceOrDissolution.DISSOLUTION,  yesorno.Yes);

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
  //await I.shouldBeOnCaseListPage();

  await I.wait(5);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(7);
  await I.checkNextStepForEvent('HWF application accepted');

  await I.wait(3);
  await I.amOnPage('/cases/case-details/' + caseNumber);
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
  //await I.shouldBeOnCaseListPage();
  await I.wait(7);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(7);
  await I.checkNextStepForEvent('Application issue');
  await I.fillIssueApplicationMarriageDetails(divorceOrDissolution.DISSOLUTION);
  await I.checkYourAnswersIssueApplication(divorceOrDissolution.DISSOLUTION);
  await I.checkStateAndEvent('AoS awaiting','Application issue');

  console.log('~~~~~~~~~~~~~  Case State now is AoS awaiting ~~~~~~~~~~~~ ');

}).retry(testConfig.TestRetryScenarios);

