const I = actor();

const { paymentType } = require('../common/constants');

module.exports = {

  fields: {
    howPaymentMade:'#solPaymentHowToPay-feesHelpWith',
    howPaymentMadePBA:'#solPaymentHowToPay-feePayByAccount',
    submit: 'button[type="submit"]',
    pbaAccountNumber:'#pbaNumbers',
    feeAccountReference:'#feeAccountReference'
  },

  async fillFormAndSubmit() {
    ////await I.runAccessibilityTest;
    await I.wait(3);
    await I.waitInUrl('solicitor-submit-application/solicitor-submit-applicationSolPayment');
    await I.click(this.fields.howPaymentMade);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
  },

  async fillFormPba(){
    ////await I.runAccessibilityTest;
    await I.waitInUrl('solicitor-submit-application/solicitor-submit-applicationSolPayment');
    await I.click(this.fields.howPaymentMadePBA);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
  },

  async fillPbaAccountNumberAndReference() {
    ////await I.runAccessibilityTest;
    await I.wait(this.fields.pbaAccountNumber);
    await I.selectOption(this.fields.pbaAccountNumber, 'PBA0082311');
    await I.fillField(this.fields.feeAccountReference,'PBA-123-322');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
  },

  async fillPbaAccountOrderSummary() {
    await I.waitInUrl('solicitor-submit-application/solicitor-submit-applicationSolPaymentSummary');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
  }

};
