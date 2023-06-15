const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO,moveCaseToBulk,
  updateFinalOrderDateForNFDCaseInCcd, moveCaseToFinalOrderOverdue,createNFDPaperCaseInCCD} = require('../../../helpers/utils');
const { states, events , user, stateDisplayName, eventDisplayName} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let caseNumber;
let state;

Feature('NFD- create Paper Case until FO granded');

// NOTE THIS TEST PASSES LOCALLY,but since it is a very long one going upto FinalOrderOverdue it fails on pipeline
// but passes on local when pointing to AAT or your local Docker case-api (cftlib) .

// Useful Test to reuse/amend , when creating TestData

Scenario('NFD - Scripts Sole JS Paper Case', async function (I) {
  //caseNumber ='1685089209222531';
  caseNumber = await createNFDPaperCaseInCCD('data/ccd-nfdiv-createPaperCase.json');
  console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);
  //update the correct paper case event
  state = await updateNFDCaseInCcd(user.CA,caseNumber, events.CORRECT_PAPER_CASE,'data/ccd-nfdiv-updateSoleJSPaperCase.json');
  verifyState(state, states.NEW_PAPERCASE);
  // Progress the case to submited State
  state = await updateNFDCaseInCcd(user.CA,caseNumber, events.PROGRESS_PAPER_CASE,'data/ccd-nfdiv-ProgressPaperCase.json');
  verifyState(state, states.PAPERCASE_SUBMITTED);
  state = await updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(state, states.AOS_AWAITING);
  //Attach undisputed AOS D10 form
  state = await updateNFDCaseInCcd(user.CA,caseNumber, events.ATTACH_SCAN_DOCS,'data/ccd-D20Document.json');
  state = await updateNFDCaseInCcd(user.CA,caseNumber, events.VERIFY_OFFLINE_DOC,'data/ccd-nfdiv-AOSResponsePaper.json');
  //No 20 weekHolding for JS cases
  // //Attach CO/D84 and verify it
  state = await updateNFDCaseInCcd(user.CA,caseNumber, events.ATTACH_SCAN_DOCS,'data/ccd-D84Document.json');
  state = await updateNFDCaseInCcd(user.CA,caseNumber, events.VERIFY_OFFLINE_DOC,'data/ccd-SoleD84.json');
  const listedAwaitingPronouncement = await updateNFDCaseInCcd(user.LAD,caseNumber, events.LEGAL_ADVISOR_MAKE_DECISION,'data/ccd-la-make-decision.json');


}).retry(testConfig.TestRetryScenarios);
//Inprogress
xScenario('NFD CW progress the sole JS case', async (I) => {

  // //Create case with script, to mimic bulkscan process
  caseNumber = await createNFDPaperCaseInCCD('data/ccd-nfdiv-createPaperCase.json');
  // console.log('..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);
  // //update the correct paper case event
  state = await updateNFDCaseInCcd(user.CA, caseNumber, events.CORRECT_PAPER_CASE, 'data/ccd-nfdiv-updateSoleJSPaperCase.json');

  verifyState(state, states.NEW_PAPERCASE);
  await I.amOnPage('/');
  await I.wait(5);
  await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  await I.wait(3);
  //await I.filterByCaseId(caseNumber);
  await I.amOnPage('/cases/case-details/' + caseNumber);
  await I.wait(5);
  pause();
  await I.see('New paper case');
  //Correct paper case
  //Progress Paper case
  await I.checkNextStepForEvent('Progress paper case');
  await I.progressPaperCase();
  await I.summaryPage();
  await I.checkState('Submitted','Progress paper case');
  await I.checkApplicantTab('Judicial Separation' );
  //issue paper case
  //  await I.checkNextStepForEvent('');



  //Progress the case to submitted state and assert
  //Progress to issue state and assert

}
).retry(testConfig.TestRetryScenarios);
