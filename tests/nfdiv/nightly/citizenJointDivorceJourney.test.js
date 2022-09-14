const {citizenUserPW,events, user, states} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createCitizenUser,deleteUser,updateNFDCitizenCaseWithId,inviteApplicant2,systemLinkApplicant2,
  createNFDJointCitizenBasic,createNFDCitizenBasicCaseAndFetchResponse,createRespondentCitizenUser} = require('../../../helpers/citizen-utils');
const assert = require('assert');
const {updateNFDCaseInCcd} = require('../../../helpers/utils');

let citizenCaseId;
let soleOrApplicant1Response;
let respondentOrApplicant2Response;

Feature('Create a JOINT Citizen Case');


Scenario('Citizen JOINT Divorce Journey', async (I) => {

  // create new citizen user for each Test Run.
  soleOrApplicant1Response = await createCitizenUser();
  respondentOrApplicant2Response = await createRespondentCitizenUser();

  const userDetails = new Object();
  userDetails.id = soleOrApplicant1Response.id;
  userDetails.forename = soleOrApplicant1Response.forename;
  userDetails.surname = soleOrApplicant1Response.surname;
  userDetails.email = soleOrApplicant1Response.email;


  const respondentUserDetails  = new Object();
  respondentUserDetails.id = respondentOrApplicant2Response.id;
  respondentUserDetails.forename = respondentOrApplicant2Response.forename;
  respondentUserDetails.surname = respondentOrApplicant2Response.surname;
  respondentUserDetails.email = respondentOrApplicant2Response.email;

  console.log('APPLICANT_1 |' +  userDetails.email  + '|' + userDetails.forename + '|' + userDetails.surname + '| ');
  console.log('APPLICANT_2 |' +  respondentUserDetails.email  + '|' + respondentUserDetails.forename + '| '+ '|  + respondentUserDetails.surname + '| '');

  citizenCaseId   = await createNFDJointCitizenBasic(userDetails.email,citizenUserPW,respondentUserDetails.email,citizenUserPW, 'data/ccd-nfdiv-joint-citizen-user-base-data.json');
  console.log('Joint Citizen Case Created and Case ID is '+ citizenCaseId);

  // invite-applicant2 Event
  let response = await inviteApplicant2(userDetails.email,citizenCaseId,dataLocation = 'data/citizen-invite-applicant-2.json','invite-applicant2');
  console.log('..... After Call to inviteApplicant2.... ...' );

  // system-link-applicant2 Event
  let afterLinking = await systemLinkApplicant2(citizenCaseId,dataLocation = 'data/citizen-system-link-applicant2.json','system-link-applicant2');

  // ie. app2 use Invitation url and logins and enters access-code , caseRef .

  // app2 accepts invites, logs in and does happy path &&  submits - state moves to AwaitingApplicant1Response

  // app1 logs in and does Happy Path accepts the info done by app2 above and Submits.  State now moves to 'Submitted'

  // Update Case with data from the sole journey
  // const responseAfterUpdating = await updateNFDCitizenCaseWithId(userDetails.email,citizenUserPW,citizenCaseId,
  //   'data/ccd-nfdiv-citizen-update-sole-application.json','citizen-update-application');

  // Choose to Use HWF as payment mode.
  // const awaitingHWF = await updateNFDCitizenCaseWithId(userDetails.email,citizenUserPW,citizenCaseId,
  //   'data/ccd-nfdiv-citizen-submit-application.json','citizen-submit-application');

  // HWF Accepted
  // const hwfAccepted = await updateNFDCaseInCcd(user.CA,citizenCaseId, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  // verifyState(hwfAccepted, states.SUBMITTTED);

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


