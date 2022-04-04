const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor} = require('../../../helpers/utils');
const { states,events,eventDisplayName,user} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD  Share A Case via Manage Org so that AoS can be progressed on Case');

// Duplicate of verifyHoldingToConditionalOrder.test
// Check and Delete if Not Required.

Scenario('NFD - Share a Case and Draft AoS', async function (I) {

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

  await I.draftAoSDoYouAgreeCourts(caseNumber);
  await I.draftAoSAnyOtherLegalProceedings(caseNumber);
  await I.draftAosCheckYourAnswers(caseNumber);

  //Update AoS
  // await I.checkNextStepForEvent(eventDisplayName.UPDATE_AOS);
  // await I.updateAoSConfirmContactDetails(caseNumber);
  // await I.aosUpdateReviewApplicant1ApplicationRes(caseNumber);
  // await I.aosUpdateDispute(caseNumber);
  // await I.aosUpdateLegal(caseNumber);
  // await I.aosUpdateLegalProceedings(caseNumber);
  // await I.aosUpdateCYA(caseNumber);

  // Submit AoS
  // await I.wait(2);
  // await I.amOnPage('/cases/case-details/' + caseNumber);
  // await I.wait(5);
  // await I.checkNextStepForEvent(eventDisplayName.SUBMIT_AOS);
  // await I.submitAosSOT(caseNumber);
  // await I.submitAOSSotSolicitorDetails(caseNumber);
  // await I.submitAosCYA(caseNumber);
  // await I.wait(5);
  // await I.amOnPage('/case-details/' + caseNumber);
  // await I.see('20 week holding period');

}).retry(testConfig.TestRetryScenarios);

Scenario('Draft AoS - Respondent disagreed to claimed jurisdiction', async function (I) {

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

  await I.draftAoSDoNotAgreeCourts(caseNumber);
  await I.draftAoSAnyOtherLegalProceedings(caseNumber);
  await I.draftAosCheckYourAnswers(caseNumber);

  await I.wait(2);
  await I.amOnPage('/cases/case-details/' + caseNumber);
}).retry(testConfig.TestRetryScenarios);
