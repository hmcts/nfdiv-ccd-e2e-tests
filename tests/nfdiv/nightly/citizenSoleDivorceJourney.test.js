const {citizenUserPW,events, user, states, stateDisplayName} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createCitizenUser,deleteUser,updateNFDCitizenCaseWithId,createNFDCitizenBasicCaseAndFetchResponse,
  inviteApplicant2, systemLinkApplicant2,createRespondentCitizenUser,updateSoleCitizenCaseWithApp2Details
} = require('../../../helpers/citizen-utils');
const {updateNFDCaseInCcd, updateRoleForCase, moveFromHoldingToAwaitingCO,getCitizenCaseDetails, getCaseDetailsAsSolFor,soleCitizenApp2DraftAoS} = require('../../../helpers/utils');
const assert = require('assert');

let citizenCaseId;
let response;
let respondentOrApplicant2Response;



Feature('Citzen Journey');


Scenario.skip('Citizen Sole Divorce Journey - using Divorce,Documents, HWF  ', async (I) => {

  // create new citizen user for each Test Run.
  response = await createCitizenUser();
  respondentOrApplicant2Response = await createRespondentCitizenUser();


  // Applicant-1
  const userDetails = new Object();
  userDetails.id = response.id;
  userDetails.forename = response.forename;
  userDetails.surname = response.surname;
  userDetails.email = response.email;

  //Respondent
  const respondentUserDetails = respondentDetails();

  console.log('| +  userDetails.email  + |   " + "| " +  "userDetails.forename + " | " + "| " +  userDetails.surname + "| "  + "| " + userDetails.email ' );

  console.log ('Respondent email is ....' + respondentUserDetails.email);

  citizenCaseId   = await createNFDCitizenBasicCaseAndFetchResponse(userDetails.email,citizenUserPW, 'data/ccd-nfdiv-sole-citizen-user-base-data.json');
  console.log(' "Citizen Case Created and ID is '+ citizenCaseId) ;

  // Update Case with data from the sole journey
  const responseAfterUpdating = await updateNFDCitizenCaseWithId(userDetails.email,citizenUserPW,citizenCaseId,
    'data/ccd-nfdiv-citizen-update-sole-application.json','citizen-update-application');

  const updatingApp2DetailsOnCase = await updateSoleCitizenCaseWithApp2Details(userDetails.email,citizenUserPW,citizenCaseId,
    'data/ccd-nfdiv-sole-citizen-app2-updated.json',respondentUserDetails.email,'citizen-update-application');

  // Choose to Use HWF as payment mode.
  const awaitingHWF = await updateNFDCitizenCaseWithId(userDetails.email,citizenUserPW,citizenCaseId,
    'data/ccd-nfdiv-citizen-submit-application.json','citizen-submit-application');

  // HWF Accepted
  const hwfAccepted = await updateNFDCaseInCcd(user.CA,citizenCaseId, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

  // Issued
  const awaitingService = await updateNFDCaseInCcd(user.CA,citizenCaseId, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.AOS_AWAITING);

  // Note : In a Sole Citizen/CP Journey , the LINKING of App2 to the case happens only after case has been Issued. ( via NoP Link Email etc)
  // NoP gets sent to Respondent , who then logs in via the UI and proceeds further.

  // invite-applicant2 Event
  // let inviteApp2Response  = await inviteApplicant2(userDetails.email,citizenCaseId,dataLocation = 'data/citizen-invite-applicant-2.json','invite-applicant2');
  // console.log('.....  inviteApplicant2   DONE .... ' );

  // const caseDetailsz  = getCaseDetailsAsSolFor(citizenCaseId);
  // console.log('.....  caseDetailsResponse   is .... ' + caseDetailsz );
  //
  //  const linkObject = detailsToLinkApp2ToCase(caseDetailsz);
  //
  // system-link-applicant2 Event
  //let afterLinking = await systemLinkApplicant2(citizenCaseId, linkObject, dataLocation = 'data/citizen-system-link-applicant2.json','system-link-applicant2');
  //verifyState(afterLinking, 'AwaitingApplicant2Response');
  // console.log('.....  Linking Applicant2 to Case   DONE .... ' + afterLinking);

  // Draft AoS
  //  GET   axios Sending "get" request to: "http://localhost:4452/cases/1664197557589057/event-triggers/draft-aos" data: undefined +1m
  //
  let draftAoSForApplicant2 = soleCitizenApp2DraftAoS(respondentUserDetails.email, citizenCaseId, 'draft-aos', dataLocation = 'data/citizen-sole-case-app2-draftAoS.json');


  // Updates by Applicant 2 on the Citizen UI
  // axios Sending "post" request to: "http://localhost:4452/cases/1664197557589057/events" data: {
  //"event": {
  //     "id": "draft-aos"
  //   },
  //   "data": {
  //     "confirmReadPetition": "Yes"
  //   },

  // Submit AoS


  // Awaiting CO State

  // const shareACase = await updateRoleForCase(user.RS,citizenCaseId,'APPTWOSOLICITOR');
  //
  // // const caseSharedToRespSolicitor = await shareCaseToRespondentSolicitor(user.RSA,caseNumber);
  // // assert.strictEqual(JSON.parse(caseSharedToRespSolicitor).status_message, 'Roles [APPTWOSOLICITOR] from the organisation policies successfully assigned to the assignee.');
  //
  // console.log('~~~~~~~~~ Case with Id ' + citizenCaseId +' has been SUCCESSFULLY SHARED  to Respondent Solicitior');
  //
  // const draftAoS = await updateNFDCaseInCcd(user.RS,citizenCaseId, events.DRAFT_AOS,'data/ccd-draft-aos.json');
  // verifyState(draftAoS, states.AOS_DRAFTED);
  //
  // const submitAoS = await updateNFDCaseInCcd(user.RS,citizenCaseId, events.SUBMIT_AOS,'data/ccd-submit-aos.json');
  // verifyState(submitAoS, states.HOLDING);
  //
  // // To Move case from 20WeekHolding to AwaitingConditionalOrder  .... Call CCD API to mimic the cron job.
  // // and set the dueDate to null ..(See SystemProgressHeldCasesTask in nfdiv-case-api)
  //
  // const awaitingConditionalOrder = await moveFromHoldingToAwaitingCO('data/await-co-data.json',citizenCaseId);
  // assert.strictEqual(JSON.parse(awaitingConditionalOrder).state, 'AwaitingConditionalOrder');
  //
  // // Draft and Submit CO as a Citizen
  //
  // // // Draft CO
  // // const draftConditionalOrder = await updateNFDCaseInCcd(user.SOLS,citizenCaseId, events.SOLS_DRAFT_CO,'data/ccd-draft-co.json');
  // // verifyState(draftConditionalOrder, stateDisplayName.CONDITIONAL_ORDER_DRAFTED);
  // //
  // // // Submit CO
  // // const awaitingLegalAdvisorReferral = await updateNFDCaseInCcd(user.SOLS,citizenCaseId, events.SUBMIT_CO,'data/ccd-submit-co.json');
  // // verifyState(awaitingLegalAdvisorReferral, states.AWAITING_LEGAL_ADVISOR_REFERRAL);
  //
  // // Moves case to Listed;AwaitingPronouncement state
  // const listedAwaitingPronouncement = await updateNFDCaseInCcd(user.LAD,citizenCaseId, events.LEGAL_ADVISOR_MAKE_DECISION,'data/ccd-la-make-decision.json');
  // verifyState(listedAwaitingPronouncement, states.AWAITING_PRONOUNCEMENT);
  //




  // uncomment this for local testing only .
  //displayState(hwfAccepted);

  // Code to delete the created Citizen User after all tests are completed.
  //const userDeleteStatus = deleteUser(userDetails.email);

}).retry(testConfig.TestRetryScenarios);


const displayState = (eventResponse) => {
  console.log('~~~~~~~~~ State of the case is now is  ' + JSON.stringify(eventResponse));
};

const verifyState = (eventResponse, state) => {
  assert.strictEqual(JSON.parse(eventResponse).state, state);
};

function detailsToLinkApp2ToCase(inviteApp2Response) {
  const linkObject = new Object();
  linkObject.accessCode = JSON.parse(inviteApp2Response).case_data.accessCode;
  linkObject.applicant2UserId = JSON.parse(inviteApp2Response).case_data.applicant2UserId;
  linkObject.applicant2Email = JSON.parse(inviteApp2Response).case_data.applicant2Email;
  linkObject.applicant2FirstName = JSON.parse(inviteApp2Response).case_data.applicant2FirstName;
  linkObject.applicant2LastName = JSON.parse(inviteApp2Response).case_data.applicant2LastName;
  return linkObject;
}

function respondentDetails() {
  const respondentUserDetails = new Object();
  respondentUserDetails.id = respondentOrApplicant2Response.id;
  respondentUserDetails.forename = respondentOrApplicant2Response.forename;
  respondentUserDetails.surname = respondentOrApplicant2Response.surname;
  respondentUserDetails.email = respondentOrApplicant2Response.email;
  return respondentUserDetails;
}
