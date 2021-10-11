const I = actor();

module.exports = {

  fields: {
    applyConditionalOrderYes:'#coApplyForConditionalOrder_Yes',
    changeOrAddAnythingToApplication:'#coChangeOrAddToApplication_Yes',
    everythingInPetitionTrue:'#coIsEverythingInPetitionTrue_Yes',
    addNewDocumentsNo:'#coAddNewDocuments_No',
    jurisdictionAgreeNo:'#jurisdictionAgree_No',
    legalProceedingsExistsYes:'#legalProceedingsExist_Yes',
    legalProceedingsDescription:'#legalProceedingsDescription',
    sotSolicitorName:'#coSolicitorName',
    sotSolicitorFirm:'#coSolicitorFirm',
    sotSolicitorAdditionalComments:'#coSolicitorAdditionalComments',
    submit: 'button[type="submit"]'
  },

  async fillReviewAoS(){
    await I.waitInUrl('solicitor-draft-conditional-order/solicitor-draft-conditional-orderConditionalOrderReviewAoS');
    await I.wait(2);
    await I.runAccessibilityTest();
    await I.see('Review Acknowledgement of Service - Draft Conditional Order Application');
    await I.click(this.fields.applyConditionalOrderYes);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async reviewApplicant1Application() {
    await I.wait(2);
    await I.waitInUrl('solicitor-draft-conditional-order/solicitor-draft-conditional-orderConditionalOrderReviewApplicant1');
    await I.wait(2);
    await I.runAccessibilityTest();
    await I.see('Review the applicant\'s application - Draft Conditional Order Application');
    await I.click(this.fields.changeOrAddAnythingToApplication);
    await I.click(this.fields.everythingInPetitionTrue);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async draftConditionalOrderDocuments() {
    await I.wait(2);
    await I.waitInUrl('solicitor-draft-conditional-order/solicitor-draft-conditional-orderConditionalOrderNewDocuments');
    await I.see('Documents - Draft Conditional Order Application');
    await I.click(this.fields.addNewDocumentsNo);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  async draftConditionalOrderCYA() {
    await I.waitInUrl('/solicitor-draft-conditional-order/submit');
    await I.runAccessibilityTest();
    await I.wait(2);
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.see('Link to respondent answers');
    await I.see('Do you need to change your application or add anything?');
    await I.see('Is everything stated in this divorce petition true?');
    await I.see('Do you need to upload any other documents?');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitSoTDetails(){
    await I.wait(2);
    await I.waitInUrl('solicitor-submit-conditional-order/solicitor-submit-conditional-orderConditionalOrderSoT');
    await I.see('Statement of Truth - submit conditional order');
    await I.see('The applicant believes that the facts stated in the application for a conditional order are true');

    await I.fillField(this.fields.sotSolicitorName,'Solicitor Smith ');
    await I.fillField(this.fields.legalAdvisorName, 'Legal Advisor Porter');
    await I.fillField(this.fields.sotSolicitorAdditionalComments,'Additional Comments');

    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  async submitConditionalOrder(){
    await I.wait(2);
    await I.waitInUrl('solicitor-submit-conditional-order/submit');
    await I.see('Submit Conditional Order');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
    await I.checkStateAndEvent('Awaiting legal advisor referral','Submit Conditional Order');
  }
};
