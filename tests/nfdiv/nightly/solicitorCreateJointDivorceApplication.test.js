const {paymentType,yesorno,divorceOrDissolution, user} = require('../../../common/constants');
const testconfig = require('./../../config');
const {updateRoleForCase, shareCaseToRespondentSolicitor} = require('../../../helpers/utils');
const assert = require('assert');

let caseNumber;

Feature('Create Joint Application ');

Scenario('Divorce Application (Joint) with Documents, HWF accepted and Submit the Case ', async (I) => {

  await I.amOnHomePage();
  await I.login(testconfig.TestEnvSolUser, testconfig.TestEnvSolPassword);
  await I.clickCreateCase();

  await I.fillCreateCaseFormAndSubmit();
  await I.fillSoleOrJointOptionForDivorce(yesorno.No, divorceOrDissolution.DIVORCE); // 'Yes' for Sole, 'No' for Joint.

  // About Solicitor
  await I.fillAboutSolicitorFormAndSubmit();

  // Marriage - Irretrievably Broken Down
  await I.marriageBrokenDown(divorceOrDissolution.DIVORCE);;

  // About Applicant1
  await I.fillAboutThePetitionerFormAndSubmit(divorceOrDissolution.DIVORCE);;

  // About Applicant2
  await I.fillAboutTheRespondentFormAndSubmit(divorceOrDissolution.DIVORCE);;

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

  await I.checkNextStepForEvent('Invite Applicant 2');
  caseNumber = await I.inviteApplicant2();

  await I.signOut();

  caseNumber = caseNumber.toString();
  caseNumber = caseNumber.replace(/\D/gi, '');
  console.log('--------------------------------------------- CASE NUMBER ------------------------------------------'+ caseNumber);

  //share case to respondent solic
  const shareACase = await updateRoleForCase(user.RS,caseNumber,'APPTWOSOLICITOR');
  // const caseSharedToRespSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);
  // assert.strictEqual(JSON.parse(caseSharedToRespSolicitor).status_message, 'Roles [APPTWOSOLICITOR] from the organisation policies successfully assigned to the assignee.');

  console.log('~~~~~~~~~ Case with Id ' + caseNumber +' has been SUCCESSFULLY SHARED  to Respondent Solicitior');

  await I.amOnHomePage();
  await I.login(testconfig.TestEnvRespondentSolUser, testconfig.TestEnvRespondentSolPassword);
  await I.wait(10);
  await I.shouldBeOnCaseListPage();

  await I.wait(5);
  await I.amOnPage('/case-details/' + caseNumber);

  await I.checkNextStepForEvent('Submit joint application');
  await I.submitJointApplication();
  await I.signOut();

  console.log('~~~~~~~~~~~~~  Respondent Solicitor Submit Joint Application Done ~~~~~~~~');

  await I.wait(5);
  await I.amOnHomePage();
  await I.login(testconfig.TestEnvSolUser, testconfig.TestEnvSolPassword);
  await I.wait(10);
  await I.shouldBeOnCaseListPage();

  await I.wait(5);
  await I.amOnPage('/case-details/' + caseNumber);

  await I.checkNextStepForEvent('Sign and submit');
  await I.submitSignAndSubmit();

  await I.paymentWithPbaAccount();

  await I.fillPba();

  await I.PbaAccountOrderSummary();

  await I.caseCheckYourAnswersPageFormAndSubmit();

  await I.signOut();

  console.log('~~~~~~~~~~~~~  Solicitor sign and submit Joint Application Done ~~~~~~~~');

  // verifyTab

  await I.wait(8);

  //Login As CourtAdmin and Issue the Case ( ie Move case from Submitted State to Issued )
  console.log('....... Login as CourtAdmin And Issue the Case - ie Move case from Submitted to Issued............');

  await I.amOnHomePage();
  await I.login(testconfig.TestEnvCourtAdminUser, testconfig.TestEnvCourtAdminPassword);
  await I.wait(8);
  await I.shouldBeOnCaseListPage();
  await I.wait(7);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(7);
  await I.checkNextStepForEvent('Application issue');
  await I.submitJointIssueApplication();
  await I.CYAIssueJointApplication(divorceOrDissolution.DIVORCE);
  await I.checkStateAndEvent('20 week holding period','Application issue');

  console.log('~~~~~~~~~~~~~  Case State now is 20 week holding period ~~~~~~~~~~~~ ');

}).retry(testconfig.TestRetryScenarios);

xScenario('Dissolution Application (Joint) with Documents, HWF accepted and Submit the Case ', async (I) => {

  await I.amOnHomePage();
  await I.login(testconfig.TestEnvSolUser, testconfig.TestEnvSolPassword);
  await I.clickCreateCase();

  await I.fillCreateCaseFormAndSubmit();


  // 'Yes' for Sole, 'No' for Joint.
  await I.fillSoleOrJointOptionForDivorce(yesorno.No, divorceOrDissolution.DISSOLUTION);


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

  // Upload the marriage certificate
  await I.uploadTheMarriageCertificateOptional();

  // Select Language
  //await I.languagePreferenceSelection();

  // Create Application 'Save Application' and 'Check Your Answers'
  await I.solicitorCreateCheckYourAnswerAndSubmit(divorceOrDissolution.DISSOLUTION);

  // Case Submission Steps
  caseNumber = await I.solicitorCaseCreatedAndSubmit();
  caseNumber = caseNumber.replace(/\D/gi, '');
  console.log('--------------------------------------------- CASE NUMBER ------------------------------------------'+ caseNumber);

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

  // No draft petition should be present , but Uploaded Docs should be present.
  await I.solAwaitingPaymentConfPageFormAndSubmit();

  console.log('~~~~~~~~~~~~~  Solicitor Submit Done ~~~~~~~~');

  await I.wait(8);

  //Login as CaseWorker and Validate HWF Reference
  console.log('~~~~~~~~~~~~~  Caseworker Login to Validate HWF Code ~~~~~~~~~~~~~');

  await I.login(testconfig.TestEnvCWUser, testconfig.TestEnvCWPassword);
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

  await I.login(testconfig.TestEnvCourtAdminUser, testconfig.TestEnvCourtAdminPassword);
  await I.wait(8);
  await I.shouldBeOnCaseListPage();
  await I.wait(7);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(7);
  await I.checkNextStepForEvent('Application issue');
  await I.fillIssueApplicationMarriageDetails();
  await I.checkYourAnswersIssueApplication();
  await I.checkStateAndEvent('Awaiting service','Application issue');

  console.log('~~~~~~~~~~~~~  Case State now is AoS awaiting ~~~~~~~~~~~~ ');

}).retry(testconfig.TestRetryScenarios);

