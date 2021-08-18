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

}).retry(testconfig.TestRetryScenarios);
