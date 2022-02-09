const {paymentType,yesorno,divorceOrDissolution, states} = require('../../../common/constants');
const testConfig = require('./../../config');
const {createNFDCitizenCase,getCaseDetailsFor} = require('../../../helpers/utils');
const assert = require('assert');

let caseNumber;

Feature('Citizen Journey  ');

Scenario('Citizen Sole Divorce Journey - Basic ', async (I) => {

  caseNumber = await createNFDCitizenCase('data/ccd-nfdiv-joint-draft-case.json');
  console.log( '..... Joint Case Created in CCD , CaseNumber is ==  ' + caseNumber);

  // let caseResponse =  await getCaseDetailsFor(caseNumber);

  // let orgName = caseResponse.case_data.applicant1SolicitorOrganisationPolicy.Organisation.OrganisationName;
  // let docType = caseResponse.case_data.applicant1DocumentsUploaded[0].value.documentType;
  //
  // assert.strictEqual(orgName,'NFD Solicitor Organisation');
  // assert.strictEqual(docType,'correspondence');


}).retry(testConfig.TestRetryScenarios);


