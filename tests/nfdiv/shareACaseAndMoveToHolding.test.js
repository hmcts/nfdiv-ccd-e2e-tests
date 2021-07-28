const { createCaseInCcd, createNFDCaseInCcd, updateCaseInCcd,updateNFDCaseInCcd} = require('../../helpers/utils');
const { states, events , user} = require('../../common/constants');
const assert = require('assert');
const testconfig = require('./../config');
const testconfigMO = require('./../config-manage-org');


const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseId;

Feature('Share A Case Feature ');

Scenario('Share A Case As Respondent Solicitor Admin  and Then As a Respondent Solicitor move the Case to Holding', async function (I) {

  caseId = await createNFDCaseInCcd('data/ccd-nfdiv-draft-case.json');
  console.log( '.....caseCreated in CCD and caseId is...... ' + caseId);

   const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseId, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-to-submitted-state.json');
   verifyState(awaitingHWF, states.AWAITING_HWF);

   const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseId, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
   verifyState(hwfAccepted, states.SUBMITTTED);

   const issued = await updateNFDCaseInCcd(user.CW,caseId, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-marriage-data.json');
   verifyState(issued, states.AOS_AWAITING);

   // const issueAosPack = await updateNFDCaseInCcd(user.CA,caseId, events.ISSUE_AOS,'data/ccd-update-marriage-data.json');
   // verifyState(issueAosPack, states.AOS_AWAITING);

  // share teh case as a RespAdminstrator ....

  //
  //await I.amOnHomePage();
  //await I.login(testconfigMO.TestEnvRespondentSolsAdminUser, testconfigMO.TestEnvRespondentSolsAdminPassword);


  //const startAOS = await updateNFDCaseInCcd(user.RS, caseId, events.AOS_AWAITING_TO_AOS_DRAFTED,'data/ccd-ndf-aos-awaiting-to-aos-drafted.json');
  //verifyState(startAOS, states.AOS_DRAFTED);

  //
  // const aosSubmittedCoRespoDefended = await updateCaseInCcd(caseId, events.CO_RESP_AOS_RECEIVED_STARTED);
  // verifyState(aosSubmittedCoRespoDefended, states.AOS_STARTED);
  //
  // const aosSubmittedRespoDefended = await updateCaseInCcd(caseId, events.AOS_SUBMITTED_DEFENDED);
  // verifyState(aosSubmittedRespoDefended, states.AWAITING_ANSWER);
  //
  // const coRespAnswerReceivedForDefended = await updateCaseInCcd(caseId, events.CO_RESP_ANSWER_RECVD_AOS);
  // verifyState(coRespAnswerReceivedForDefended, states.AWAITING_ANSWER);
  //
  // const answerNotReceived = await updateCaseInCcd(caseId, events.ANSWER_NOT_RECEIVED);
  // verifyState(answerNotReceived, states.AWAITING_DN);
  //
  // const dnApplied = await updateCaseInCcd(caseId, events.DN_RECEIVED);
  // verifyState(dnApplied, states.AWAITING_LA);
  //
  // const refertoLegalAdvisor = await updateCaseInCcd(caseId, events.REFER_TO_LEGAL_ADVSIOR);
  // verifyState(refertoLegalAdvisor, states.AWAITING_CONSIDERATION);
  //
  // const entitlementGranted = await updateCaseInCcd(caseId, events.ENTITLEMENT_GRANTED);
  // verifyState(entitlementGranted, states.AWAITING_PRONOUNCEMENT);
  //
  // const dnPronounced = await updateCaseInCcd(caseId, events.DN_PRONOUNCED_BY_BULK);
  // verifyState(dnPronounced, states.DN_PRONOUNCED);
  //
  // const awaitingDecreeAbsolute = await updateCaseInCcd(caseId, events.MAKE_ELIGIBLE_FOR_DA);
  // verifyState(awaitingDecreeAbsolute, states.AWAITING_DA);
  //
  // const daGranted = await updateCaseInCcd(caseId, events.DA_GRANTED);
  // verifyState(daGranted, states.DIVORCE_GRANTED);
}).retry(testconfig.TestRetryScenarios);