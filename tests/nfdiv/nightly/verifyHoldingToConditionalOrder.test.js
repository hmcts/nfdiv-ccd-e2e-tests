const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO} = require('../../../helpers/utils');
const { states, events , user, yesorno, divorceOrDissolution, paymentType} = require('../../../common/constants');
const assert = require('assert');
const testconfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;


// TODO
Scenario('NFD - 20 week Holding to Conditional Order', async function (I) {

  // caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  // console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT solServiceMethod == courtService
  // const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  // verifyState(awaitingHWF, states.AWAITING_HWF);
  //
  // const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  // verifyState(hwfAccepted, states.SUBMITTTED);
  //
  // const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  // verifyState(awaitingService, states.AOS_AWAITING);
  //
  // const shareACase = await updateRoleForCase(user.CA,caseNumber,'APPTWOSOLICITOR');
  //
  // const caseSharedToRespSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);

  //assert.strictEqual(JSON.parse(caseSharedToRespSolicitor).status_message, 'Roles [APPTWOSOLICITOR] from the organisation policies successfully assigned to the assignee.');

//  console.log('~~~~~~~~~ Case with Id' + caseNumber +' has been SUCCESSFULLY SHARED  to Respondent Solicitior');

  //Draft AoS
  // await I.amOnHomePage();
  // await I.login(testconfig.TestEnvRespondentSolUser, testconfig.TestEnvRespondentSolPassword);
  // await I.filterByCaseId(caseNumber);
  // await I.amOnPage('/case-details/' + caseNumber);
  //
  // await I.checkNextStepForEvent(events.DRAFT_AOS);
  // await I.draftAosContactDetails();
  // await I.draftAoSReview(caseNumber);
  // await I.draftAoSDoYouAgree(caseNumber);
  // await I.draftAoSAnyOtherLegalProceedings(caseNumber);
  // await I.draftAosCheckYourAnswers(caseNumber);
  // await I.see('AoS drafted');
  //
  // Submit AoS
  // await I.checkNextStepForEvent('Submit AoS');
  // await I.submitAosSOT(caseNumber);
  // await I.submitAosCYA(caseNumber);
  //
  // await I.signOut();

  // Login as CW and check the latest Event and State of the Case
  // When logging in as TestEnvRespondentSolUser , the CaseDetails page view that normally show Event and State is not present.

  // await I.amOnHomePage();
  // await I.login(testconfig.TestEnvCWUser, testconfig.TestEnvCWPassword);
  // await I.filterByCaseId(caseNumber);
  // await I.amOnPage('/case-details/' + caseNumber);

  // await I.checkStateAndEvent(states.TWENTY_WEEK_HOLDING_PERIOD,events.SUBMIT_AOS);

  // To Move to Holding .... Call CCD API to mimic the cron job.

  const tempCaseNumber = '1632958714343095';

  console.log('~~~~~~~~~~~~ about to Call the moveFromHoldingToAwaitingCO ..~~~~~ ');

  const movedToConditionalOrderState = await moveFromHoldingToAwaitingCO('data/await-co-data.json',tempCaseNumber);




}).retry(testconfig.TestRetryScenarios);

