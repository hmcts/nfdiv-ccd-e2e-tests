const I = actor();

module.exports = {

  fields: {
    selectActionDropDown: '#select[id="next-step"]',
    whichApplicantApp1: '#nocWhichApplicant-applicant1',
    areTheyRepresentedYes: '#nocAreTheyRepresented_Yes',
    areTheyRepresentedNo: '#nocAreTheyRepresented_No',
    areTheyDigital: '#nocAreTheyDigital_Yes',
    newSolName: '#applicant1SolicitorName',
    newSolPhoneNum: '#applicant1SolicitorPhone',
    newSolEmail: '#applicant1SolicitorEmail',
    searchOrgText: 'Search for an organisation',
    searchOrganisation:'#search-org-text',
    orgResultTable: '#organisation-table',
    orgSelectUnLink: 'a[title="Clear organisation selection for NFD Solicitor Organisation"]',
    orgSelectLink: 'a[title="Select the organisation NFD E2E Test Solicitor Organisation Ltd"]',
    submit: 'button[type="submit"]',
    correspondenceAddress: '#applicant1CorrespondenceAddress_applicant1CorrespondenceAddress_postcodeInput',
    addressButton: '#applicant1CorrespondenceAddress_applicant1CorrespondenceAddress_postcodeLookup > button',
    addressOption: 'select[id="applicant1CorrespondenceAddress_applicant1CorrespondenceAddress_addressList"]'

  },

  async fill(caseNumber) {
    await I.waitInUrl('trigger/caseworker-notice-of-change/caseworker-notice-of-changechangeRepresentation-1');
    await I.see('Which applicant');
    await I.click(this.fields.whichApplicantApp1);
    await I.click(this.fields.areTheyRepresentedYes);
    await I.click(this.fields.areTheyDigital);
    await I.fillField(this.fields.newSolName, 'App1 Solicitor Name');
    await I.fillField(this.fields.newSolPhoneNum, '022871653482');
    await I.fillField(this.fields.newSolEmail, 'solicitorApp1@mailinator.com');
    await I.wait(3);
    await I.click(this.fields.orgSelectUnLink);
    await I.wait(3);
    await I.fillField(this.fields.searchOrganisation, 'NFD E2E');
    await I.waitForElement(this.fields.orgResultTable);
    await I.click(this.fields.orgSelectLink);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillRemove(caseNumber) {
    await I.waitInUrl('trigger/caseworker-notice-of-change/caseworker-notice-of-changechangeRepresentation-1');
    await I.see('Which applicant');
    await I.click(this.fields.whichApplicantApp1);
    await I.click(this.fields.areTheyRepresentedNo);
    await I.click(this.fields.correspondenceAddress);
    await I.fillField(this.fields.correspondenceAddress, 'SW1A 1BJ');
    await I.wait(3);
    await I.click(this.fields.addressButton);
    await I.wait(3);
    await I.waitForElement(this.fields.addressOption);
    await I.wait(3);
    await I.selectOption(this.fields.addressOption, '22 St. James\'s Palace, London');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillApplyForNOCCYA(caseNumber) {
    await I.waitInUrl('trigger/caseworker-notice-of-change/submit');
    await I.see('Check your answers');
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
