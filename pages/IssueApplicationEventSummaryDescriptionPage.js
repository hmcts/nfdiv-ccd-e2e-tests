const I = actor();

module.exports = {

  fields: {
    eventSummary: '#field-trigger-summary',
    eventDescription:'#field-trigger-description',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('caseworker-issue-application/submit');
    await I.waitForElement(this.fields.eventSummary);
    await I.runAccessibilityTest();
    await I.fillField(this.fields.eventSummary, 'Event Summary - Issue Application');
    await I.fillField(this.fields.eventDescription, 'Event Description - Issue Application');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }
};
