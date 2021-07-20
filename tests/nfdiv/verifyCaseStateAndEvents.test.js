const { createCaseInCcd, createNFDCaseInCcd, updateCaseInCcd,updateNFDCaseInCcd} = require('../../helpers/utils');
const { states, events } = require('../../common/constants');
const assert = require('assert');
const testconfig = require('./../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseId;

Feature('Verify NFD  Case States and Events');

Scenario('Create NFD Case in CCD and verify the states and events as journey progresses ', async function (I) {
  // Start with a case submitted
  caseId = await createNFDCaseInCcd('data/ccd-nfdiv-draft-case.json');

  console.log( '.....caseCreated in CCD and caseId is...... ' + caseId);

  const submitted = await updateNFDCaseInCcd(caseId, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-to-submitted-state.json');
  verifyState(submitted, states.AWAITING_HWF);

  // const issued = await updateCaseInCcd(caseId, events.ISSUE_FROM_SUBMITTED);
  // verifyState(issued, states.ISSUED);
  //
  // const issueAOS = await updateCaseInCcd(caseId, events.ISSUE_AOS);
  // verifyState(issueAOS, states.AOS_AWAITING);
  //
  // const startAOS = await updateCaseInCcd(caseId, events.START_AOS);
  // verifyState(startAOS, states.AOS_STARTED);
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
