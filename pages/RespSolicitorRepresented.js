const I = actor();

module.exports = {

  fields: {
    solicitorNotRepresented: '#respondentSolicitorRepresented-No',
    applicant2_solicitorRepresented: '#applicant2SolicitorRepresented-Yes',
    respondentHomeAddress: '#D8DerivedRespondentHomeAddress',
    respondentServiceAddress:'#D8DerivedRespondentCorrespondenceAddr',
    applicant2_solicitorName: '#applicant2SolicitorName',
    applicant2_solicitorReference: '#applicant2SolicitorReference',
    applicant2_SolicitorPhone: '#applicant2SolicitorPhone',
    applicant2_respondent_email: '#applicant2SolicitorEmail',
    applicant2_solicitorAddress: '#derivedApplicant2SolicitorAddr',
    isDigitalRespondentCase: '#app2SolDigital-Yes',
    isNotDigitalRespondentCase: '#app2SolDigital-No',
    orgNamesText: 'Organisation name and address',
    orgSearchBar: '#search-org-text',
    orgResultTable: '#organisation-table',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {

    await I.waitInUrl('solicitor-createApplicant2ServiceDetails');
    await I.runAccessibilityTest();
    await I.click(this.fields.applicant2_solicitorRepresented);
    await I.fillField(this.fields.applicant2_solicitorName, 'James and Co');
    await I.fillField(this.fields.applicant2_solicitorReference, '123645');
    await I.fillField(this.fields.applicant2_SolicitorPhone, '02086425142');
    await I.fillField(this.fields.applicant2_respondent_email, 'testemail@gmail.com');
    await I.fillField(this.fields.applicant2_solicitorAddress, 'DX Address Solicitor');
    await I.click(this.fields.isNotDigitalRespondentCase);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  },

  async fillFormForRepresentedRespondentAndSubmit() {
    await I.waitInUrl('solicitorCreateRespondentServiceDetails');
    await I.runAccessibilityTest();
    await I.click(this.fields.applicant2_solicitorRepresented);
    await I.wait(1);

    await I.fillField(this.fields.applicant2_solicitorName, 'MAMA AJASCO');
    await I.fillField(this.fields.applicant2_solicitorReference, 'AWS11236');
    await I.fillField(this.fields.respondentSolicitorPhoneNumber, '07712345670');
    await I.fillField(this.fields.applicant2_respondent_email, 'respsolicitor@pettyfrance.com');
    await I.fillField(this.fields.applicant2_solicitorAddress, '101 Reede Road, RM10 8DU');
    await I.click(this.fields.isDigitalRespondentCase);

    await I.waitForText(this.fields.orgNamesText);
    await I.fillField(this.fields.orgSearchBar, 'Divorce-AAT-2');
    await I.waitForElement(this.fields.orgResultTable);
    await I.see('Select');
    await I.click('Select');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
