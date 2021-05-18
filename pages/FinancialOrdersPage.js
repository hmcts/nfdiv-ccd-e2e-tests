const I = actor();

module.exports = {

  fields: {
    petitionerApplyForFinancialOrder: '#financialOrder-No',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('solicitor-createFinancialOrders');
    await I.runAccessibilityTest();
    await I.click(this.fields.petitionerApplyForFinancialOrder);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
