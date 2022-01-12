const I = actor();

module.exports = {

  fields: {
    firstName: '#applicant2FirstName',
    lastName: '#applicant2LastName',
    middleName: '#applicant2MiddleName',
    respondentChangedName: '#applicant2NameDifferentToMarriageCertificate_No',
    // respondentGender: '#applicant2Gender-female',
    applicant2DocumentInWelsh: '#applicant2WelshLanguagePreference-Yes',
    applicant2DocumentInWelshNo:'#applicant2LanguagePreferenceWelsh_No',
    divorceWho: '#applicant2DivorceWho-husband',

    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(union) {
    var unionUpperCase;
    if(union === divorceOrDissolution.DIVORCE){
      unionUpperCase = union.toUpperCase();
      await I.waitInUrl(`/${unionUpperCase}/NFD/solicitor-create-application/solicitor-create-applicationSolAboutApplicant2`);
      // await I.click(this.fields.divorceWho);
    }else if ( union === divorceOrDissolution.DISSOLUTION){
      unionUpperCase = union.toUpperCase();
      // the switch to DISSOLUTION is not present in the URL Yet , but when done it will be a quick change.
      await I.waitInUrl('/DIVORCE/NFD/solicitor-create-application/solicitor-create-applicationSolAboutApplicant2');
    }
    await I.waitForElement(this.fields.firstName);
    await I.runAccessibilityTest();
    await I.fillField(this.fields.firstName, 'Natasha');
    await I.fillField(this.fields.middleName, 'E2E');
    await I.fillField(this.fields.lastName, 'Patrick');
    await I.click(this.fields.respondentChangedName);
    // await I.click(this.fields.respondentGender);
    await I.wait(1);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
