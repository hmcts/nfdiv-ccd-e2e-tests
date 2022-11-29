const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,
  moveFromHoldingToAwaitingCO, getCaseDetailsFor
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

  // SoT serviceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  const shareACase = await updateRoleForCase(user.RS,caseNumber,'APPTWOSOLICITOR');

  // const caseSharedToRespSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);
  // assert.strictEqual(JSON.parse(caseSharedToRespSolicitor).status_message, 'Roles [APPTWOSOLICITOR] from the organisation policies successfully assigned to the assignee.');

  console.log('~~~~~~~~~ Case with Id' + caseNumber +' has been SUCCESSFULLY SHARED  to Respondent Solicitior');

  const draftAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.DRAFT_AOS,'data/ccd-draft-aos.json');
  verifyState(draftAoS, states.AOS_DRAFTED);

  const submitAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.SUBMIT_AOS,'data/ccd-submit-aos.json');
  verifyState(submitAoS, states.HOLDING);

  console.log('~~~~~~~~~~~~ about to Call the moveFromHoldingToAwaitingCO ..~~~~~ ');
  const awaitingConditionalOrder = await moveFromHoldingToAwaitingCO('data/await-co-data.json',caseNumber);
  assert.strictEqual(JSON.parse(awaitingConditionalOrder).state, 'AwaitingConditionalOrder');

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.wait(8);
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);

  // Draft CO
  await I.wait(5);
  await I.checkNextStepForEvent(events.DRAFT_CONDITIONAL_ORDER);
  await I.draftConditionalOrderReviewAoS();
  await I.draftConditionalOrderReviewApplicant1Application();
  await I.draftConditionalOrderCYA();
  await I.checkState(states.CONDITIONAL_ORDER_DRAFTED,eventDisplayName.DRAFT_CO);

  // Update CO
  await I.amOnPage('/case-details/'+caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);

  await I.checkNextStepForEvent(events.UPDATE_CONDITIONAL_ORDER);
  await I.updateCOReviewAoS();
  await I.updateCOReviewApplication();
  await I.updateCOAndSave();
  await I.checkState(states.CONDITIONAL_ORDER_DRAFTED,eventDisplayName.UPDATE_CONDITIONAL_ORDER);

  //Submit CO
  await I.amOnPage('/case-details/'+caseNumber);
  await I.wait(3);
  await I.checkNextStepForEvent(events.SUBMIT_CONDITIONAL_ORDER);
  await I.submitSoTConditionalOrderDetails();
  await I.submitConditionalOrder();
  await I.checkEventAndStateOnPageAndSignOut(stateDisplayName.AWAITING_LA_REFERRAL,eventDisplayName.SUBMIT_CO);

  await I.wait(8);
  //Conditional Order - Do not Grant CO ->  Refusal Order ->  Get More Information ->  Marriage Certificate
  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.wait(3);
  await I.login(testConfig.TestEnvLegalAdvisorUser, testConfig.TestEnvLegalAdvisorPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/'+caseNumber);
  await I.wait(3);
  await I.checkNextStepForEvent(events.MAKE_A_DECISION);
  await I.conditionalOrderClarification();
  await I.wait(3);

  let caseResponse =  await getCaseDetailsFor(caseNumber);
  assert.strictEqual('AwaitingClarification',caseResponse.state);

}).retry(testConfig.TestRetryScenarios);
