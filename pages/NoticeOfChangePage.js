const I = actor();

module.exports = {

  fields: {
    selectActionDropDown: '#select[id="next-step"]',
    whichApplicantApp1: '#nocWhichApplicant-applicant1',
    areTheyRepresented: '#nocAreTheyRepresented_Yes',
    areTheyDigital: '#nocAreTheyDigital_Yes',
    newSolName: '#applicant1SolicitorName',
    newSolPhoneNum: '#applicant1SolicitorPhone',
    newSolEmail: '#applicant1SolicitorEmail',
    searchOrgText: 'Search for an organisation',
    searchOrganisation:'#search-org-text',
    orgResultTable: '#organisation-table',
    orgSelectUnLink: 'a[title="Clear organisation selection for NFD Solicitor Organisation"]',
    orgSelectLink: 'a[title="Select the organisation DivRespondentSolicitorFirm"]',
    submit: 'button[type="submit"]'

  },

  async fill(caseNumber) {
    await I.waitInUrl('trigger/caseworker-notice-of-change/caseworker-notice-of-changechangeRepresentation-1');
    await I.see('Which applicant');
    await I.click(this.fields.whichApplicantApp1);
    await I.click(this.fields.areTheyRepresented);
    await I.click(this.fields.areTheyDigital);
    await I.fillField(this.fields.newSolName, 'App1 Solicitor Name');
    await I.fillField(this.fields.newSolPhoneNum, '022871653482');
    await I.fillField(this.fields.newSolEmail, 'solicitorApp1@mailinator.com');
    await I.wait(3);
    await I.click(this.fields.orgSelectUnLink);
    await I.wait(3);
    await I.fillField(this.fields.searchOrganisation, 'DivRespondentSolicitorFirm');
    await I.waitForElement(this.fields.orgResultTable);
    await I.click(this.fields.orgSelectLink);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillApplyForFinalOrderCYA(caseNumber) {
    await I.waitInUrl('trigger/caseworker-notice-of-change/submit');
    await I.see('Check your answers');
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
