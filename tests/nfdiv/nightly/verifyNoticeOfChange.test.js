const {paymentType,yesorno,divorceOrDissolution, states, stateDisplayName, events, user} = require('../../../common/constants');
const testconfig = require('./../../config');
const {createNFDCaseInCcd,getCaseDetailsFor, updateNFDCaseInCcd, updateRoleForCase, shareCaseToRespondentSolicitor} = require('../../../helpers/utils');
const testConfig = require('./../../config');
const assert = require('assert');

let caseNumber;

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

Feature('Notice of Change Event ');

Scenario('Caseworker updates solicitor org for app1', async (I) => {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-bulk-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT solServiceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  const shareACase = await updateRoleForCase(user.RS,caseNumber,'APPTWOSOLICITOR');

  const caseSharedToRespSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);
  assert.strictEqual(JSON.parse(caseSharedToRespSolicitor).status_message, 'Roles [APPTWOSOLICITOR] from the organisation policies successfully assigned to the assignee.');

  console.log('~~~~~~~~~ Case with Id ' + caseNumber +' has been SUCCESSFULLY SHARED  to Respondent Solicitior');

  const draftAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.DRAFT_AOS,'data/ccd-draft-aos.json');
  verifyState(draftAoS, states.AOS_DRAFTED);

  const submitAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.SUBMIT_AOS,'data/ccd-submit-aos.json');
  verifyState(submitAoS, states.HOLDING);

  await I.wait(5);
  await I.amOnHomePage();
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(5);
  await I.filterByCaseId(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(3);

  await I.checkNextStepForEvent('Notice of change');
  await I.fillNoticeOfChange(caseNumber);
  await I.submitNoticeOfChangeCYA(caseNumber);
  await I.checkEventAndStateOnPageAndSignOut(stateDisplayName.TWENTY_WEEK_HOLDING_PERIOD, events.NOTICE_OF_CHANGE);

  let caseResponse =  await getCaseDetailsFor(caseNumber);

  let app1Represented = caseResponse.case_data.applicant1SolicitorRepresented;
  let app2Represented = caseResponse.case_data.applicant2SolicitorRepresented;
  let app1SolOrg = caseResponse.case_data.applicant1SolicitorOrganisationPolicy.Organisation.OrganisationName;

  assert.strictEqual(app1Represented,'Yes');
  assert.strictEqual(app2Represented,'Yes');
  assert.strictEqual(app1SolOrg,'NFD E2E Test Solicitor Organisation Ltd');

}).retry(testconfig.TestRetryScenarios);

Scenario('Caseworker removes solicitor org for app1', async (I) => {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-bulk-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT solServiceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  const shareACase = await updateRoleForCase(user.RS,caseNumber,'APPTWOSOLICITOR');

  const caseSharedToRespSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);
  assert.strictEqual(JSON.parse(caseSharedToRespSolicitor).status_message, 'Roles [APPTWOSOLICITOR] from the organisation policies successfully assigned to the assignee.');

  console.log('~~~~~~~~~ Case with Id ' + caseNumber +' has been SUCCESSFULLY SHARED  to Respondent Solicitior');

  const draftAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.DRAFT_AOS,'data/ccd-draft-aos.json');
  verifyState(draftAoS, states.AOS_DRAFTED);

  const submitAoS = await updateNFDCaseInCcd(user.RS,caseNumber, events.SUBMIT_AOS,'data/ccd-submit-aos.json');
  verifyState(submitAoS, states.HOLDING);

  await I.wait(5);
  await I.amOnHomePage();
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(5);
  await I.filterByBulkCaseReference(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(3);

  await I.checkNextStepForEvent('Notice of change');
  await I.fillNoticeOfChangeRemove(caseNumber);
  await I.submitNoticeOfChangeCYA(caseNumber);
  await I.checkEventAndStateOnPageAndSignOut(stateDisplayName.TWENTY_WEEK_HOLDING_PERIOD, events.NOTICE_OF_CHANGE);

  let caseResponse =  await getCaseDetailsFor(caseNumber);

  let app1Represented = caseResponse.case_data.applicant1SolicitorRepresented;
  let app2Represented = caseResponse.case_data.applicant2SolicitorRepresented;
  let app2SolOrg = caseResponse.case_data.applicant2SolicitorOrganisationPolicy.Organisation.OrganisationName;

  assert.strictEqual(app1Represented,'No');
  assert.strictEqual(app2Represented,'Yes');
  assert.strictEqual(app2SolOrg,'DivRespondentSolicitorFirm');


}).retry(testconfig.TestRetryScenarios);

//Todo Caseworker adding solicitor org for app1 & app2
