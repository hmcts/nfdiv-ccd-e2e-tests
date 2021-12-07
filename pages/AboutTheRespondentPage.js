const I = actor();

module.exports = {

  fields: {
    firstName: '#applicant2FirstName',
    lastName: '#applicant2LastName',
    middleName: '#applicant2MiddleName',
    respondentChangedName: '#applicant2NameDifferentToMarriageCertificate_No',
    respondentGender: '#applicant2Gender',
    applicant2DocumentInWelsh: '#applicant2WelshLanguagePreference-Yes',
    applicant2DocumentInWelshNo:'#applicant2LanguagePreferenceWelsh_No',

    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitForElement(this.fields.firstName);
    await I.runAccessibilityTest();
    await I.fillField(this.fields.firstName, 'Natasha');
    await I.fillField(this.fields.middleName, 'E2E');
    await I.fillField(this.fields.lastName, 'Patrick');
    await I.click(this.fields.respondentChangedName);
    await I.selectOption(this.fields.respondentGender, 'Female');
    await I.wait(1);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
