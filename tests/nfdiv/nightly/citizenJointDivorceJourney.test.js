const {citizenUserPW,events, user, states} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createCitizenUser,inviteApplicant2,systemLinkApplicant2,
  createNFDJointCitizen,createRespondentCitizenUser,app2CitizenProgressCase,app2CitizenApproves,app1CitizenApproves, app1CitizenAddPayment,
  app1CitizenPaymentMade}
  = require('../../../helpers/citizen-utils');
const assert = require('assert');
const {updateNFDCaseInCcd, moveFromHoldingToAwaitingCO} = require('../../../helpers/utils');

let citizenCaseId;
let soleOrApplicant1Response;
let respondentOrApplicant2Response;

Feature('JOINT Citizen Case');

Scenario('Citizen Case - Joint - Divorce -  Submitted State ', async (I) => {

  // create new citizen user for each Test Run.
  soleOrApplicant1Response = await createCitizenUser();
  respondentOrApplicant2Response = await createRespondentCitizenUser();

  const userDetails = applicant1Details();
  const respondentUserDetails = respondentDetails();

  console.log('APPLICANT_1 |' +  userDetails.email  + '|' + userDetails.forename + '|' + userDetails.surname + '| ');
  console.log('APPLICANT_2 |' +  respondentUserDetails.email  + '|' + respondentUserDetails.forename + '| '+ '|  + respondentUserDetails.surname + '| '');

  citizenCaseId   = await createNFDJointCitizen(userDetails.email,citizenUserPW,respondentUserDetails.email,citizenUserPW, 'data/ccd-nfdiv-joint-citizen-user-base-data.json');
  console.log('Joint Citizen Case ==  '+ citizenCaseId);

  // invite-applicant2 Event
  let inviteApp2Response  = await inviteApplicant2(userDetails.email,citizenCaseId,dataLocation = 'data/citizen-invite-applicant-2.json','invite-applicant2');
  console.log('.....  inviteApplicant2   DONE .... ' );

  const linkObject = detailsToLinkApp2ToCase(inviteApp2Response);

  // system-link-applicant2 Event
  let afterLinking = await systemLinkApplicant2(citizenCaseId, linkObject, dataLocation = 'data/citizen-system-link-applicant2.json','system-link-applicant2');
  verifyState(afterLinking, 'AwaitingApplicant2Response');
  console.log('.....  Linking Applicant2 to Case   DONE .... ');

  // Applicant2 Continues Journey on FE and Updates details on the Case
  let applicant2ProgressCaseResponse = await app2CitizenProgressCase(citizenCaseId, respondentUserDetails.email,
    dataLocation = 'data/citizen-app2-progress-case.json','citizen-applicant2-update-application');
  verifyState(applicant2ProgressCaseResponse, 'AwaitingApplicant2Response');
  console.log('.....  applicant2 Update Application  DONE .... ' );

  // Applicant2 approves by accepting Prayer
  let applicant2Approves = await app2CitizenApproves(citizenCaseId, respondentUserDetails.email,
    dataLocation = 'data/citizen-app2-approves-application.json','applicant2-approve');
  verifyState(applicant2Approves, 'Applicant2Approved');
  console.log('.....  Applicant2 Approves Application  DONE .... ');


  // Applicant1 logs in and is happy with the case details
  let applicant1Approves = await app1CitizenApproves(citizenCaseId, userDetails.email,
    dataLocation = 'data/citizen-app1-approves-application.json','citizen-submit-application');
  verifyState(applicant1Approves, 'AwaitingPayment');
  console.log('.....  Applicant1 Submit DONE .... ' );


  // Applicant1 Add Payment - Citizen Add Payment
  let applicant1AddPayment = await app1CitizenAddPayment(citizenCaseId, userDetails.email,
    dataLocation = 'data/citizen-app1-add-payment.json','citizen-add-payment');
  console.log('.....  Applicant1 Add Payment ...DONE');

  // Applicant1 Payment made
  let applicant1PaymentMade = await app1CitizenPaymentMade(citizenCaseId, userDetails.email,
    dataLocation = 'data/citizen-app1-payment-made.json','citizen-payment-made');
  console.log('.....  Applicant1 Payment Made ...DONE');
  verifyState(applicant1PaymentMade, 'Submitted');

  // IssueApplication takes case to 20w Holding
  const awaitingService = await updateNFDCaseInCcd(user.CA,citizenCaseId, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
  verifyState(awaitingService, states.HOLDING);

  // AwaitingCO
  const awaitingConditionalOrder = await moveFromHoldingToAwaitingCO('data/await-co-data.json',citizenCaseId);
  assert.strictEqual(JSON.parse(awaitingConditionalOrder).state, 'AwaitingConditionalOrder');

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

function applicant1Details() {
  const userDetails = new Object();
  userDetails.id = soleOrApplicant1Response.id;
  userDetails.forename = soleOrApplicant1Response.forename;
  userDetails.surname = soleOrApplicant1Response.surname;
  userDetails.email = soleOrApplicant1Response.email;
  return userDetails;
}

function respondentDetails() {
  const respondentUserDetails = new Object();
  respondentUserDetails.id = respondentOrApplicant2Response.id;
  respondentUserDetails.forename = respondentOrApplicant2Response.forename;
  respondentUserDetails.surname = respondentOrApplicant2Response.surname;
  respondentUserDetails.email = respondentOrApplicant2Response.email;
  return respondentUserDetails;
}
