const I = actor();

module.exports = {

  fields: {
    generalReferral:'General referral',
    generalApplicationReferral:'#generalReferralReason-generalApplicationReferral',
    applicationFrom:'#generalApplicationFrom',
    day:'#generalApplicationReferralDate-day',
    month:'#generalApplicationReferralDate-month',
    year:'#generalApplicationReferralDate-year',
    furtherDetailsJudge:'#generalReferralJudgeDetails',
    furtherDetailsLegalAdvisor:'#generalReferralJudgeOrLegalAdvisorDetails',
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
    await I.waitInUrl('/caseworker-general-referral/caseworker-general-referralgeneralReferral');
    await I.wait(2);
    await I.runAccessibilityTest();
    await I.click(this.fields.generalApplicationReferral);
    await I.wait(2);
    await I.see('Application from');
    await I.wait(2);
    await I.selectOption(this.fields.applicationFrom,'Applicant / Applicant\'s Solicitor');
    await I.fillField(this.fields.day, '24');
    await I.fillField(this.fields.month, '07');
    await I.fillField(this.fields.year, '2021');
    await I.selectOption(this.fields.typeOfReferral,'Order on filing of Answers');
    await I.fillField(this.fields.furtherDetailsLegalAdvisor, 'Legal Advisor Further Details 2021');
    await I.click(this.fields.feePaymentRequired);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
    await I.waitInUrl('/caseworker-general-referral/submit');
    // await I.see('Submitted');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitGeneralReferral(caseId) {
    await I.waitInUrl('trigger/caseworker-general-referral/submit');
    await I.wait(4);
    await I.runAccessibilityTest();
    await I.see('General referral');
    await I.see('Awaiting General Referral Payment');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }
};
