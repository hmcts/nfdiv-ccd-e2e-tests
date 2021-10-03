const I = actor();

module.exports = {

  fields: {
    emailParties:'#generalEmailParties',
    otherRecipientEmail:'#generalEmailOtherRecipientEmail',
    otherRecipientName:'#generalEmailOtherRecipientName',
    details:'#generalEmailDetails',
    draft:'#General Order Draft',
    day:'#generalOrderDate-day',
    month:'#generalOrderDate-month',
    year:'#generalOrderDate-year',
    applicant:'#generalOrderDivorceParties-applicant',
    respondent:'#generalOrderDivorceParties-respondent',
    recital:'#generalOrderRecitals',
    judge:'#generalOrderJudgeType',
    nameOfJudge:'#generalOrderJudgeName',
    legalAdvisorName:'#generalOrderLegalAdvisorName',
    generalOrderDetails:'#generalOrderDetails',
    eventSummary:'#field-trigger-summary',
    eventDescription:'#field-trigger-description',
    labelCheckYourAnswers:'Check your answers',
    labelCreateGeneralOrderMsg:'Create general order',
    labelCheckInfoBelow:'Check the information below carefully.',
    labelCourtOrderDate:'Court order date',
    labelRecitals:'Recitals',
    labelGeneralOrderForWho:'Who is the general order for?',
    labelSelectJudge:'Select Judge',
    labelJudgeName:'Name of Judge',
    labelLegalAdvisorName:'Name of Legal Advisor',
    labelGenOrderDetails:'General order details',
    labelGeneralOrderDraft:'General Order Draft',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(caseId) {
    await I.waitInUrl('trigger/caseworker-create-general-order/caseworker-create-general-orderCreateGeneralOrder');
    await I.wait(2);
    await I.runAccessibilityTest();
    await I.see(this.fields.labelCreateGeneralOrderMsg);
    await I.fillField(this.fields.day, '24');
    await I.fillField(this.fields.month, '07');
    await I.fillField(this.fields.year, '2021');
    await I.click(this.fields.applicant);
    await I.fillField(this.fields.recital,'Recital Value');
    await I.selectOption(this.fields.judge, 'His Honour Judge');
    await I.fillField(this.fields.nameOfJudge,'Lord Smith');
    await I.fillField(this.fields.legalAdvisorName, 'James Porter');
    await I.fillField(this.fields.generalOrderDetails,'General Order Details');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(5);
    await I.see('Create general order');
    await I.see('General Order Draft');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);

  },

  async fillCya(caseId) {
    await I.waitInUrl('/trigger/caseworker-create-general-order/submit');
    await I.wait(4);
    await I.runAccessibilityTest();
    await I.see(this.fields.labelCreateGeneralOrderMsg);
    await I.see(this.fields.labelCheckYourAnswers);
    await I.see(this.fields.labelCheckInfoBelow);
    await I.see(this.fields.labelGeneralOrderForWho);
    await I.see(this.fields.labelRecitals);
    await I.see(this.fields.labelSelectJudge);
    await I.see(this.fields.labelJudgeName);
    await I.see(this.fields.labelLegalAdvisorName);
    await I.see(this.fields.labelGenOrderDetails);
    await I.see(this.fields.labelGeneralOrderDraft);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }
};
