const {states, user, events, divorceOrDissolution, stateDisplayName} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createNFDCaseInCcd,getCaseDetailsFor, updateNFDCaseInCcd, updateRoleForCase, shareCaseToRespondentSolicitor,getCaseDetailsAsSolFor,
  moveFromHoldingToAwaitingCO, moveCaseToBulk
} = require('../../../helpers/utils');
const assert = require('assert');

let caseNumber;

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

Feature('Joint Application ');

Scenario(' A JointApplication case is part of a BulkList', async (I) => {

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
  //const caseSharedToRespSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);
  //assert.strictEqual(JSON.parse(caseSharedToRespSolicitor).status_message, 'Roles [APPTWOSOLICITOR] from the organisation policies successfully assigned to the assignee.');

  // login as Respondent Solicitor and 'Submit Joint Application'
  const respSolsSubmitApplication = await updateNFDCaseInCcd(user.RS,caseNumber, 'solicitor-submit-joint-application','data/ccd-nfd-resp-sols-submit-application.json');
  // verifyState(respSolsSubmitApplication,'Applicant2Approved');

  // async CCD process that will move the case to 'applicant2-approve'
  await I.wait(8);

  // TODO , not able to script the 'solicitor-submit-joint-application' as App1 Solicitor.

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.wait(10);
  //await I.shouldBeOnCaseListPage();

  await I.wait(5);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(30);

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

  const awaitingConditionalOrder = await moveFromHoldingToAwaitingCO('data/await-co-data.json',caseNumber);
  assert.strictEqual(JSON.parse(awaitingConditionalOrder).state, 'AwaitingConditionalOrder');

  // Draft CO
  const draftConditionalOrder = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLS_DRAFT_CO,'data/ccd-draft-co.json');
  verifyState(draftConditionalOrder, stateDisplayName.CONDITIONAL_ORDER_DRAFTED);

  // Submit Joint CO - as Respondent Solictor
  const submitJointCO_AsRespondentSolicitor = await updateNFDCaseInCcd(user.RS,caseNumber, events.SUBMIT_JOINT_CO,'data/ccd-submit-joint-co.json');
  verifyState(submitJointCO_AsRespondentSolicitor, states.AWAITING_JOINT_CONDITIONAL_ORDER); // ConditionalOrderPending

  // Submit CO - as Application Solicitor
  const submitJoint_ConditionalOrder_As_ApplicantSolicitor = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SUBMIT_CO,'data/ccd-submit-co.json');
  verifyState(submitJoint_ConditionalOrder_As_ApplicantSolicitor, states.AWAITING_LEGAL_ADVISOR_REFERRAL);

  // Moves case to Listed;AwaitingPronouncement state
  const listedAwaitingPronouncement = await updateNFDCaseInCcd(user.LAD,caseNumber, events.LEGAL_ADVISOR_MAKE_DECISION,'data/ccd-la-make-decision.json');
  verifyState(listedAwaitingPronouncement, states.AWAITING_PRONOUNCEMENT);

  await I.wait(5);

  //Note:Important: BulkCase with just ONE CaseParty reference . Purely for e2e purpose Only and to enable testing of the Pages that follow it.
  const bulkCaseReferenceId = await moveCaseToBulk('data/bulk-case-data.json',caseNumber);


}).retry(testConfig.TestRetryScenarios);
