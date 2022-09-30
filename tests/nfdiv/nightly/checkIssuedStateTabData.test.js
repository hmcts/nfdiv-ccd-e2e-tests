const {createNFDCaseInCcd, updateNFDCaseInCcd} = require('../../../helpers/utils');
const { reasonsForDivorce, signOut, states, events ,user} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyContent = require('../../../data/tab-fields/nfdiv/application-issued-case-data.json');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('Application Issued - Check the Labels and Content present on the Application Tab of the CaseHistory Page.');

Scenario('Checking Tab data when case has been Issued', async function (I) {
  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

  // SoT serviceMethod == courtService
  const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
  verifyState(awaitingHWF, states.AWAITING_HWF);

  const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  const awaitingService = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  // Verify all tab fields of Application Tab, Language,MarriageCert, Service Application

  await I.amOnPage('/',testConfig.TestTimeToWaitForText);

  await I.login(testConfig.TestEnvCWUser, testConfig.TestEnvCWPassword);
  await I.wait(1);
  await I.amOnPage('cases/case-details/' + caseNumber);
  await I.wait(1);
  await I.validateApplicationTabData(reasonsForDivorce.SEPFIVEYRSDISPLAY, verifyContent);

  //Todo - finish writing this test(branch open)

  // await I.validateConfidentialPetitionerTab(verifyContent);
  // await I.validateMarriageCertTabData(verifyContent);
  // await I.validateAOSTabData(reasonsForDivorce.SEPFIVEYRSDISPLAY, verifyContent);
  // await I.validateDecreeNisiTabData(reasonsForDivorce.SEPFIVEYRSDISPLAY, verifyContent);
  // await I.validateOutcomeOfDNTabData(verifyContent);
  // await I.validateDecreeAbsoluteTabData(verifyContent);
  // await I.validateDocumentTabData(reasonsForDivorce.SEPFIVEYRSDISPLAY, caseId);
  // await I.validatePaymentTabData(verifyContent);
  // await I.validateLanguageTabData(reasonsForDivorce.SEPFIVEYRSDISPLAY, verifyContent);
  await I.click(signOut);
}).retry(testConfig.TestRetryScenarios);
