const I = actor();

module.exports = {

  fields: {
    existingCourtProceedings: '#legalProceedings-No',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('solicitor-createOtherLegalProceedings');
    await I.runAccessibilityTest();
    await I.click(this.fields.existingCourtProceedings);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
