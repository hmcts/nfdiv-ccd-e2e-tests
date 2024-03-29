const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO,moveCaseToBulk} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD - Update Case in CCD ');

// Useful for quickly updating a Case with data that is required. Skipping this as more for test data creation than a proper e2e one.
Scenario.skip('NFD - Update Case In CCD  ', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  //SoT serviceMethod == solicitorService is chosen during  SoT
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  // workaround  for any existing caseId
  //await updateNFDCaseInCcd(user.CA,'1644252587596872', 'system-progress-case-awaiting-final-order','data/ccd-nfd-eligibledate.json');
  await updateNFDCaseInCcd(user.CA,caseNumber, 'caseworker-update-contact-details','data/ccd-nfd-update-case.json');


}).retry(testConfig.TestRetryScenarios);

