const I = actor();

module.exports = {

  fields: {
    solicitorNotRepresented: '#respondentSolicitorRepresented-No',
    applicant2SolicitorRepresented: '#applicant2SolicitorRepresented_Yes',
    respondentServiceAddress:'#D8DerivedRespondentCorrespondenceAddr',
    applicant2SolicitorName: '#applicant2SolicitorName',
    applicant2SolicitorReference: '#applicant2SolicitorReference',
    applicant2SolicitorPhone: '#applicant2SolicitorPhone',
    applicant2SolicitorEmail: '#applicant2SolicitorEmail',
    applicant2SolicitorAddress: '#applicant2SolicitorAddress',
    searchOrganisation:'#search-org-text',
    orgNamesText: 'Organisation name and address',
    orgSearchBar: '#search-org-text',
    orgResultTable: '#organisation-table',
    orgSelectLink: 'a[title="Select the organisation DivRespondentSolicitorFirm"]',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {

    await I.waitInUrl('solicitor-create-applicationApplicant2ServiceDetails');
    await I.runAccessibilityTest();
    await I.click(this.fields.applicant2SolicitorRepresented);
    await I.fillField(this.fields.applicant2SolicitorName, 'James and Co');
    await I.fillField(this.fields.applicant2SolicitorReference, '123645');
    await I.fillField(this.fields.applicant2SolicitorPhone, '02086425142');
    await I.fillField(this.fields.applicant2SolicitorEmail, 'kasi.subramaniam@solirius.com');
    await I.fillField(this.fields.applicant2SolicitorAddress, '101 Reede Road, RM10 8DU');

    await I.waitForElement(this.fields.searchOrganisation);
    await I.fillField(this.fields.searchOrganisation, 'DivRespondentSolicitorFirm');
    await I.waitForElement(this.fields.orgResultTable);
    await I.scrollTo(this.fields.orgSelectLink);
    await I.click(this.fields.orgSelectLink);

    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  },

  async fillFormForRepresentedRespondentAndSubmit() {
    await I.waitInUrl('solicitorCreateRespondentServiceDetails');
    await I.runAccessibilityTest();
    await I.click(this.fields.applicant2SolicitorRepresented);
    await I.wait(1);

    await I.fillField(this.fields.applicant2SolicitorName, 'MAMA AJASCO');
    await I.fillField(this.fields.applicant2SolicitorReference, 'AWS11236');
    await I.fillField(this.fields.applicant2SolicitorEmail, 'respsolicitor@pettyfrance.com');
    await I.fillField(this.fields.applicant2SolicitorAddress, '101 Reede Road, RM10 8DU');

    await I.waitForText(this.fields.orgNamesText);
    await I.fillField(this.fields.orgSearchBar, 'Divorce-AAT-2');
    await I.waitForElement(this.fields.orgResultTable);
    await I.see('Select');
    await I.click('Select');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
