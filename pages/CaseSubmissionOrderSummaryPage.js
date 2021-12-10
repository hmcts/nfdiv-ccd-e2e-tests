const I = actor();

const { paymentType } = require('../common/constants');

module.exports = {

  fields: {
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(paymentMethod) {
    await I.waitInUrl('solicitor-submit-application/solicitor-submit-applicationSolPaymentSummary');
    await I.waitForText('Sign and submit');
    await I.runAccessibilityTest();
    if (paymentMethod === paymentType.FEE_ACCOUNT) {
      await I.see('Your fee account reference:');
    } else if (paymentMethod === paymentType.HWF) {
      await I.see('Help with fee reference: HWF-325-326');
    }
    await I.wait(1);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
