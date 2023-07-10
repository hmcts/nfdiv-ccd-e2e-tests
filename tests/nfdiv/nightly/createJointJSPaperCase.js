const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO,moveCaseToBulk,
  updateFinalOrderDateForNFDCaseInCcd, moveCaseToFinalOrderOverdue,createNFDPaperCaseInCCD} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName, eventDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;

Feature.skip('NFD- create Paper Case until FO granded');

// NOTE THIS TEST PASSES LOCALLY,but since it is a very long one going upto FinalOrderOverdue it fails on pipeline
// but passes on local when pointing to AAT or your local Docker case-api (cftlib) .

// Useful Test to reuse/amend , when creating TestData

Scenario('NFD - create Paper Case', async function (I) {
// script to creat JS case for generating Test Data
  caseNumber = await createNFDPaperCaseInCCD('data/ccd-nfdiv-createPaperCase.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);
  let state;
  //  //update the correct paper case event
  state = await updateNFDCaseInCcd(user.CA,caseNumber, events.CORRECT_PAPER_CASE,'data/ccd-nfdiv-updateJointPaperCase.json');
  //  // Progress the case to submited State
  state = await updateNFDCaseInCcd(user.CA,caseNumber, events.PROGRESS_PAPER_CASE,'data/ccd-nfdiv-ProgressPaperCase.json');
  state = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  // //   move case to CO request Attach Scan Doc//Verify Doc
  state = await updateNFDCaseInCcd(user.CA,caseNumber, events.ATTACH_SCAN_DOCS,'data/ccd-D84Document.json');
  //verifyState(state, states.AOS_AWAITING);
  state = await updateNFDCaseInCcd(user.CA,caseNumber, events.VERIFY_OFFLINE_DOC,'data/ccd-jointD84.json');
  // //Legal advisor decision
  const listedAwaitingPronouncement = await updateNFDCaseInCcd(user.LAD,caseNumber, events.LEGAL_ADVISOR_MAKE_DECISION,'data/ccd-la-make-decision.json');
}).retry(testConfig.TestRetryScenarios);

