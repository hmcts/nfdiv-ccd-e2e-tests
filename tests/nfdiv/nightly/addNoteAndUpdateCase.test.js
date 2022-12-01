const { paymentType,yesorno,events, user, states} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createNFDCaseInCcd, updateNFDCaseInCcd} = require('../../../helpers/utils');
const assert = require('assert');

let caseNumber;

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};


Feature('Add Note , Update Contact, Update Language , Update DueDate and Update Application Type');

Scenario('Create General Email , Referral , Order and verify state and events', async (I) => {

  // Create a Case
  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '.....caseCreated in CCD , caseId is ==  ' + caseNumber);

  //SoT serviceMethod == solicitorService is chosen during  SoT
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CW,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);
  await I.wait(5);
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(7);
  //await I.shouldBeOnCaseListPage();
  await I.wait(5);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(5);
  await I.checkNextStepForEvent('Add note');

  // Add Case Note
  await I.wait(5);
  await I.createAddCaseNotes(caseNumber);
  await I.wait(2);
  await I.createAddCaseNoteEventSummary(caseNumber);
  await I.checkState('Submitted','Add note');

  //Update Due Date
  await I.wait(2);
  await I.checkNextStepForEvent('Update due date');
  await I.updateDueDate();
  await I.wait(2);
  await I.updateDueDateEventSummary(caseNumber);
  await I.checkState('Submitted','Update due date');


}).retry(testConfig.TestRetryScenarios);
