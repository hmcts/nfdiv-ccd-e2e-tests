const I = actor();

const { paymentType } = require('../common/constants');

module.exports = {

  fields: {
    helpWithFeesReference: '#helpWithFeesReferenceNumber',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('solicitor-statement-of-truth-pay-submit/solicitor-statement-of-truth-pay-submitHelpWithFees');
    await I.runAccessibilityTest();
    await I.fillField(this.fields.helpWithFeesReference, 'HWF-365-425');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }
};
