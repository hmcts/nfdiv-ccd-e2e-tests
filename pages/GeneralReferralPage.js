const I = actor();

module.exports = {

  fields: {
    generalReferral:'General referral',
    generalApplicationReferral:'#generalReferralReason-caseworkerReferral',
    urgentReferralRequiredYes:'#generalReferralUrgentCase_Yes',
    generalReferralUrgentCaseReason:'#generalReferralUrgentCaseReason',
    applicationFrom:'#generalApplicationFrom',
    day:'#generalApplicationReferralDate-day',
    month:'#generalApplicationReferralDate-month',
    year:'#generalApplicationReferralDate-year',
    furtherDetailsJudge:'#generalReferralJudgeDetails',
    furtherDetailsLegalAdvisor:'#generalReferralJudgeOrLegalAdvisorDetails',
    typeOfReferral:'#generalReferralType',
    generalReferralDetails:'#generalReferralDetails',
    feePaymentRequired:'#generalReferralFeeRequired_Yes',
    feePaymentRequiredNo:'#generalReferralFeeRequired_No',
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
    ////await I.runAccessibilityTest;
    await I.click(this.fields.generalApplicationReferral);
    await I.wait(2);
    await I.click(this.fields.urgentReferralRequiredYes);
    await I.wait(2);
    await I.fillField(this.fields.generalReferralUrgentCaseReason, 'Urgent Reason description');
    await I.fillField(this.fields.day, '24');
    await I.fillField(this.fields.month, '07');
    await I.fillField(this.fields.year, '2021');
    await I.selectOption(this.fields.typeOfReferral,'Order on filing of Answers');
    await I.fillField(this.fields.furtherDetailsLegalAdvisor, 'Legal Advisor Further Details 2021');
    await I.click(this.fields.feePaymentRequired);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
    await I.waitInUrl('/caseworker-general-referral/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitGeneralReferral(caseId) {
    await I.waitInUrl('trigger/caseworker-general-referral/caseworker-general-referralgeneralReferral');
    await I.wait(2);
    //////await I.runAccessibilityTest;
    await I.click(this.fields.generalApplicationReferral);
    await I.click(this.fields.urgentReferralRequiredYes);
    await I.fillField(this.fields.generalReferralUrgentCaseReason, 'Urgent Reason description');
    await I.fillField(this.fields.day, '24');
    await I.fillField(this.fields.month, '07');
    await I.fillField(this.fields.year, '2021');
    await I.selectOption(this.fields.typeOfReferral,'Order on filing of Answers');
    await I.fillField(this.fields.furtherDetailsLegalAdvisor, 'Legal Advisor Further Details 2021');
    await I.click(this.fields.feePaymentRequiredNo);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
    await I.waitInUrl('/caseworker-general-referral/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
