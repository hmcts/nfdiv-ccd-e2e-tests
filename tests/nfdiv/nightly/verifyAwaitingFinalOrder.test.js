const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO,moveCaseToBulk,
  updateFinalOrderDateForNFDCaseInCcd} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName, eventDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD - Sole Divorce Case in Awaiting FO State');

// NOTE THIS TEST PASSES LOCALLY,but since it is a long winded one it fails on pipeline
// Updated 14 Sept 2022.
Scenario.skip('NFD - Verify Bulk case pronounced', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-bulk-case.json');
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

  // Login as CA with CaseType as 'NO_FAULT_DIVORCE_BulkAction' and check for BulkCase Created
  await I.wait(5);
  await I.amOnHomePage();
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(5);
  await I.filterByBulkCaseReference(bulkCaseReferenceId);
  await I.amOnPage('/case-details/' + bulkCaseReferenceId);
  //  await I.see('Case list 1');
  //  await I.see('Bulk case list');
  //  await I.see('Case parties');

  await I.wait(3);
  await I.checkNextStepForEvent('Schedule cases for listing');
  await I.submitScheduleCases(bulkCaseReferenceId);
  await I.submitScheduleCasesCYA(bulkCaseReferenceId);

  // TODO Click on History Tab to get state of the Event & then Assert
  //await I.checkState(stateDisplayName.BULK_CASE_LISTED_CREATED, eventDisplayName.SYSTEM_UPDATE_CASE);

  // await I.wait(3);
  // await I.checkNextStepForEvent('Print for pronouncement');
  // await I.submitPrintForPronouncement(bulkCaseReferenceId);
  // await I.submitPrintForPronouncementCYA(bulkCaseReferenceId);
  // await I.checkState(stateDisplayName.BULK_CASE_LISTED, events.SYSTEM_UPDATE_CASE);
  //
  // await I.wait(3);
  // await I.checkNextStepForEvent('Pronounce list');
  // await I.submitPronounceList(bulkCaseReferenceId);
  //
  // await I.submitPronounceListCYA(bulkCaseReferenceId);
  // await I.checkState(stateDisplayName.BULK_CASE_PRONOUNCED, events.PRONOUNCE_LIST);
  // backDate the dateFinalOrderEligibleFrom to 6weeks + 1day in the past

  // TODO toFix  FO bits.
  //const  finalOrderEligibleToRespondent= await updateFinalOrderDateForNFDCaseInCcd(user.CA,caseNumber, 'system-progress-case-awaiting-final-order','data/final-order-date-eligible-to-respondent.json');
  //verifyState(finalOrderEligibleToRespondent , 'AwaitingFinalOrder');

}).retry(testConfig.TestRetryScenarios);
