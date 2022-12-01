const {states, user, events, divorceOrDissolution} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createNFDCaseInCcd,getCaseDetailsFor, updateNFDCaseInCcd, updateRoleForCase, shareCaseToRespondentSolicitor,getCaseDetailsAsSolFor} = require('../../../helpers/utils');
const assert = require('assert');

let caseNumber;

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

Feature('Joint Application - SOLICITOR ');

Scenario('Script - XUI Joint Divorce Case - upto Holding State', async (I) => {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-joint-draft-case.json');
  console.log( '..... Citizen Case Created in CCD and the  CaseNumber is ==  ' + caseNumber);

  let caseResponse =  await getCaseDetailsAsSolFor(caseNumber);

  let orgName = caseResponse.case_data.applicant1SolicitorOrganisationPolicy.Organisation.OrganisationName;
  let docType = caseResponse.case_data.applicant1DocumentsUploaded[0].value.documentType;

  assert.strictEqual(orgName,'NFD Solicitor Organisation');
  assert.strictEqual(docType,'correspondence');

  // Invite Applicant 2
  const awaitApplicant2Response = await updateNFDCaseInCcd(user.SOLS,caseNumber, 'invite-applicant2','data/ccd-empty-payload.json');
  verifyState(awaitApplicant2Response,'AwaitingApplicant2Response');

  // Update Role For Case
  const app2SolicitorRoleForCase = await updateRoleForCase(user.RS,caseNumber,'APPTWOSOLICITOR');

  // Share Case To Respondent Solicitor
  const caseSharedToRespSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);
  assert.strictEqual(JSON.parse(caseSharedToRespSolicitor).status_message, 'Roles [APPTWOSOLICITOR] from the organisation policies successfully assigned to the assignee.');

  // login as Respondent Solicitor and 'Submit Joint Application'
  const respSolsSubmitApplication = await updateNFDCaseInCcd(user.RS,caseNumber, 'solicitor-submit-joint-application','data/ccd-nfd-resp-sols-submit-application.json');
  // verifyState(respSolsSubmitApplication,'Applicant2Approved');

  // async CCD process that will move the case to 'applicant2-approve'
  await I.wait(8);

  // TODO , not able to script the 'solicitor-submit-joint-application' as App1 Solicitor.
  // Going down the UI Route , but it would be good to have this scripted as well.

  //let caseResponseDetails = getCaseDetailsFor(caseNumber);
  //verifyState(caseResponseDetails,'Applicant2Approved');
  //  Login as Appicant-1-Solicitor  (TEST_SOLICITOR@mailinator.com), AND Sign and Submit .
  // const applicant1SolSignAndSubmit = await updateNFDCaseInCcd(user.SOLS,caseNumber, 'solicitor-submit-joint-application',
  //             'data/ccd-nfd-app1-solicitor-submit-application.json');
  //verifyState(applicant1SolSignAndSubmit,states.AWAITING_HWF);

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.wait(10);
  //await I.shouldBeOnCaseListPage();

  await I.wait(5);
  await I.amOnPage('/cases/case-details/' + caseNumber);

  await I.checkNextStepForEvent('Sign and submit');
  await I.submitSignAndSubmit(divorceOrDissolution.DIVORCE);

  await I.paymentWithPbaAccount();

  await I.fillPba();

  await I.PbaAccountOrderSummary();

  await I.caseCheckYourAnswersPageFormAndSubmit();

  await I.signOut();

  console.log('~~~~~~~~~~~~~  DONE ....Solicitor sign and submit Joint Application ~~~~~~~');

  await I.wait(5);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.HOLDING);

}).retry(testConfig.TestRetryScenarios);
