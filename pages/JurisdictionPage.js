const I = actor();

module.exports = {

  fields: {
    legalConnections_1: '#jurisdictionConnections-G',
    legalConnections_2: '#jurisdictionConnections-H',
    legalConnections_3: '#jurisdictionConnections-I',

    submit: 'button[type="submit"]'
  },

  async selectLegalActionsAndSubmit() {
    await I.waitForText('Jurisdiction - Apply for a divorce');
    await I.runAccessibilityTest();
    await I.click(this.fields.legalConnections_1);
    await I.click(this.fields.legalConnections_2);
    await I.click(this.fields.legalConnections_3);

    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
