const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase,shareCaseToRespondentSolicitor,moveFromHoldingToAwaitingCO,moveCaseToBulk,
  updateFinalOrderDateForNFDCaseInCcd,moveMultipleCasesToBulk} = require('../../../helpers/utils');
const { soleOrJoint, states, events , user, stateDisplayName, eventDisplayName, yesorno, divorceOrDissolution} = require('../../../common/constants');
const assert = require('assert');
const testConfig = require('./../../config');

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

let bulkCaseNumber;

Feature('NFD - Bulk Case ');

let caseNumber = '';

Scenario.skip('Script - XUI Joint Divorce Case - upto Holding State', async (I) => {
  await I.amOnHomePage();
  await I.login(testConfig.TestEnvSolUser, testConfig.TestEnvSolPassword);

  let  caseId_1 =  await createTestCaseHere(I);
  // update case1
  const xx = await updateNFDCaseInCcd(user.SOLS,caseNumber, events.XXXX_UPDATE_EVENT,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');

  //await updateNFDCaseInCcd(user.CA,caseId_1, 'caseworker-update-contact-details','data/ccd-nfdiv-awaiting-pronoun-full-dataset.json');

  let  caseId_2 =  await createTestCaseHere(I);
  // update case2

  let  caseId_3 =  await createTestCaseHere(I);
  // update case3

  console.log( 'case 1  == '+ caseId_1 + ' case 2 ==='+ caseId_2 +  ' case 3 ====' + caseId_3);
  // caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-awaiting-pronoun-base-data.json');
  // console.log( '..... caseCreated in CCD , caseNumber is ==  ' + caseNumber);
  //

  var casesList = new Array(caseId_1,caseId_2,caseId_3);

  // Update the case with valid Data for Listed;AwaitingProuncmement State.

  //Note:Important: BulkCase with just ONE CaseParty reference . Purely for e2e purpose Only and to enable testing of the Pages that follow it.
  const bulkCaseReferenceId = await moveMultipleCasesToBulk('data/bulk-case-list-with-three-cases.json', casesList);

  // Login as CA with CaseType as 'NO_FAULT_DIVORCE_BulkAction' and check for BulkCase Created
  // await I.wait(5);
  // await I.amOnHomePage();
  // await I.login(testConfig.TestEnvCourtAdminUser, testConfig.TestEnvCourtAdminPassword);
  // await I.wait(5);
  // await I.filterByBulkCaseReference(bulkCaseReferenceId);
  // await I.amOnPage('/case-details/' + bulkCaseReferenceId);
  // //  await I.see('Case list 1');
  // //  await I.see('Bulk case list');
  // //  await I.see('Case parties');
  //
  // await I.wait(3);
  // await I.checkNextStepForEvent('Schedule cases for listing');
  // await I.submitScheduleCases(bulkCaseReferenceId);
  // await I.submitScheduleCasesCYA(bulkCaseReferenceId);

  // TODO Click on History Tab to get state of the Event & then Assert
  //await I.checkState(stateDisplayName.BULK_CASE_LISTED_CREATED, eventDisplayName.SYSTEM_UPDATE_CASE);

  // await I.wait(3);
  // await I.checkNextStepForEvent('Print for pronouncement');
  // await I.submitPrintForPronouncement(bulkCaseReferenceId);
  // await I.submitPrintForPronouncementCYA(bulkCaseReferenceId);
  // await I.checkState(stateDisplayName.BULK_CASE_LISTED, events.SYSTEM_UPDATE_CASE);
  //
  // await I.wait(3);
  // await I.checkNextStepForEvent('Pronounce list');
  // await I.submitPronounceList(bulkCaseReferenceId);
  //
  // await I.submitPronounceListCYA(bulkCaseReferenceId);
  // await I.checkState(stateDisplayName.BULK_CASE_PRONOUNCED, events.PRONOUNCE_LIST);
  // backDate the dateFinalOrderEligibleFrom to 6weeks + 1day in the past

  // TODO toFix  FO bits.
  //const  finalOrderEligibleToRespondent= await updateFinalOrderDateForNFDCaseInCcd(user.CA,caseNumber, 'system-progress-case-awaiting-final-order','data/final-order-date-eligible-to-respondent.json');
  //verifyState(finalOrderEligibleToRespondent , 'AwaitingFinalOrder');

}).retry(testConfig.TestRetryScenarios);

async function createTestCaseHere(I) {
  await I.clickCreateCase();
  await I.fillCreateTestCaseFormAndSubmit();
  await I.createTestCaseWith();
  caseNumber = await I.pressSubmit();
  caseNumber = caseNumber.toString();
  caseNumber = caseNumber.replace(/\D/g, '');
  return caseNumber;
}
