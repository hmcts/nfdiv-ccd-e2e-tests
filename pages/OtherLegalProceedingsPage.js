const I = actor();

module.exports = {

  fields: {
    existingCourtProceedings: '#applicant1LegalProceedings_No',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('solicitor-create-application/solicitor-create-applicationOtherLegalProceedings');
    await I.runAccessibilityTest();
    await I.see('Are there any existing or previous court proceedings relating to the marriage?');
    await I.click(this.fields.existingCourtProceedings);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
