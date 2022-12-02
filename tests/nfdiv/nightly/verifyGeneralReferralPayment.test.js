const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName, eventDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('../../config');


const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD - Testing cases up to Awaiting DWP Response state paths ');

Scenario('NFD - Creating a case and moving it to Awaiting General Referral Payment ', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log('..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT serviceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS, caseNumber, events.SOLICITOR_SUBMIT_APPLICATION, 'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA, caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED, 'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA, caseNumber, events.ISSUED_FROM_SUBMITTED, 'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  const shareACase = await updateRoleForCase(user.RS, caseNumber, 'APPTWOSOLICITOR');

  console.log('~~~~~~~~~ Case with Id ' + caseNumber + ' has been SUCCESSFULLY SHARED  to Respondent Solicitior');

  const draftAoS = await updateNFDCaseInCcd(user.RS, caseNumber, events.DRAFT_AOS, 'data/ccd-draft-aos.json');
  verifyState(draftAoS, states.AOS_DRAFTED);

  const submitAoS = await updateNFDCaseInCcd(user.RS, caseNumber, events.SUBMIT_AOS, 'data/ccd-submit-aos.json');
  verifyState(submitAoS, states.HOLDING);

  await I.wait(5);
  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(5);
  ////await I.filterByBulkCaseReference(caseNumber);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(5);
  await I.checkNextStepForEvent('General referral');
  await I.submitGeneralReferral();
  await I.checkStateAndEvent(stateDisplayName.GENERAL_REFERRAL, eventDisplayName.GENERAL_REFERRAL);

}).retry(testConfig.TestRetryScenarios);

Scenario('NFD - Creating a case and moving it to Awaiting DWP Response from Awaiting General Consideration ', async function (I) {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-bulk-case.json');
  console.log('..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT serviceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS, caseNumber, events.SOLICITOR_SUBMIT_APPLICATION, 'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA, caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED, 'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA, caseNumber, events.ISSUED_FROM_SUBMITTED, 'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  const shareACase = await updateRoleForCase(user.RS, caseNumber, 'APPTWOSOLICITOR');

  const draftAoS = await updateNFDCaseInCcd(user.RS, caseNumber, events.DRAFT_AOS, 'data/ccd-draft-aos.json');
  verifyState(draftAoS, states.AOS_DRAFTED);

  const submitAoS = await updateNFDCaseInCcd(user.RS, caseNumber, events.SUBMIT_AOS, 'data/ccd-submit-aos.json');
  verifyState(submitAoS, states.HOLDING);

  await I.wait(5);
  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(5);
  //await I.filterByBulkCaseReference(caseNumber);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(5);
  await I.checkNextStepForEvent('General referral');
  await I.submitGeneralReferralCW();
  await I.checkEventAndStateOnPageAndSignOut(states.AWAITING_GENERAL_CONSIDERATION, eventDisplayName.GENERAL_REFERRAL);

  await I.wait(5);
  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.login(testConfig.TestEnvLegalAdvisorUser, testConfig.TestEnvLegalAdvisorPassword);
  await I.wait(5);
  //await I.filterByBulkCaseReference(caseNumber);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(5);
  await I.checkNextStepForEvent('General Consideration');
  await I.submitGeneralConsideration();
  await I.checkEventAndStateOnPageAndSignOut(states.GENERAL_CONSIDERATION_COMPLETE, eventDisplayName.GENERAL_REFERRAL);

  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(5);
  //await I.filterByBulkCaseReference(caseNumber);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(5);
  await I.checkNextStepForEvent('Request DWP disclosure');
  await I.submitRequestDWPDisclosure();
  await I.checkStateAndEvent(states.AWAITING_DWP_RESPONSE, eventDisplayName.REQUEST_DWP_DISCLOSURE);



}).retry(testConfig.TestRetryScenarios);
