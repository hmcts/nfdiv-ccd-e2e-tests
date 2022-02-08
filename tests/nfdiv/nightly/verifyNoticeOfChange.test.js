const {paymentType,yesorno,divorceOrDissolution, states, stateDisplayName, events} = require('../../../common/constants');
const testconfig = require('./../../config');
const {createNFDCaseInCcd,getCaseDetailsFor} = require('../../../helpers/utils');
const testConfig = require('./../../config');

let caseNumber;

Feature('Notice of Change Event ');

Scenario('Caseworker triggers Notice of Change event', async (I) => {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-joint-draft-case.json');
  console.log( '..... Joint Case Created in CCD , CaseNumber is ==  ' + caseNumber);

  console.log('GET Case Details ... returns ...' + await getCaseDetailsFor(caseNumber));

  await I.wait(5);
  await I.amOnHomePage();
  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(5);
  await I.filterByBulkCaseReference(caseNumber);
  await I.amOnPage('/case-details/' + caseNumber);
  await I.wait(3);

  await I.checkNextStepForEvent('Notice of change');
  await I.fillNoticeOfChange(caseNumber);
  await I.submitNoticeOfChangeCYA(caseNumber);
  await I.checkEventAndStateOnPageAndSignOut(stateDisplayName.DRAFT, events.NOTICE_OF_CHANGE);


}).retry(testconfig.TestRetryScenarios);
