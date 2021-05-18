const I = actor();

const { paymentType } = require('../common/constants');

module.exports = {

  fields: {
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(paymentMethod) {
    await I.waitInUrl('solicitor-statement-of-truth-pay-submit/solicitor-statement-of-truth-pay-submitSolPaymentSummary');
    await I.waitForText('Case submission');
    await I.runAccessibilityTest();
    if (paymentMethod === paymentType.FEE_ACCOUNT) {
      await I.see('Your fee account reference: Next case submitted');
    } else if (paymentMethod === paymentType.HWF) {
      await I.see('Help with fee reference: HWF-365');
    }
    await I.wait(1);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
