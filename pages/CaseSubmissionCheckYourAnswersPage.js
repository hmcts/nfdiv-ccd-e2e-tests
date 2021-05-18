const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('solicitor-statement-of-truth-pay-submit/submit');
    await I.runAccessibilityTest();
    await I.see('Case submission');
    await I.see('Check your answers');
    await I.see('I am duly authorised by Applicant1 to sign this statement.');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
