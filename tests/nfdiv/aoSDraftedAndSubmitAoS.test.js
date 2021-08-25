const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase, ConfirmDraftAoSContactDetails,submi} = require('../../helpers/utils');
const {user,events,states} = require('../../common/constants');
const assert = require('assert');
const testconfig = require('./../config');

let caseNumber;

Feature('AoS Feature');

Scenario('NFD - Move case from AoS Awaiting To Drafted and then to Aos Updated', async function (I) {

  //TODO
  // Create a Case , submit and Issued .. it is now in AoS Awaiting + Shared as well
  // Login as RespSol and the case can be chosen for Events like Submit and Update DraftAoS
  // The workaround now is to login as a CA and do the same

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '.....caseCreated in CCD , caseId is ==  ' + caseNumber);

  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const issueAosPack = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(issueAosPack, states.AOS_AWAITING);

  await updateRoleForCase(user.CA,caseNumber,'APPTWOSOLICITOR');
  //await shareCaseToRespondentSolicitor(user.RSA,caseNumber);

  await I.amOnHomePage();

  // TODO This should be RespondentSolicitor once the Share A Case issue is Fixed

  await I.login(testconfig.TestEnvCourtAdminUser, testconfig.TestEnvCourtAdminPassword);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);

  await I.checkNextStepForEvent('Draft AoS');
  await I.draftAosContactDetails();
  await I.draftAoSReview(caseNumber);
  await I.draftAoSDoYouAgree(caseNumber);
  await I.draftAoSAnyOtherLegalProceedings(caseNumber);
  await I.draftAosCheckYourAnswers(caseNumber);
  await I.checkState('AoS drafted','Draft AoS');

  // Submit AoS
  await I.checkNextStepForEvent('Submit AoS');
  await I.submitAosSOT(caseNumber);
  await I.submitAosCYA(caseNumber);
  await I.checkStateAndEvent('Submit AoS','20 week holding period');

  console.log('Case with id'+caseNumber + ' has is now in 20 week holding period');

}).retry(testconfig.TestRetryScenarios);


const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

