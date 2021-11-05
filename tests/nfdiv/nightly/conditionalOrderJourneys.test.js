const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,
  moveFromHoldingToAwaitingCO
} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName,eventDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD - Conditional Order (CO) journey');

Scenario('CO Journey - AwaitingCO->CODrafted->AwaitingLAReferral->CORefused->COClarification->COGranted by LegalAdvisor', async function (I) {

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

  const draftAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.DRAFT_AOS,'data/ccd-draft-aos.json');
  verifyState(draftAoS, states.AOS_DRAFTED);

  const submitAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.SUBMIT_AOS,'data/ccd-submit-aos.json');
  verifyState(submitAoS, states.HOLDING);

  // Login as CW and check the latest Event and State of the Case
  // When logging in as TestEnvRespondentSolUser , the CaseDetails page view that normally show Event and State is not present.

  await I.amOnHomePage();
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);

  await I.checkStateAndEvent(states.TWENTY_WEEK_HOLDING_PERIOD,events.SUBMIT_AOS);

  console.log('~~~~~~~~~~~~ about to Call the moveFromHoldingToAwaitingCO ..~~~~~ ');
  const awaitingConditionalOrder = await moveFromHoldingToAwaitingCO('data/await-co-data.json',caseNumber);
  assert.strictEqual(JSON.parse(awaitingConditionalOrder).state, 'AwaitingConditionalOrder');


  await I.amOnHomePage();
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.filterByCaseId(caseNumber);

  // Draft CO
  await I.amOnPage('/case-details/'+caseNumber);
  await I.wait(3);
  await I.checkNextStepForEvent(events.DRAFT_CONDITIONAL_ORDER);
  await I.draftConditionalOrderReviewAoS();
  await I.draftConditionalOrderReviewApplicant1Application();
  await I.draftConditionalOrderDocuments();
  await I.draftConditionalOrderCYA();
  await I.checkState(states.CONDITIONAL_ORDER_DRAFTED,eventDisplayName.DRAFT_CO);

  // Update CO
  await I.amOnPage('/case-details/'+caseNumber);
  await I.checkNextStepForEvent(events.UPDATE_CONDITIONAL_ORDER);
  await I.updateCOReviewAoS();
  await I.updateCOReviewApplication();
  await I.updateCODocuments();
  await I.updateCOAndSave();
  await I.checkState(states.CONDITIONAL_ORDER_DRAFTED,eventDisplayName.UPDATE_CONDITIONAL_ORDER);

  //Submit CO
  await I.amOnPage('/case-details/'+caseNumber);
  await I.wait(3);
  await I.checkNextStepForEvent(events.SUBMIT_CONDITIONAL_ORDER);
  await I.submitSoTConditionalOrderDetails();
  await I.submitConditionalOrder();
  await I.signOut();

  //CO - Request - Clarification -> Awaiting Clarification :: as a LegalAdvisor.
  await I.amOnHomePage();
  await I.wait(3);
  await I.login(testConfig.TestEnvLegalAdvisorUser, testConfig.TestEnvLegalAdvisorPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/'+caseNumber);
  await I.wait(3);
  await I.checkNextStepForEvent(events.CO_REQUEST_CLARIFICATION);
  await I.conditionalOrderClarification();
  await I.wait(3);
  await I.checkStateAndEvent(stateDisplayName.AWAITING_CLARIFICATION,eventDisplayName.REQUEST_CLARIFICATION);

  //CO - SUBMIT Clarification as a Solicitor
  await I.amOnHomePage();
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.checkNextStepForEvent(events.SUBMIT_CLARIFICATION);
  await I.checkStateAndEvent(stateDisplayName.AWAITING_LA_REFERRAL,eventDisplayName.REQUEST_CLARIFICATION);

}).retry(testConfig.TestRetryScenarios);
