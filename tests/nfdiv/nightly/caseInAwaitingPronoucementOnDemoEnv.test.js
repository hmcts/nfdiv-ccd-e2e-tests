const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD - DEMO Env Only Script');

Scenario.skip('NFD -Create Sole Case on Demo - And take it to AwaitingPronouncement State.', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-demo-nfdiv-sole-draft-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT serviceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  const shareACase = await updateRoleForCase(user.RS,caseNumber,'APPTWOSOLICITOR');

  //const caseSharedToRespSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);
  assert.strictEqual(JSON.parse(shareACase).status_message, 'Case-User-Role assignments created successfully');

  console.log('~~~~~~~~~ Case with Id ' + caseNumber +' has been SUCCESSFULLY SHARED  to ...' + user.RS);

  const aosDrafted = await updateNFDCaseInCcd(user.RS,caseNumber, events.DRAFT_AOS,'data/ccd-draft-aos.json');
  verifyState(aosDrafted, states.AOS_DRAFTED);

  const submitAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.SUBMIT_AOS,'data/ccd-submit-aos.json');
  verifyState(submitAoS, states.HOLDING);

  //To Move case from 20WeekHolding to AwaitingConditionalOrder  .... Call CCD API to mimic the cron job.
  //and set the dueDate to null ..See SystemProgressHeldCasesTask in nfdiv-case-api

  console.log('~~~~~~~~~~~~ about to Call the moveFromHoldingToAwaitingCO ..~~~~~ ');
  const awaitingConditionalOrder = await moveFromHoldingToAwaitingCO('data/await-co-data.json',caseNumber);
  assert.strictEqual(JSON.parse(awaitingConditionalOrder).state, 'AwaitingConditionalOrder');

  const draftConditionalOrder = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLS_DRAFT_CO,'data/ccd-draft-co.json');
  verifyState(draftConditionalOrder, stateDisplayName.CONDITIONAL_ORDER_DRAFTED);

  const submitConditionalOrder = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SUBMIT_CO,'data/ccd-submit-co.json');
  verifyState(submitConditionalOrder, states.AWAITING_LEGAL_ADVISOR_REFERRAL);

  //Moves case to Listed;AwaitingPronouncement state
  const listedAwaitingPronouncement = await updateNFDCaseInCcd(user.LAD,caseNumber, events.LEGAL_ADVISOR_MAKE_DECISION,'data/ccd-la-make-decision.json');
  verifyState(listedAwaitingPronouncement, states.AWAITING_PRONOUNCEMENT);

}).retry(testConfig.TestRetryScenarios);
