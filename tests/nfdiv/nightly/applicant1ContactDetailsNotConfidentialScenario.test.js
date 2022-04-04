const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO,moveCaseToBulk} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature('NFD - Confidential Applicant');

Scenario('NFD - Assert Data in the Confidential Documents Tab - App1 Represented and app1ContactDetails Not Confidential ',
  async function (I) {
    //"applicant1KeepContactDetailsConfidential": "No", in the  File below.
    caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-app1-details-not-confidential-case.json');
    console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);

    //SoT serviceMethod == courtService
    const awaitingHWF = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-sot-courtservice.json');
    verifyState(awaitingHWF, states.AWAITING_HWF);

    const hwfAccepted = await updateNFDCaseInCcd(user.CA,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
    verifyState(hwfAccepted, states.SUBMITTTED);

    //TODO Test  Assert ConfidentialDocuments Tab once this test has passed.

  }).retry(testConfig.TestRetryScenarios);
