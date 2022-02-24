const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,
  moveFromHoldingToAwaitingCO} = require('../../../helpers/utils');
const {states, events , eventDisplayName,user} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

// Commenting out as this test is mainly to be used an an utility rather than a feature test.
xFeature('A Easy Test to Run , if you just want to update data in a case which has been ' +
  'stale or has been modified ');

xScenario('NFD - Update data in a case', async function (I) {

  caseNumber = '1637822972051797'; // the case you want to update
  const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, 'caseworker-amend-case','data/ccd-case-update.json');


}).retry(testConfig.TestRetryScenarios);
