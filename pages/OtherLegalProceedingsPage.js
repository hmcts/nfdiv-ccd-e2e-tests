const I = actor();

module.exports = {

  fields: {
    existingCourtProceedings: '#applicant1LegalProceedings_No',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmitDiv() {
    await I.waitInUrl('solicitor-create-application/solicitor-create-applicationOtherLegalProceedings');
    await I.runAccessibilityTest();
    await I.see('Are there any other legal proceedings relating to the marriage?');
    await I.click(this.fields.existingCourtProceedings);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  },

  async fillFormAndSubmitCivil() {
    await I.waitInUrl('solicitor-create-application/solicitor-create-applicationOtherLegalProceedings');
    await I.runAccessibilityTest();
    await I.see('Are there any other legal proceedings relating to the civil partnership?');
    await I.click(this.fields.existingCourtProceedings);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
