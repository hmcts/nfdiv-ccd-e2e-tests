const I = actor();

module.exports = {

  fields: {
    petitionerWantsToClaimCostsNo: '#divorceCostsClaim_No',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('solicitor-create-applicationClaimForCosts');
    ////await I.runAccessibilityTest;
    await I.click(this.fields.petitionerWantsToClaimCostsNo);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
