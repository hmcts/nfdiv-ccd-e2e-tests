const I = actor();

const { paymentType } = require('../common/constants');

module.exports = {

  fields: {
    howPaymentMade: 'select[id="solPaymentHowToPay"]',
    enterYourAccountNumber: '#SolicitorFeeAccountNumber',
    //enterYourReference: '#FeeAccountReference',
    helpWithFeesReference: '#helpWithFeesReferenceNumber',

    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    //await I.waitForElement(this.fields.howPaymentMade);
    await I.runAccessibilityTest();
    await I.selectOption(this.fields.howPaymentMade, paymentType.HWF);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
  }
};
