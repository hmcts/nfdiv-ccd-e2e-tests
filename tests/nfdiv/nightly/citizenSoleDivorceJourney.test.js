const {paymentType,yesorno,divorceOrDissolution, states,} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createCitizenUser,createNFDCitizenBasicCaseAndFetchResponse, deleteUser} = require('../../../helpers/utils');
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
  userDetails.password = response.password;

  console.log(" |  |"+  userDetails.email  + "| " + userDetails.forename + "| " +  userDetails.surname + "| " + userDetails.email +" | |");

  const citizenCaseId   = await createNFDCitizenBasicCaseAndFetchResponse(userDetails.email,'Testing123', 'data/ccd-nfdiv-sole-citizen-user-base-data.json');
  console.log(" |Citizen Case Created with ID of .....  |"+  citizenCaseId ) ;

  // Code to delete the created Citizen User after the test has completed
  const userDeleteStatus = deleteUser(userDetails.email);

}).retry(testConfig.TestRetryScenarios);







