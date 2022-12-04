const I = actor();

module.exports = {

  fields: {
    generalConsiderationApprove:'#generalReferralDecision-approve',
    generalConsiderationReason:'#generalReferralDecisionReason',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(caseId) {
    await I.waitInUrl('trigger/legal-advisor-general-consideration/legal-advisor-general-considerationgeneralConsiderationResponse');
    await I.wait(2);
    ////await I.runAccessibilityTest;
    await I.click(this.fields.generalConsiderationApprove);
    await I.fillField(this.fields.generalConsiderationReason, 'Some details');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
    await I.waitInUrl('trigger/legal-advisor-general-consideration/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitGeneralReferral(caseId) {
    await I.waitInUrl('trigger/caseworker-general-referral/caseworker-general-referralgeneralReferral');
    await I.wait(2);
    ////await I.runAccessibilityTest;
    await I.click(this.fields.generalApplicationReferral);
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
  },

  async submit(caseId) {
    await I.waitInUrl('trigger/caseworker-request-dwp-disclosure/submit');
    await I.wait(2);
    ////await I.runAccessibilityTest;
    await I.waitForNavigationToComplete(this.fields.submit);
  }

};
