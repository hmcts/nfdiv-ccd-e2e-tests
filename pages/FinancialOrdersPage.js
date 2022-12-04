const I = actor();

module.exports = {

  fields: {
    applicant1FinancialOrderNo: '#applicant1FinancialOrder_No',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('/solicitor-create-application/solicitor-create-applicationFinancialOrders');
    ////await I.runAccessibilityTest;
    await I.click(this.fields.applicant1FinancialOrderNo);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
