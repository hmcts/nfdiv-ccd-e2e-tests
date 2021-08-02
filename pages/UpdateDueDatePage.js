const I = actor();

module.exports = {

  fields: {
    day:'#dueDate-day',
    month:'#dueDate-month',
    year:'#dueDate-year',
    eventSummary:'#field-trigger-summary',
    eventDescription:'#field-trigger-description',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('trigger/caseworker-update-due-date/caseworker-update-due-dateupdateDueDate');
    await I.wait(2);
    await I.runAccessibilityTest();
    await I.see('Update due date');
    await I.fillField(this.fields.day, '23');
    await I.fillField(this.fields.month, '07');
    await I.fillField(this.fields.year, '2000');
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillEventSummaryAndDetail(caseId) {
    await I.waitInUrl('trigger/caseworker-update-due-date/submit');
    await I.wait(4);
    await I.runAccessibilityTest();
    await I.fillField(this.fields.eventSummary, 'Update Due Date  Event summary for '+caseId);
    await I.fillField(this.fields.eventDescription, 'Update Due Date  Event Desc for '+caseId);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }
};
