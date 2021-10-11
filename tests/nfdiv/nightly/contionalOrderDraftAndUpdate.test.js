const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor} = require('../../../helpers/utils');
const { states, events , user, eventDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD - From 20 week Holding to  Conditional Order Tests');

// TODO Once case State is in 'AwaitingConditionalOrder' , DraftCO , UpdateCO can be done etc...
xScenario('Draft CO - Conditional Order Draft', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT solServiceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  const shareACase = await updateRoleForCase(user.CA,caseNumber,'APPTWOSOLICITOR');

  const caseSharedToRespSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);
  assert.strictEqual(JSON.parse(caseSharedToRespSolicitor).status_message, 'Roles [APPTWOSOLICITOR] from the organisation policies successfully assigned to the assignee.');

  console.log('~~~~~~~~~ Case with Id' + caseNumber +' has been SUCCESSFULLY SHARED  to Respondent Solicitior');

  //Draft AoS
  await I.amOnHomePage();
  await I.login(testConfig.TestEnvRespondentSolUser, testConfig.TestEnvRespondentSolPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);

  await I.checkNextStepForEvent(events.DRAFT_AOS);
  await I.draftAosContactDetails();
  await I.draftAoSReview(caseNumber);
  await I.draftAoSDoYouAgree(caseNumber);
  await I.draftAoSAnyOtherLegalProceedings(caseNumber);
  await I.draftAosCheckYourAnswers(caseNumber);
  await I.see('AoS drafted');

  // Update AoS
  await I.checkNextStepForEvent(events.UPDATE_AOS);
  await I.updateAoS(caseNumber);
  await I.see('AoS drafted');

  // Submit AoS
  await I.checkNextStepForEvent('Submit AoS');
  await I.submitAosSOT(caseNumber);
  await I.submitAosCYA(caseNumber);

  await I.signOut();

  // Login as CW and check the latest Event and State of the Case
  // When logging in as TestEnvRespondentSolUser , the CaseDetails page view that normally show Event and State is not present.

  await I.amOnHomePage();
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);

  await I.checkStateAndEvent(states.TWENTY_WEEK_HOLDING_PERIOD,events.SUBMIT_AOS);

  //TODO : Ensure system progress held case cron is triggerred here

  await I.amOnHomePage();
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.filterByCaseId(caseNumber);

  // Draft Conditional Order
  await I.amOnPage('/case-details/'+caseNumber);
  await I.wait(3);
  await I.checkNextStepForEvent(events.DRAFT_CONDITIONAL_ORDER);
  await I.draftConditionalOrderReviewAoS();
  await I.draftConditionalOrderReviewApplicant1Application();
  await I.draftConditionalOrderDocuments();
  await I.draftConditionalOrderCYA();
  await I.checkState(states.CONDITIONAL_ORDER_DRAFTED,eventDisplayName.DRAFT_CONDITIONAL_ORDER);

  // Submit ConditionalOrder (CO)
  await I.amOnPage('/case-details/1633520717473920');
  await I.wait(3);
  await I.checkStateAndEvent(states.AWAITING_LEGAL_ADVISOR_REFERRAL,eventDisplayName.SUBMIT_CONDITIONAL_ORDER);

}).retry(testConfig.TestRetryScenarios);
