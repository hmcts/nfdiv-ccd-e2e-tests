const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor} = require('../../helpers/utils');
const { states, events , user} = require('../../common/constants');
const assert = require('assert');
const testConfig = require('./../config');


const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseId;

Feature('Verify NFD  Case States and Events');

Scenario('NFD - Sole Divorce Case created in CCD and verify the following states Draft, AwaitingHWF,Submitted,Issued', async function (I) {

  caseId = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '.....caseCreated in CCD , caseId is ==  ' + caseId);

  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseId, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseId, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const issueAosPack = await updateNFDCaseInCcd(user.CA,caseId, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(issueAosPack, states.AOS_AWAITING);

  const shareACase = await updateRoleForCase(user.CA,caseId,'APPTWOSOLICITOR');

  // const caseAvailableToRespondentSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseId);

}).retry(testConfig.TestRetryScenarios);
