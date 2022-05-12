const {paymentType,yesorno,divorceOrDissolution, user} = require('../../../common/constants');
const testConfig = require('./../../config');
const {updateRoleForCase, shareCaseToRespondentSolicitor} = require('../../../helpers/utils');
const assert = require('assert');

let caseNumber;

Feature('Joint Application - Dissolution');

Scenario('Dissolution Application (Joint) with PBA  upto Issue', async (I) => {

  await I.amOnHomePage();
  //await I.waitForValue('Sign in or create an account');
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.clickCreateCase();

  await I.fillCreateCaseFormAndSubmit();
  await I.fillSoleOrJointOptionForDivorce(yesorno.No, divorceOrDissolution.DISSOLUTION); // 'Yes' for Sole, 'No' for Joint.

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

  await I.checkNextStepForEvent('Invite Applicant 2');
  caseNumber = await I.inviteApplicant2();

  await I.signOut();

  caseNumber = caseNumber.toString();
  caseNumber = caseNumber.replace(/\D/gi, '');
  console.log('--------------------------------------------- CASE NUMBER ------------------------------------------'+ caseNumber);

  const shareACase = await updateRoleForCase(user.RS,caseNumber,'APPTWOSOLICITOR');
  console.log('~~~~~~~~~ Case with Id ' + caseNumber +' has been SUCCESSFULLY SHARED  to Respondent Solicitior');

  await I.amOnHomePage();
  await I.login(testConfig.TestEnvRespondentSolUser, testConfig.TestEnvRespondentSolPassword);
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
  await I.wait(8);
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.wait(5);
  await I.shouldBeOnCaseListPage();
  await I.wait(5);
  await I.amOnPage('/case-details/' + caseNumber);

  // In Real time , this will be a CCD Async event which will move case from 'Awaiting applicant 2 response' to the
  // 'Applicant 2 Approved', but we trigger it manually here as it is easier to continue to test the  UI Flow as part of the Joint Journeys
  await I.checkNextStepForEvent('Applicant 2 approve');
  //await I.submitApplicant2Approve();
  await I.wait(5);

  // Staying as Sols - Do  Sign And Submit.
  await I.checkNextStepForEvent('Sign and submit');
  await I.submitSignAndSubmit(divorceOrDissolution.DISSOLUTION);

  await I.paymentWithPbaAccount();

  await I.fillPba();

  await I.PbaAccountOrderSummary();

  await I.caseCheckYourAnswersPageFormAndSubmit();

  await I.signOut();

  console.log('~~~~~~~~~~~~~  Solicitor sign and submit Joint Application Done ~~~~~~~~');

  // Do Application Issue.
  console.log('....... As Caseworker  Issue Joint Application');

  await I.wait(5);
  await I.amOnHomePage();
  await I.wait(8);
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(5);
  await I.shouldBeOnCaseListPage();
  await I.wait(5);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(5);
  await I.checkNextStepForEvent('Application issue');
  await I.submitJointIssueApplication();
  await I.CYAIssueJointApplication(divorceOrDissolution.DISSOLUTION);
  await I.wait(3);
  await I.checkStateAndEvent('20 week holding period','Application issue');
  console.log('~~~~~~~~~~~~~  Case State now is 20 week holding period ~~~~~~~~~~~~ ');

}).retry(testConfig.TestRetryScenarios);
