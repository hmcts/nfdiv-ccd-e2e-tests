const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');


const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD Case - Verify Bailiff Journey');

Scenario('NFD - Service Received , Service Payment, Bailiff Decision and Bailiff Service ', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT solServiceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const issueAosPack = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(issueAosPack, states.AOS_AWAITING);

  await I.amOnHomePage();
  await I.wait(5);
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(3);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(5);
  await I.see('AoS awaiting');
  await I.see('Application issued');
  await I.checkNextStepForEvent('Service application received');
  await I.submitServiceApplicationReceivedBailiff(caseNumber);
  await I.submitServiceApplicationReceivedCYABailiff(caseNumber);
  await I.checkState(stateDisplayName.AWAITING_SERVICE_PAYMENT, events.SERVICE_APPLICATION_RECEIVED);

  await I.wait(3);
  await I.checkNextStepForEvent('Confirm Service Payment');
  await I.submitServiceApplicationPaymentBailiff(caseNumber);
  await I.submitServiceApplicationPaymentCYABailiff(caseNumber);
  await I.submitServiceApplicationPaymentSubmitBailiff(caseNumber);
  await I.checkState(stateDisplayName.AWAITING_BAILIFF_REFERRAL, events.CONFIRM_SERVICE_PAYMENT);

  await I.wait(3);
  await I.checkNextStepForEvent('Make Bailiff Decision');
  await I.submitMakeBailiffDecision(caseNumber);
  await I.submitServiceApplicationPaymentCYABailiff(caseNumber);
  await I.submitServiceApplicationPaymentSubmitBailiff(caseNumber);
  await I.checkState(stateDisplayName.AWAITING_BAILIFF_REFERRAL, events.MAKE_BAILIFF_DECISION);

  await I.wait(3);
  await I.checkNextStepForEvent('Issue bailiff pack');
  await I.submitIssueBailiffPack(caseNumber);
  await I.submitIssueBailiffPackCYA(caseNumber);
  await I.checkState(stateDisplayName.ISSUED_TO_BAILIFF, events.ISSUED_BAILIFF_PACK);

}).retry(testConfig.TestRetryScenarios);
