const I = actor();

module.exports = {

  fields: {
    generalReferral:'General referral',
    note:'#note',
    applicationFrom:'#generalApplicationFrom',
    day:'#generalApplicationReferralDate-day',
    month:'#generalApplicationReferralDate-month',
    year:'#generalApplicationReferralDate-year',
    typeOfReferral:'#generalReferralType',
    generalReferralDetails:'#generalReferralDetails',
    feePaymentRequired:'#generalReferralFeeRequired_Yes',
    judge:'#generalOrderJudgeType',
    nameOfJudge:'#generalOrderJudgeName',
    generalOrderDetails:'#generalOrderDetails',
    checkYourAnswers:'Check Your Answers',
    checkInfoBelow:'Check the information below carefully.',
    eventSummary:'#field-trigger-summary',
    eventDescription:'#field-trigger-description',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(caseId) {
    await I.waitInUrl('trigger/caseworker-add-note/caseworker-add-noteaddCaseNotes');
    await I.wait(2);
    await I.runAccessibilityTest();
    await I.see('Add case notes');
    await I.fillField(this.fields.note, 'Adding case note for '+caseId);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillEventSummaryAndDetail(caseId) {
    await I.waitInUrl('trigger/caseworker-add-note/submit');
    await I.wait(4);
    await I.runAccessibilityTest();
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }
};
