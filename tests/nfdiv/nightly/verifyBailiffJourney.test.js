const {createNFDCaseInCcd,updateNFDCaseInCcd,getCaseDetailsFor} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');


const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD Case - Verify Bailiff Journey for Divorce and CP cases @bailiff');

Scenario('NFD -Divorce Case - Service Received,Service Payment,Bailiff Decision and Bailiff Service ', async function (I) {

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
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(7);
  await I.waitForText('AoS awaiting');
  await I.wait(15);
  await I.checkNextStepForEvent('Service application received');
  await I.submitServiceApplicationReceivedBailiff(caseNumber);
  await I.submitServiceApplicationReceivedCYA(caseNumber);
  await I.checkState(stateDisplayName.AWAITING_SERVICE_PAYMENT, events.SERVICE_APPLICATION_RECEIVED);

  await I.wait(15);
  await I.checkNextStepForEvent('Confirm service payment');
  await I.submitServiceApplicationPaymentBailiff(caseNumber);
  await I.submitServiceApplicationPaymentCYABailiff(caseNumber);
  await I.submitServiceApplicationPaymentSubmitBailiff(caseNumber);
  await I.checkState(stateDisplayName.AWAITING_BAILIFF_REFERRAL, events.CONFIRM_SERVICE_PAYMENT);
  await I.signOut();
  await I.wait(5);

  //Log in as Legal advisor to make decision

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvLegalAdvisorUser, testConfig.TestEnvLegalAdvisorPassword);
  await I.wait(10);
  //await I.filterByCaseId(caseNumber);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(20);
  await I.checkNextStepForEvent(events.MAKE_BAILIFF_DECISION);
  await I.submitMakeBailiffDecision(caseNumber);
  await I.submitMakeBailiffDecisionCYA(caseNumber);
  await I.wait(5);
  await I.checkEventOnPage(events.MAKE_BAILIFF_DECISION);
  await I.signOut();

  //Log in as Caseworker and issue the bailiff pack
  await I.wait(15);
  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(10);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(10);
  await I.checkNextStepForEvent('Issue bailiff pack',);
  await I.submitIssueBailiffPack(caseNumber);
  await I.submitIssueBailiffPackCYA(caseNumber);
  await I.wait(7);

  let caseResponse =  await getCaseDetailsFor(caseNumber);
  assert.strictEqual('IssuedToBailiff',caseResponse.state);

}).retry(testConfig.TestRetryScenarios).tag('@bailiff');
