const I = actor();

module.exports = {

  fields: {
    emailParties:'#generalEmailParties',
    otherRecipientEmail:'#generalEmailOtherRecipientEmail',
    otherRecipientName:'#generalEmailOtherRecipientName',
    details:'#generalEmailDetails',
    createGeneralOrderMsg:'Create general order',
    courtOrderDate:'Court order date',
    draft:'#General Order Draft',
    day:'#generalOrderDate-day',
    month:'#generalOrderDate-month',
    year:'#generalOrderDate-year',
    applicant:'#generalOrderDivorceParties-applicant',
    respondent:'#generalOrderDivorceParties-respondent',
    recital:'#generalOrderRecitals',
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
    await I.waitInUrl('trigger/caseworker-create-general-order/caseworker-create-general-orderCreateGeneralOrder');
    await I.wait(2);
    await I.runAccessibilityTest();
    await I.see(this.fields.createGeneralOrderMsg);
    await I.fillField(this.fields.day, '24');
    await I.fillField(this.fields.month, '07');
    await I.fillField(this.fields.year, '2021');
    await I.click(this.fields.applicant);
    await I.fillField(this.fields.recital,'Recital Value');
    await I.selectOption(this.fields.judge, 'His Honour Judge');
    await I.fillField(this.fields.nameOfJudge,'Lord Smith');
    await I.fillField(this.fields.generalOrderDetails,'General Order Details');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(5);
    //await I.waitInUrl('/caseworker-create-general-order/caseworker-create-general-ordergeneralOrderDraft');
    await I.see('Create general order');
    await I.see('General Order Draft');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);

  },

  async fillCya(caseId) {
    await I.waitInUrl('/trigger/caseworker-create-general-order/submit');
    await I.wait(4);
    await I.runAccessibilityTest();
    await I.see(this.fields.createGeneralOrderMsg);
    await I.see(this.fields.checkYourAnswers);
    await I.see('Court order date');
    await I.see('Who is the general order for?');
    await I.see('Select Judge');
    await I.see('Name of Judge');
    await I.see('General order details');
    await I.see('General Order Draft');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }
};
