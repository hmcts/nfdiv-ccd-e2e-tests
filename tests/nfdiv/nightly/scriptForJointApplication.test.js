const {paymentType,yesorno,divorceOrDissolution, states} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createNFDCaseInCcd,getCaseDetailsFor} = require('../../../helpers/utils');
const assert = require('assert');

let caseNumber;

Feature('Joint Application ');

Scenario('Solicitor Create Joint Divorce Draft Case', async (I) => {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-sole-citizen-case.json');
  console.log( '..... Citizen Case Created in CCD and the  CaseNumber is ==  ' + caseNumber);

  // let caseResponse =  await getCaseDetailsFor(caseNumber);

  // let orgName = caseResponse.case_data.applicant1SolicitorOrganisationPolicy.Organisation.OrganisationName;
  // let docType = caseResponse.case_data.applicant1DocumentsUploaded[0].value.documentType;
  //
  // assert.strictEqual(orgName,'NFD Solicitor Organisation');
  // assert.strictEqual(docType,'correspondence');


}).retry(testConfig.TestRetryScenarios);


