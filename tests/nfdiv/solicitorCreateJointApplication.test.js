const { paymentType,yesorno } = require('../../common/constants');
const testconfig = require('./../config');

let caseNumber;

Feature('Solicitor Create Joint Application with Docs and HWF - And Submit the Case');

Scenario('Solicitor Create Joint Application ', async (I) => {

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

  // Jurisdiction
  await I.selectJurisdictionQuestionPageAndSubmit();

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


  // Create Application 'Save Application' and 'Check Your Answers'
  await I.solicitorCreateCheckYourAnswerAndSubmit();
  // TODO ASSERT the STATE of the case here after Case Creation
  // Case Submission Steps

   caseNumber = await I.solicitorCaseCreatedAndSubmit();
   caseNumber = caseNumber.replace(/\D/gi, '');
   console.log('--------------------------------------------- CASE NUMBER ------------------------------------------'+ caseNumber);

   //
  // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~  Solicitor Create Case Done ~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ');
  //
  // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~ Start Draft to Submit   ~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~~~~~~ ');
  //
   // await I.statementOfTruthAndReconciliationPageFormAndSubmit(yesorno.No);

  // // Case Submission  - Help With Fees Page and Fees Reference Number.
  // await I.paymentWithHelpWithFeeAccount();
  //
  // // HWF Reference Entered ....
  // await I.casePaymentWithHWFAndSubmissionPageFormAndSubmit();
  //
  // //Case Submission - ORDER Summary
  // await I.caseOrderSummaryPageFormAndSubmit(paymentType.HWF);
  //
  // // Case Submission - Before You Submit
  // await I.caseApplicationCompletePageFormAndSubmit();
  //
  // // Case Submission Check Your Answers.
  // await I.caseCheckYourAnswersPageFormAndSubmit();
  //
  // // No draft petition should be present , but Uploaded Docs should be present.
  // await I.solAwaitingPaymentConfPageFormAndSubmit();
  //
  // console.log('~~~~~~~~~~~~~  Solicitor Submit Done ~~~~~~~~');
  //
  // await I.wait(8);

  // Login as CaseWorker and Validate HWF Reference

  // console.log('~~~~~~~~~~~~~  Caseworker Login to Validate HWF Code ~~~~~~~~~~~~~');
  //
  // await I.login(testconfig.TestEnvCWUser, testconfig.TestEnvCWPassword);
  // await I.wait(7);
  // await I.shouldBeOnCaseListPage();
  //
  // // TODO Add Note
  //
  //
  // await I.shouldBeOnCaseListPage();
  // await I.wait(5);
  // await I.amOnPage('/case-details/' + caseNumber);
  // await I.wait(5);
  // await I.checkNextStepForEvent('HWF application accepted')
  //
  // await I.wait(5);
  // await I.amOnPage('/case-details/' + caseNumber);
  // await I.wait(5);
  // await I.startValidationHWFProcess();
  //
  // await I.checkNextStepForEvent('HWF application accepted')
  // await I.fillHwfEventSummaryFor(caseNumber);
  // await I.wait(2);
  // await I.checkStateAndEvent('Submitted','HWF application accepted');
  //
  //  console.log('~~~~~~~~~~~~~   HWF Code Accepted && State is now Submitted  ~~~~~~~~~~~~~');
  //
  // //Login As CourtAdmin and Issue the Case ( ie Move case from Submitted State to Issued )
  // console.log('....... Login as CourtAdmin And Issue the Case - ie Move case from Submitted to Issued............');
  //
  // await I.login(testconfig.TestEnvCourtAdminUser, testconfig.TestEnvCourtAdminPassword);
  // await I.wait(7);
  // await I.shouldBeOnCaseListPage();
  // await I.wait(5);
  // await I.amOnPage('/case-details/' + caseNumber);
  // await I.wait(5);
  // await I.checkNextStepForEvent('Application issued')
  // await I.fillIssueApplicationMarriageDetails()
  // await I.fillIssueApplicationEventSummaryAndDescription()
  // await I.checkStateAndEvent('Application issued','Issue Application');
  //
  // console.log('~~~~~~~~~~~~~  Case State now is Application issued ~~~~~~~~~~~~ ');

}).retry(testconfig.TestRetryScenarios);
