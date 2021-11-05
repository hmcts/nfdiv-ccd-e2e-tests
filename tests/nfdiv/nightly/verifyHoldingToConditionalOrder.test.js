const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO} = require('../../../helpers/utils');
const { states, events , user} = require('../../../common/constants');
const assert = require('assert');
const testconfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD  - 20 Week Holding to Conditional Order[CO - earlier known as (Decree Nisi)]');

// TODO Test works locally but fails on pipeline . This is because of the ShareACase using http instead of https.
// Pipeline expects https.

Scenario('NFD - Share a Case and Draft AoS', async function (I) {

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

  console.log('~~~~~~~~~ Case with Id ' + caseNumber +' has been SUCCESSFULLY SHARED  to Respondent Solicitior');


  // TODO Draft ,Update and Submit AOS should be made into a script here as the Page Flows are tested as part of the
  // shareACaseAndDraftUpdateSubmitAoS.test

  //Draft AoS
  await I.amOnHomePage();
  await I.login(testconfig.TestEnvRespondentSolUser, testconfig.TestEnvRespondentSolPassword);
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

  // To Move case from 20WeekHolding to AwaitingConditionalOrder  .... Call CCD API to mimic the cron job.
  // and set the dueDate to null .
  // see SystemProgressHeldCasesTask in nfdiv-case-api

  const response = await moveFromHoldingToAwaitingCO('data/await-co-data.json',caseNumber);
  assert.strictEqual(JSON.parse(response).state, 'AwaitingConditionalOrder');

}).retry(testconfig.TestRetryScenarios);

