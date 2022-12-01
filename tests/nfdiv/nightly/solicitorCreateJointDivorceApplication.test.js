const {paymentType,yesorno,divorceOrDissolution, user} = require('../../../common/constants');
const testConfig = require('./../../config');
const {updateRoleForCase, shareCaseToRespondentSolicitor} = require('../../../helpers/utils');
const assert = require('assert');

let caseNumber;

Feature('Joint Application - Divorce');

xScenario('Joint Divorce application with PBA  and Issue the case ', async (I) => {

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.clickCreateCase();

  await I.wait(15);

  await I.fillCreateCaseFormAndSubmit();
  await I.fillSoleOrJointOptionForDivorce(yesorno.No, divorceOrDissolution.DIVORCE); // 'Yes' for Sole, 'No' for Joint.

  // About Solicitor
  await I.fillAboutSolicitorFormAndSubmit();

  // Marriage - Irretrievably Broken Down
  await I.marriageBrokenDown(divorceOrDissolution.DIVORCE);

  // About Applicant1
  await I.fillAboutThePetitionerFormAndSubmit(divorceOrDissolution.DIVORCE);

  // About Applicant2
  await I.fillAboutTheRespondentFormAndSubmit(divorceOrDissolution.DIVORCE);

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

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);;
  await I.login(testConfig.TestEnvRespondentSolUser, testConfig.TestEnvRespondentSolPassword);
  await I.wait(10);
  await I.shouldBeOnCaseListPage();

  await I.wait(5);
  await I.amOnPage('/cases/case-details/' + caseNumber);

  await I.checkNextStepForEvent('Submit joint application');
  await I.submitDivJointApplication();
  await I.signOut();

  console.log('~~~~~~~~~~~~~  Respondent Solicitor Submit Joint Application Done ~~~~~~~~');

  await I.wait(5);
  await I.amOnPage('/',testConfig.TestTimeToWaitForText);;
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.wait(10);
  await I.shouldBeOnCaseListPage();

  await I.wait(5);
  await I.amOnPage('/cases/case-details/' + caseNumber);

  await I.checkNextStepForEvent('Sign and submit');

  // Kasi Restart Here....
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

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(8);
  await I.shouldBeOnCaseListPage();
  await I.wait(7);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(7);
  await I.checkNextStepForEvent('Application issue');
  await I.submitJointIssueApplication();
  await I.CYAIssueJointApplication(divorceOrDissolution.DIVORCE);
  await I.checkStateAndEvent('20 week holding period','Application issue');

  console.log('~~~~~~~~~~~~~  Case State now is 20 week holding period ~~~~~~~~~~~~ ');

}).retry(testConfig.TestRetryScenarios);

