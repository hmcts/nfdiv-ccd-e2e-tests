const {createNFDCaseInCcd,updateNFDCaseInCcd,updateRoleForCase} = require('helpers/utils');

/**
  Common Functions used across tests are placed here.
*/
class UsefulFunction {

  constructor() {
  }
  async createSharedCase(){

    let caseNumber;

    caseNumber =  createNFDCaseInCcd('data/ccd-nfdiv-sole-draft-case.json');
    console.log( '.....caseCreated in CCD , caseId is ==  ' + caseNumber);
    return caseNumber;

    const awaitingHWF =  updateNFDCaseInCcd(user.SOLS,caseNumber, events.SOLICITOR_SUBMIT_APPLICATION,'data/ccd-nfd-draft-accept-sot-and-use-hwf.json');
    verifyState(awaitingHWF, states.AWAITING_HWF);

    const hwfAccepted = updateNFDCaseInCcd(user.CW,caseNumber, events.CASEWORKER_HWF_APPLICATION_ACCEPTED,'data/ccd-nfd-hwf-accepted.json');
    verifyState(hwfAccepted, states.SUBMITTTED);

    const issueAosPack = updateNFDCaseInCcd(user.CA,caseNumber, events.ISSUED_FROM_SUBMITTED,'data/ccd-update-place-of-marriage.json');
    verifyState(issueAosPack, states.AOS_AWAITING);

    const updatedRes = updateRoleForCase(user.CA,caseNumber,'APPTWOSOLICITOR');

    console.log( '.....caseCreated in CCD and is SHARED to RespSolicitor , caseNumber is ==  ' + caseNumber);

    return caseNumber;
  }

}
