const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO,moveCaseToBulk} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD - FO EligibleDate');

Scenario.skip('NFD - FO EligibleDate ', async function (I) {

  // caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-bulk-case.json');
  // console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // hack for arbitary caseId.
  await updateNFDCaseInCcd(user.CA,'1644252587596872', 'system-progress-case-awaiting-final-order','data/ccd-nfd-eligibledate.json');


}).retry(testConfig.TestRetryScenarios);

