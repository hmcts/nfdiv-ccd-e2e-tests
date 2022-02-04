const I = actor();

module.exports = {

  fields: {
    selectActionDropDown: '#select[id="next-step"]',
    whichApplicantApp1: '#nocWhichApplicant-applicant1',
    areTheyRepresented: '#nocAreTheyRepresented_Yes',
    areTheyDigital: 'nocAreTheyDigital_Yes',
    newSolName: '#newSolName',
    newSolPhoneNum: '#applicant1SolicitorPhone',
    newSolEmail: '#applicant1SolicitorEmail',
    searchOrganisation:'#search-org-text',
    submit: 'button[type="submit"]'

  },

  async fill(caseNumber) {
    await I.waitInUrl('trigger/caseworker-notice-of-change/caseworker-notice-of-changechangeRepresentation-1');
    await I.see('Which applicant');
    await I.click(this.fields.whichApplicantApp1);
    await I.waitForNavigationToComplete(this.fields.submit);

    await I.waitInUrl('trigger/caseworker-notice-of-change/caseworker-notice-of-changechangeRepresentation-2');
    await I.see('Change representation');
    await I.click(this.fields.areTheyRepresented);
    await I.click(this.fields.areTheyDigital);
    await I.fillField(this.fields.newSolName, 'App1 Solicitor Name');
    await I.fillField(this.fields.newSolPhoneNum, 'App1 Solicitor Phone Number');
    await I.fillField(this.fields.newSolEmail, 'solicitorApp1@mailinator.com');
    await I.waitForElement(this.fields.searchOrganisation);
    await I.fillField(this.fields.searchOrganisation, '');
    await I.waitForElement(this.fields.orgResultTable);
    await I.scrollTo(this.fields.orgSelectLink);
    await I.click(this.fields.orgSelectLink);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillApplyForFinalOrderCYA(caseNumber) {
    await I.waitInUrl('trigger/caseworker-notice-of-change/submit');
    await I.see('Check your answers');
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
