const I = actor();

const { paymentType } = require('../common/constants');

module.exports = {

  fields: {
    howPaymentMade:'select[id="solPaymentHowToPay"]',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.runAccessibilityTest();
    // solicitor-submit-application/solicitor-submit-applicationSolPayment
    await I.waitInUrl('solicitor-submit-application/solicitor-submit-applicationSolPayment');
    await I.wait(this.fields.howPaymentMade);
    await I.selectOption(this.fields.howPaymentMade, paymentType.HWF);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
  }
};
