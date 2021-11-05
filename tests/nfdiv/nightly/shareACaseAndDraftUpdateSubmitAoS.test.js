const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor} = require('../../../helpers/utils');
const { states, events , eventDisplayName,user} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD  Share A Case via Manage Org so that AoS can be progressed on Case');

// TODO Test works locally but fails on pipeline
xScenario('NFD - Share a Case and Draft AoS', async function (I) {

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

  //Draft AoS
  await I.amOnHomePage();
  await I.wait(8);
  await I.login(testConfig.TestEnvRespondentSolUser, testConfig.TestEnvRespondentSolPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);

  await I.checkNextStepForEvent(eventDisplayName.DRAFT_AOS);
  await I.draftAosContactDetails();
  await I.draftAoSReview(caseNumber);
  await I.draftAoSDoYouAgree(caseNumber);
  await I.draftAoSAnyOtherLegalProceedings(caseNumber);
  await I.draftAosCheckYourAnswers(caseNumber);
  await I.see('AoS drafted');

  //Update AoS
  await I.checkNextStepForEvent(eventDisplayName.UPDATE_AOS);
  await I.updateAoS(caseNumber);
  await I.aosUpdateJurisdiction(caseNumber);
  await I.aosUpdateLegal(caseNumber);
  await I.see('AoS drafted');

  // Submit AoS
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(5);
  await I.checkNextStepForEvent(eventDisplayName.SUBMIT_AOS);
  await I.submitAosSOT(caseNumber);
  await I.submitAosCYA(caseNumber);

  await I.wait(5);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.see('20 week holding period');

}).retry(testConfig.TestRetryScenarios);
