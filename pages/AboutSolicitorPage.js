const I = actor();

module.exports = {

  fields: {
    solicitorsName: '#applicant1SolicitorName',
    referenceNumer: '#solicitorReference',
    firmName: '#PetitionerSolicitorFirm',
    applicant1SolicitorPhone: '#applicant1SolicitorPhone',
    applicant1SolicitorEmail: '#applicant1SolicitorEmail',
    correspondenceByEmail:'#solicitorAgreeToReceiveEmails-Yes',

    firmDxAddress: '#derivedApplicant1SolicitorAddress',
    yourReferenceNumber: '#D8SolicitorReference',
    phoneNumber: '#PetitionerSolicitorPhone',
    email: '#PetitionerSolicitorEmail',
    solicitorAgree: '#SolicitorAgreeToReceiveEmails-Yes',
    searchOrganisation:'#search-org-text',

    submit: 'button[type="submit"]',
    OrgNamesText: 'Organisation name and address',
    OrgSearchBar: '#search-org-text',
    OrgResultTable: '#organisation-table',
    OrgSelectLink: 'a[title="Select the organisation NFD Solicitor Organisation"]'

  },

  async fillFormAndSubmit() {
    await I.fillField(this.fields.solicitorsName, 'PAPA AJASCO');
    await I.fillField(this.fields.referenceNumer, 'AWS11234');
    await I.fillField(this.fields.applicant1SolicitorPhone, '02086431254');
    await I.fillField(this.fields.applicant1SolicitorEmail, 'sols1@mailinator.com');
    await I.click(this.fields.correspondenceByEmail);
    //await I.fillField(this.fields.firmDxAddress, '100 Reede Road, RM10 8DU');

    await I.waitForElement(this.fields.searchOrganisation);

    // Add negative scenario that will Reject any  organisation that the Applicant1 does NOT belong to.
    //await I.fillField(this.fields.searchOrganisation, 'aat');
    //await I.see("validation error message ");

    await I.fillField(this.fields.searchOrganisation, 'NFD');
    await I.waitForElement(this.fields.OrgResultTable);

    await I.scrollTo(this.fields.OrgSelectLink);
    await I.click(this.fields.OrgSelectLink);
    await I.waitForNavigationToComplete(this.fields.submit);

  }
};
