const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO,moveCaseToBulk,
  updateCaseInCcd,bulkCaseListSchedule,
  updateFinalOrderDateForNFDCaseInCcd
} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName, eventDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;
let bulkCaseReferenceId;

Feature('NFD - Create a single Case and move it to Final Order Pronounced');

Scenario('NFD - Verify Final Order pronounced', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-bulk-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT solServiceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  const shareACase = await updateRoleForCase(user.RS,caseNumber,'APPTWOSOLICITOR');

  const caseSharedToRespSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);
  assert.strictEqual(JSON.parse(caseSharedToRespSolicitor).status_message, 'Roles [APPTWOSOLICITOR] from the organisation policies successfully assigned to the assignee.');

  console.log('~~~~~~~~~ Case with Id ' + caseNumber +' has been SUCCESSFULLY SHARED  to Respondent Solicitior');

  const draftAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.DRAFT_AOS,'data/ccd-draft-aos.json');
  verifyState(draftAoS, states.AOS_DRAFTED);

  const submitAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.SUBMIT_AOS,'data/ccd-submit-aos.json');
  verifyState(submitAoS, states.HOLDING);

  // To Move case from 20WeekHolding to AwaitingConditionalOrder  .... Call CCD API to mimic the cron job.
  // and set the dueDate to null ..(See SystemProgressHeldCasesTask in nfdiv-case-api)

  const awaitingConditionalOrder = await moveFromHoldingToAwaitingCO('data/await-co-data.json',caseNumber);
  assert.strictEqual(JSON.parse(awaitingConditionalOrder).state, 'AwaitingConditionalOrder');

  // Draft CO
  const draftConditionalOrder = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLS_DRAFT_CO,'data/ccd-draft-co.json');
  verifyState(draftConditionalOrder, stateDisplayName.CONDITIONAL_ORDER_DRAFTED);

  // Submit CO
  const awaitingLegalAdvisorReferral = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SUBMIT_CO,'data/ccd-submit-co.json');
  verifyState(awaitingLegalAdvisorReferral, states.AWAITING_LEGAL_ADVISOR_REFERRAL);

  // Moves case to Listed;AwaitingPronouncement state
  const listedAwaitingPronouncement = await updateNFDCaseInCcd(user.LAD,caseNumber, events.LEGAL_ADVISOR_MAKE_DECISION,'data/ccd-la-make-decision.json');
  verifyState(listedAwaitingPronouncement, states.AWAITING_PRONOUNCEMENT);

  //Note:Important: BulkCase with just ONE CaseParty reference . Purely for e2e purpose Only and to enable testing of the Pages that follow it.
  const bulkCaseReferenceId = await moveCaseToBulk('data/bulk-case-data.json',caseNumber);
  // verifyState(bulkCaseReferenceId, states.BULK_CASE_LISTED_CREATED);

  // TODO - Bulk case events need to be scripts

  const scheduleBulkList = await bulkCaseListSchedule(user.CA, bulkCaseReferenceId, 'caseworker-schedule-case', 'data/bulk-case-list-schedule-data.json');
  verifyState(scheduleBulkList, states.BULK_CASE_LISTED_CREATED);

  // const pronounceBulkList = await bulkCaseListPronounced(user.CA, bulkCaseReferenceId, events.PRONOUNCE_LIST, 'data/bulk-case-list-pronounce-data.json');
  // verifyState(pronounceBulkList, states.BULK_CASE_PRONOUNCED);

  // Login as CA with CaseType as 'NO_FAULT_DIVORCE_BulkAction' and check for BulkCase Created
  await I.wait(5);
  await I.amOnHomePage();
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(5);
  await I.filterByBulkCaseReference(bulkCaseReferenceId);
  await I.amOnPage('/case-details/' + bulkCaseReferenceId);
  await I.wait(5);
  await I.checkState(stateDisplayName.BULK_CASE_LISTED_CREATED, events.CREATE_BULK_LIST);

  await I.wait(3);
  await I.checkNextStepForEvent('Schedule cases for listing');
  await I.submitScheduleCases(bulkCaseReferenceId);
  await I.submitScheduleCasesCYA(bulkCaseReferenceId);
  await I.wait(10);
  await I.checkState(stateDisplayName.BULK_CASE_LISTED, eventDisplayName.SYSTEM_UPDATE_CASE);

  await I.wait(3);
  await I.checkNextStepForEvent('Pronounce list');
  await I.submitPronounceList(bulkCaseReferenceId);
  await I.submitPronounceListCYA(bulkCaseReferenceId);
  await I.wait(10);
  await I.checkEventAndStateOnPageAndSignOut(stateDisplayName.BULK_CASE_PRONOUNCED, events.SYSTEM_UPDATE_CASE);

  // backDate the dateFinalOrderEligibleFrom to 6weeks + 1day in the past

  const  finalOrderEligibleToRespondent= await updateFinalOrderDateForNFDCaseInCcd(user.CA,caseNumber, 'system-progress-case-awaiting-final-order','data/final-order-date-eligible-to-respondent.json');
  verifyState(finalOrderEligibleToRespondent , 'AwaitingFinalOrder');

  //final order pages
  await I.wait(5);
  await I.amOnHomePage();
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  await I.wait(5);
  await I.filterByBulkCaseReference(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(5);
  await I.checkState(stateDisplayName.AWAITING_FINAL_ORDER, events.AWAITING_FINAL_ORDER);

  await I.wait(3);
  await I.checkNextStepForEvent('Apply for final order');
  await I.submitApplyForFinalOrder(caseNumber);
  await I.submitApplyForFinalOrderCYA(caseNumber);
  await I.checkEventAndStateOnPageAndSignOut(stateDisplayName.FINAL_ORDER_REQUESTED, events.APPLY_FOR_FINAL_ORDER);

  await I.wait(5);
  await I.amOnHomePage();
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(5);
  await I.filterByBulkCaseReference(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(5);
  await I.checkNextStepForEvent('Grant Final order');
  await I.submitGrantFinalOrder(caseNumber);
  await I.submitGrantFinalOrderCYA(caseNumber);
  await I.checkState(stateDisplayName.FINAL_ORDER_COMPLETED, events.GRANT_FINAL_ORDER);


}).retry(testConfig.TestRetryScenarios);
