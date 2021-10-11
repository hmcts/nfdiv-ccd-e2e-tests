const {
  createNFDCaseInCcd,
  updateNFDCaseInCcd,
  updateRoleForCase,
  shareCaseToRespondentSolicitor,
  moveFromHoldingToAwaitingCO
} = require("../../../helpers/utils");

const {user, events, states} = require("../../../common/constants");

const testconfig = require("./../../config");

Scenario('NFD - 20 week Holding to Conditional Order', async function (I) {

 // To Move to Holding .... Call CCD API to mimic the cron job.

  const tempCaseNumber = '1632958714343095';
  const movedToConditionalOrderState = await moveFromHoldingToAwaitingCO('data/20week-to-await-co-data',tempCaseNumber);




}).retry(testconfig.TestRetryScenarios);
