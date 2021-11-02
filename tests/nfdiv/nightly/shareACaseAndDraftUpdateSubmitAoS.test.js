const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,
  moveFromHoldingToAwaitingCO
} = require('../../../helpers/utils');
const { states, events , user, eventDisplayName,stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testconfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD  Share A Case via Manage Org so that AoS can be progressed on Case');

// TODO Test works locally but fails on pipeline
Scenario('NFD - Share a Case and Draft AoS', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT solServiceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  const shareACase = await updateRoleForCase(user.CA,caseNumber,'APPTWOSOLICITOR');

  const caseSharedToRespSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);
  assert.strictEqual(JSON.parse(caseSharedToRespSolicitor).status_message, 'Roles [APPTWOSOLICITOR] from the organisation policies successfully assigned to the assignee.');

  console.log('~~~~~~~~~ Case with Id ' + caseNumber +' has been SUCCESSFULLY SHARED  to Respondent Solicitior');

  //Draft AoS
  await I.amOnHomePage();
  await I.login(testconfig.TestEnvRespondentSolUser, testconfig.TestEnvRespondentSolPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);

  await I.checkNextStepForEvent(eventDisplayName.DRAFT_AOS);
  await I.draftAosContactDetails();
  await I.draftAoSReview(caseNumber);
  await I.draftAoSDoYouAgree(caseNumber);
  await I.draftAoSAnyOtherLegalProceedings(caseNumber);
  await I.draftAosCheckYourAnswers(caseNumber);
  await I.see('AoS drafted');

  // Update AoS
  await I.checkNextStepForEvent(eventDisplayName.UPDATE_AOS);
  await I.updateAoS(caseNumber);
  await I.see('AoS drafted');

  // Submit AoS
  await I.checkNextStepForEvent(eventDisplayName.SUBMIT_AOS);
  await I.submitAosSOT(caseNumber);
  await I.submitAosCYA(caseNumber);

  await I.signOut();
  await I.wait(4);

  // Login as CW and check the latest Event and State of the Case
  // When logging in as TestEnvRespondentSolUser , the CaseDetails page view that normally show Event and State is not present.

  // await I.amOnHomePage();
  // await I.login(testconfig.TestEnvCWUser, testconfig.TestEnvCWPassword);
  // await I.filterByCaseId(caseNumber);
  // await I.amOnPage('/case-details/' + caseNumber);
  //
  // await I.checkStateAndEvent(states.TWENTY_WEEK_HOLDING_PERIOD,events.SUBMIT_AOS);

  // To Move case from 20WeekHolding to AwaitingConditionalOrder  .... Call CCD API to mimic the cron job.
  // and set the dueDate to null ..See SystemProgressHeldCasesTask in nfdiv-case-api

  console.log('~~~~~~~~~~~~ about to Call the moveFromHoldingToAwaitingCO ..~~~~~ ');
  const awaitingConditionalOrder = await moveFromHoldingToAwaitingCO('data/await-co-data.json',caseNumber);
  assert.strictEqual(JSON.parse(awaitingConditionalOrder).state, 'AwaitingConditionalOrder');

  const draftConditionalOrder = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLS_DRAFT_CO,'data/ccd-draft-co.json');
  verifyState(draftConditionalOrder, stateDisplayName.CONDITIONAL_ORDER_DRAFTED);

  const submitConditionalOrder = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SUBMIT_CO,'data/ccd-submit-co.json');
  verifyState(submitConditionalOrder, states.AWAITING_LEGAL_ADVISOR_REFERRAL);

  // legalAdvisor Role
  const listedAwaitingPronouncement = await updateNFDCaseInCcd(user.LAD,caseNumber, events.LA_GRANT_CONDITIONAL_ORDER,'data/ccd-grant-co.json');
  verifyState(listedAwaitingPronouncement, states.AWAITING_PRONOUNCEMENT);


}).retry(testconfig.TestRetryScenarios);
