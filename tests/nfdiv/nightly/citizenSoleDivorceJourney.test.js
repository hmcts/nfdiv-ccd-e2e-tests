const {paymentType,yesorno,divorceOrDissolution, states,citizenUserPW} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createCitizenUser,createNFDCitizenBasicCaseAndFetchResponse, deleteUser,updateNFDCitizenCaseWithId} = require('../../../helpers/utils');
const assert = require('assert');

let citizenCaseId;
let response;

Feature('Citizen Journey  ');

Scenario('Citizen Sole Divorce Journey - Basic ', async (I) => {

  // create new citizen user for each Test Run.
  response = await createCitizenUser();

  const userDetails = new Object();
  userDetails.id = response.id;
  userDetails.forename = response.forename;
  userDetails.surname = response.surname;
  userDetails.email = response.email;

  console.log(" |  |"+  userDetails.email  + "| " + userDetails.forename + "| " +  userDetails.surname + "| " + userDetails.email +" | |");

  const citizenCaseId   = await createNFDCitizenBasicCaseAndFetchResponse(userDetails.email,citizenUserPW, 'data/ccd-nfdiv-sole-citizen-user-base-data.json');
  console.log(" |Citizen Case Created with ID of .....  |"+  citizenCaseId ) ;

  const responseAfterUpdating = await updateNFDCitizenCaseWithId(userDetails.email,citizenUserPW,citizenCaseId,'data/ccd-nfdiv-citizen-update-sole-application.json','citizen-update-application');

  console.log(`..After Updating case.........` + responseAfterUpdating );


  // Code to delete the created Citizen User after the test has completed
  // const userDeleteStatus = deleteUser(userDetails.email);

}).retry(testConfig.TestRetryScenarios);







