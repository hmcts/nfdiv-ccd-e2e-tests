const {citizenUserPW,events, user, states} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createCitizenUser,deleteUser,updateNFDCitizenCaseWithId,createNFDCitizenBasicCaseAndFetchResponse,createRespondentCitizenUser} = require('../../../helpers/citizen-utils');
const assert = require('assert');
const {updateNFDCaseInCcd} = require('../../../helpers/utils');

let citizenCaseId;
let response;
let respondentOrApplicant2Response;



Feature('Create a Citizen Case in CCD');


Scenario('Citizen Sole Divorce Journey - using Divorce,Documents,PBA ', async (I) => {

  // create new citizen user for each Test Run.
  response = await createCitizenUser();
  respondentOrApplicant2Response = await createRespondentCitizenUser();

  const userDetails = new Object();
  userDetails.id = response.id;
  userDetails.forename = response.forename;
  userDetails.surname = response.surname;
  userDetails.email = response.email;


  const respondentUserDetails  = new Object();
  respondentUserDetails.id = respondentOrApplicant2Response.id;
  respondentUserDetails.forename = respondentOrApplicant2Response.forename;
  respondentUserDetails.surname = respondentOrApplicant2Response.surname;
  respondentUserDetails.email = respondentOrApplicant2Response.email;

  console.log('| +  userDetails.email  + |   " + "| " +  "userDetails.forename + " | " + "| " +  userDetails.surname + "| "  + "| " + userDetails.email ' );


  citizenCaseId   = await createNFDCitizenBasicCaseAndFetchResponse(userDetails.email,citizenUserPW, 'data/ccd-nfdiv-sole-citizen-user-base-data.json');
  console.log(' "Citizen Case Created and ID is '+ citizenCaseId) ;

  // Update Case with data from the sole journey
  const responseAfterUpdating = await updateNFDCitizenCaseWithId(userDetails.email,citizenUserPW,citizenCaseId,
    'data/ccd-nfdiv-citizen-update-sole-application.json','citizen-update-application');

  // Choose to Use HWF as payment mode.
  const awaitingHWF = await updateNFDCitizenCaseWithId(userDetails.email,citizenUserPW,citizenCaseId,
    'data/ccd-nfdiv-citizen-submit-application.json','citizen-submit-application');

  // HWF Accepted
  const hwfAccepted = await updateNFDCaseInCcd(user.CA,citizenCaseId, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
  verifyState(hwfAccepted, states.SUBMITTTED);

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


