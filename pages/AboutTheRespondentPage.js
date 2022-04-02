const {divorceOrDissolution, yesorno} = require('../common/constants');
const I = actor();
const testConfig = require('../tests/config');

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

  async fillFormAndSubmit(union, soleOrJoint) {

    if (testConfig.TestForCrossBrowser) {
      await I.wait(8);
    }

    await I.waitInUrl('/solicitor-create-application/solicitor-create-applicationSolAboutApplicant2');
    await I.waitForElement(this.fields.firstName);
    await I.fillField(this.fields.firstName, 'Natasha');
    await I.fillField(this.fields.middleName, 'E2E');
    await I.fillField(this.fields.lastName, 'Patrick');
    //only for sole applications
    await I.click(this.fields.respondentChangedName);


    await I.wait(1);
    await I.runAccessibilityTest();
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
