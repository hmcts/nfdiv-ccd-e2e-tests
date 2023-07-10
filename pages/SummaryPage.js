const I = actor();

module.exports = {
  fields: {
    submit: 'button[type="submit"]'
  },
  async fillFormAndSubmit() {
    await I.fillField('#field-trigger-summary','Submit Case');
    await I.fillField('#field-trigger-description','Progress the case to next stage');
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
