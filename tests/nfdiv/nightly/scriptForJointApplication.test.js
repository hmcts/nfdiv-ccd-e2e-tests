const {paymentType,yesorno,divorceOrDissolution, states} = require('../../../common/constants');
const testconfig = require('./../../config');
const {createNFDCaseInCcd,getCaseDetailsFor} = require('../../../helpers/utils');

let caseNumber;

Feature('Joint Application ');

Scenario('Solicitor Create Joint Divorce Draft Case', async (I) => {

  caseNumber = await createNFDCaseInCcd('data/ccd-nfdiv-joint-draft-case.json');
  console.log( '..... Joint Case Created in CCD , CaseNumber is ==  ' + caseNumber);

  console.log('GET Case Details ... returns ...' + await getCaseDetailsFor(caseNumber));

}).retry(testconfig.TestRetryScenarios);


