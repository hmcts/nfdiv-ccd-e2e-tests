const I = actor();

module.exports = {

  fields: {
    generalReferral:'General referral',
    generalApplicationReferral:'#generalReferralReason-generalApplicationReferral',
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
    await I.waitInUrl('trigger/caseworker-general-referral/caseworker-general-referralgeneralReferral');
    await I.wait(2);
    await I.runAccessibilityTest();
    await I.select(this.fields.generalApplicationReferral);
    await I.see('Application from');
    await I.wait(2);
    await I.selectOption(this.fields.applicationFrom,'Respondent / Respondent\'s Solicitor');
    await I.fillField(this.fields.day, '24');
    await I.fillField(this.fields.month, '07');
    await I.fillField(this.fields.year, '2021');
    await I.click(this.fields.applicant);
    await I.selectOption(this.fields.typeOfReferral,'Order on filing of Answers');
    await I.fillField(this.fields.generalReferralDetails,'General Referral Details is required for Certain judges ....');
    await I.click(this.fields.feePaymentRequired);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  async fillEventSummaryAndDetail(caseId) {
    await I.waitInUrl('trigger/caseworker-general-referral/submit');
    await I.wait(4);
    await I.runAccessibilityTest();
    await I.fillField(this.fields.eventSummary, 'General Refferal  Event summary for '+caseId);
    await I.fillField(this.fields.eventDescription, 'General Referral  Event Desc for '+caseId);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }
};
