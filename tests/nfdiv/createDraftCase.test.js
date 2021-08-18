const {createNFDCaseInCcd} = require('../../helpers/utils');
const testconfig = require('./../config');

let caseId;
Feature('NFD  Case Create ');

Scenario('NFD - Sole Divorce Case created in CCD in Draft State', async function (I) {
  caseId = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '.....caseCreated in CCD and caseId is...... ' + caseId);
}).retry(testconfig.TestRetryScenarios);
