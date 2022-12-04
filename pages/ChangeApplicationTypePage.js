const I = actor();

module.exports = {

  fields: {
    generalReferral:'General referral',
    applicationType:'#applicationType',
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
    await I.waitInUrl('trigger/caseworker-update-application-type/caseworker-update-application-typeupdateApplicationType');
    await I.wait(2);
    ////await I.runAccessibilityTest;
    await I.see('Change application type');
    await I.selectOption(this.fields.applicationType, 'Joint Application');
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async updateApplicationTypeSubmit(caseId) {
    await I.waitInUrl('trigger/caseworker-update-application-type/submit');
    await I.wait(4);
    ////await I.runAccessibilityTest;
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }
};
