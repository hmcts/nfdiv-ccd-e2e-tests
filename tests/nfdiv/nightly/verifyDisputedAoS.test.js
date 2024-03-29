const { states, events , user, eventDisplayName, stateDisplayName} = require('../../../common/constants');
const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor} = require('../../../helpers/utils');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD - AoS - Disputed');

Scenario('NFD - Verify Disputed Aos chosen', async function (I) {

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

  await I.wait(10);
  //Draft AoS
  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.wait(8);
  await I.login(testConfig.TestEnvRespondentSolUser, testConfig.TestEnvRespondentSolPassword);
  //await I.filterByCaseId(caseNumber);
  await I.wait(10);
  await I.amOnPage('/cases/case-details/'+caseNumber);
  //await I.refreshPage();
  await I.wait(15);
  await I.checkNextStepForEvent(eventDisplayName.DRAFT_AOS);
  await I.draftAosContactDetails();
  await I.draftAoSReview(caseNumber);
  await I.draftAoSDoYouAgreeDisputed(caseNumber);

  await I.draftAoSDoNotAgreeCourts(caseNumber);
  await I.draftAoSAnyOtherLegalProceedings(caseNumber);
  await I.draftAosCheckYourAnswers(caseNumber);
  await I.signOut();
  await I.wait(8);

  const submitAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.SUBMIT_AOS,'data/ccd-submit-aos.json');

  await I.wait(8);
  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.wait(8);
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);
  //await I.filterByCaseId(caseNumber);
  await I.wait(10);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(15);
  await I.checkEventAndStateOnPageAndSignOut(states.TWENTY_WEEK_HOLDING_PERIOD, events.AOS_DISPUTED);

}).retry(testConfig.TestRetryScenarios);
