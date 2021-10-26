const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO,moveCaseToBulk} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD - Move Case to a Bulk Pack');

// TODO Test works locally but fails on pipeline . This is because of the ShareACase uses http instead of https.
// Pipeline expects https . HTTP works when tests are run locally ,but they fail on pipeline.

xScenario('NFD - Verify Bulk Case ', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-bulk-case.json');
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

  const draftAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.SOLS_DRAFT_AOS,'data/ccd-draft-aos.json');
  verifyState(draftAoS, states.AOS_DRAFTED);

  const submitAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.SOLS_SUBMIT_AOS,'data/ccd-submit-aos.json');
  verifyState(submitAoS, states.HOLDING);

  // To Move case from 20WeekHolding to AwaitingConditionalOrder  .... Call CCD API to mimic the cron job.
  // and set the dueDate to null ..(See SystemProgressHeldCasesTask in nfdiv-case-api)

  console.log('~~~~~~~~~~~~ about to Call the moveFromHoldingToAwaitingCO ..~~~~~ ');
  const awaitingConditionalOrder = await moveFromHoldingToAwaitingCO('data/await-co-data.json',caseNumber);
  assert.strictEqual(JSON.parse(awaitingConditionalOrder).state, 'AwaitingConditionalOrder');

  const draftConditionalOrder = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLS_DRAFT_CO,'data/ccd-draft-co.json');
  verifyState(draftConditionalOrder, stateDisplayName.CONDITIONAL_ORDER_DRAFTED);

  const submitConditionalOrder = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLS_SUBMIT_CO,'data/ccd-submit-co.json');
  verifyState(submitConditionalOrder, states.AWAITING_LEGAL_ADVISOR_REFERRAL);

  // get case ready for bulk
  await I.amOnHomePage();
  await I.wait(5);
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(3);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(5);
  await I.see('Awaiting legal advisor referral');
  //await I.see('Application issued');
  await I.checkNextStepForEvent('Link with bulk case');
  await I.linkWithBulkCase(caseNumber);
  await I.wait(5);
  await I.see('Awaiting legal advisor referral');
  await I.see('Link with bulk case');
  await I.signOut();

  // BulkCase with just one CaseParty reference . Purely for e2e purpose Only and to enable testing of the
  // Pages that follow it.
  const bulkCaseReferenceId = await moveCaseToBulk('data/bulk-case-data.json',caseNumber);

  await I.amOnHomePage();
  await I.wait(8);
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(8);
  await I.filterByBulkCaseReference(bulkCaseReferenceId);
  await I.amOnPage('/case-details/' + bulkCaseReferenceId);
  await I.wait(5);
  await I.checkStateAndEvent('Bulk case list created','Create bulk list');

}).retry(testConfig.TestRetryScenarios);
