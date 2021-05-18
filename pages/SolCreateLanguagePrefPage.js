const I = actor();

module.exports = {

  fields: {
    existingLanguagePreferences: '#languagePreferenceWelsh-No',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.runAccessibilityTest();
    await I.click(this.fields.existingLanguagePreferences);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
