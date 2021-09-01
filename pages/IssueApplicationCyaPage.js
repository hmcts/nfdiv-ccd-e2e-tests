const I = actor();

module.exports = {

  fields: {
    eventSummary: '#field-trigger-summary',
    eventDescription:'#field-trigger-description',
    submit: 'button[type="submit"]'
  },

  async verifyCyaDetails() {
    await I.wait(7);
    await I.waitInUrl('caseworker-issue-application/submit');
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.see('The applicant\'s full name as on marriage certificate');
    await I.see('The respondent full name as on marriage certificate');
    await I.see('Place of marriage');
    await I.runAccessibilityTest();
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(5);
  }
};
