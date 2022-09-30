const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD Case - Verify Dispensed Order');

Scenario('NFD - Dispensed order to Holding state', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT serviceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const issueAosPack = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(issueAosPack, states.AOS_AWAITING);

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.wait(5);
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(3);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(5);
  await I.see('AoS awaiting');
  await I.see('Application issue');
  await I.checkNextStepForEvent('Service application received');
  await I.submitServiceApplicationReceivedDispensed(caseNumber);
  await I.submitServiceApplicationReceivedCYA(caseNumber);
  await I.checkState(stateDisplayName.AWAITING_SERVICE_PAYMENT, events.SERVICE_APPLICATION_RECEIVED);

  // TODO Retest on local and uncomment these scenarios.
  // await I.amOnPage('/cases/case-details/' + caseNumber);
  // await I.wait(5);
  // await I.checkNextStepForEvent('Confirm service payment');
  // await I.submitServiceApplicationPayment(caseNumber);
  //
  // await I.submitServiceApplicationPaymentCYA(caseNumber);
  // await I.submitServiceApplicationPaymentSubmit(caseNumber);
  // await I.checkState(stateDisplayName.AWAITING_SERVICE_CONSIDERATION, events.CONFIRM_SERVICE_PAYMENT);
  //
  // await I.wait(3);
  // await I.checkNextStepForEvent('Make service decision');
  // await I.submitApproveServiceApplication(caseNumber);
  // await I.submitApproveServiceApplicationCYA(caseNumber);
  // await I.checkState(stateDisplayName.TWENTY_WEEK_HOLDING_PERIOD, events.MAKE_SERVICE_DECISION);

}).retry(testConfig.TestRetryScenarios);
