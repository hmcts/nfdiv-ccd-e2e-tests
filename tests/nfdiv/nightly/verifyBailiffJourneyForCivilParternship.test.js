const {createNFDCaseInCcd,updateNFDCaseInCcd,getCaseDetailsFor} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');


const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD Case - Verify Bailiff Journey for CP case @bailiff');

Scenario('NFD -CP Case -  Service Received , Service Payment, Bailiff Decision and Bailiff Service ', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-civil-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT serviceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice-civil.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const issueAosPack = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  await I.wait(10);

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.wait(8);
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(3);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(20);
  await I.see('AoS awaiting');
  await I.checkNextStepForEvent('Service application received');
  await I.submitServiceApplicationReceivedBailiff(caseNumber);
  await I.submitServiceApplicationReceivedCYA(caseNumber);
  await I.checkState(stateDisplayName.AWAITING_SERVICE_PAYMENT, events.SERVICE_APPLICATION_RECEIVED);

  await I.wait(20);
  await I.checkNextStepForEvent('Confirm service payment');
  await I.submitServiceApplicationPaymentBailiff(caseNumber);
  await I.submitServiceApplicationPaymentCYABailiff(caseNumber);
  await I.submitServiceApplicationPaymentSubmitBailiff(caseNumber);
  await I.checkState(stateDisplayName.AWAITING_BAILIFF_REFERRAL, events.CONFIRM_SERVICE_PAYMENT);
  await I.signOut();
  // await I.wait(3);
  // await I.checkNextStepForEvent('Make bailiff decision');
  // await I.submitMakeBailiffDecision(caseNumber);
  // await I.submitMakeBailiffDecisionCYA(caseNumber);
  // await I.checkState(stateDisplayName.AWAITING_BAILIFF_SERVICE, events.MAKE_BAILIFF_DECISION);

  //Log in as Legal advisor to make decision
  await I.login(testConfig.TestEnvLegalAdvisorUser, testConfig.TestEnvLegalAdvisorPassword);
  await I.wait(3);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(20);
  await I.checkNextStepForEvent(events.MAKE_BAILIFF_DECISION);
  await I.wait(10);
  await I.submitMakeBailiffDecision(caseNumber);
  await I.submitMakeBailiffDecisionCYA(caseNumber);
  await I.checkEventOnPage(events.MAKE_BAILIFF_DECISION);
  await I.signOut();
  await I.wait(3);
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(3);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(20);
  await I.checkNextStepForEvent('Issue bailiff pack');
  await I.submitIssueBailiffPack(caseNumber);
  await I.submitIssueBailiffPackCYA(caseNumber);

  await I.wait(5);

  let caseResponse =  await getCaseDetailsFor(caseNumber);
  assert.strictEqual('IssuedToBailiff',caseResponse.state);

}).retry(testConfig.TestRetryScenarios).tag('@bailiff');
