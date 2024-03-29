const I = actor();

const { paymentType,eventDisplayName } = require('../common/constants');

module.exports = {

  fields: {
    hwfReferenceOk: '#hwfCodeValidForFullAmount_Yes',
    hwfEventSummary:'#field-trigger-summary',
    hwfEventDescription:'#field-trigger-description',
    HWF_Message:'HWF application accepted',
    HWF_Refused:'HWF refused',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(caseId) {
    await I.waitInUrl('/trigger/caseworker-hwf-application-accepted/submit');
    await I.wait(4);
    ////await I.runAccessibilityTest;
    await I.see(this.fields.HWF_Message);
    await I.fillField(this.fields.hwfEventSummary, 'Event Summary for ' +caseId) ;
    await I.fillField(this.fields.hwfEventDescription, 'Event Description for ' +caseId);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },
  async fillHwfRefusedEventNotes(caseId) {
    await I.waitInUrl('/trigger/caseworker-hwf-refused/submit');
    await I.wait(4);
    ////await I.runAccessibilityTest;
    await I.see(this.fields.HWF_Refused);
    await I.fillField(this.fields.hwfEventSummary, 'Event Summary for ' +caseId) ;
    await I.fillField(this.fields.hwfEventDescription, 'Event Description for ' +caseId);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },
  async hwfAcceptedSaveAndContinue(caseId) {
    await I.waitInUrl('/trigger/caseworker-hwf-application-accepted/submit');
    await I.wait(4);
    ////await I.runAccessibilityTest;
    await I.see(this.fields.HWF_Message);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }

};
