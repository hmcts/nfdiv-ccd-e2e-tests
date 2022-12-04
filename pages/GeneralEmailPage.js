const I = actor();

//const { paymentType,eventDisplayName } = require('../common/constants');

module.exports = {

  fields: {
    emailParties:'#generalEmailParties',
    otherRecipientEmail:'#generalEmailOtherRecipientEmail',
    otherRecipientName:'#generalEmailOtherRecipientName',
    details:'#generalEmailDetails',
    CreateGeneralEmail_Msg:'Create general email',
    checkYourAnswers:'Check Your Answers',
    checkInfoBelow:'Check the information below carefully.',
    eventSummary:'#field-trigger-summary',
    eventDescription:'#field-trigger-description',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(caseId) {
    await I.waitInUrl('/trigger/caseworker-create-general-email/caseworker-create-general-emailcreateGeneralEmail');
    await I.wait(2);
    ////await I.runAccessibilityTest;
    await I.see(this.fields.CreateGeneralEmail_Msg);
    await I.selectOption(this.fields.emailParties,'Other') ;
    await I.wait(2);
    await I.fillField(this.fields.otherRecipientEmail, 'email-'+caseId+'@gmail.com');
    await I.fillField(this.fields.otherRecipientName, 'Jon Holmes');
    await I.fillField(this.fields.details, 'Details for Jon Holmes');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  async fillEventSummaryAndDetail(caseId) {
    await I.waitInUrl('/trigger/caseworker-create-general-email/submit');
    await I.wait(4);
    ////await I.runAccessibilityTest;
    await I.see(this.fields.CreateGeneralEmail_Msg);
    await I.fillField(this.fields.eventSummary, 'event summary for '+caseId);
    await I.fillField(this.fields.eventDescription, 'event desc for '+caseId);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  async cyaGeneralEmail() {
    await I.waitInUrl('/caseworker-create-general-email/submit');
    await I.wait(4);
    ////await I.runAccessibilityTest;
    await I.see(this.fields.CreateGeneralEmail_Msg);
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);

  }
};
