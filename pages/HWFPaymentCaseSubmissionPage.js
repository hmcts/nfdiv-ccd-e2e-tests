const I = actor();

const { paymentType } = require('../common/constants');

module.exports = {

  fields: {
    helpWithFeesReference: '#applicant1HWFReferenceNumber',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('solicitor-submit-application/solicitor-submit-applicationHelpWithFees');
    ////await I.runAccessibilityTest;
    await I.fillField(this.fields.helpWithFeesReference, 'HWF-325-326');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }
};
