const I = actor();

module.exports = {

  fields: {
    applyConditionalOrderYes:'#coApplyForConditionalOrder_Yes',
    changeOrAddAnythingToApplication:'#coChangeOrAddToApplication_Yes',
    everythingInPetitionTrue:'#coIsEverythingInApplicationTrue_Yes',
    addNewDocumentsNo:'#coAddNewDocuments_No',
    jurisdictionAgreeNo:'#jurisdictionAgree_No',
    legalProceedingsExistsYes:'#legalProceedingsExist_Yes',
    legalProceedingsDescription:'#legalProceedingsDescription',
    sotSolicitorName:'#coSolicitorName',
    sotSolicitorFirm:'#coSolicitorFirm',
    reviewAoSYes:'#coApplyForConditionalOrder_Yes',
    coAppSoTYes:'#coApplicantStatementOfTruth_Yes',
    updateChangeOrAddAnythingToApplication:'#coChangeOrAddToApplication_Yes',
    updateEverythingInPetitionTrue:'#coIsEverythingInApplicationTrue_Yes',
    updateAddNewDocumentsNo:'#coAddNewDocuments_No',
    sotSolicitorAdditionalComments:'#coSolicitorAdditionalComments',
    submit: 'button[type="submit"]'
  },

  async fillReviewAoS(){
    await I.waitInUrl('draft-conditional-order/draft-conditional-orderConditionalOrderReviewAoS');
    await I.wait(2);
    await I.runAccessibilityTest();
    await I.see('Review Acknowledgement of Service - Draft Conditional Order Application');
    await I.click(this.fields.applyConditionalOrderYes);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async reviewApplicant1Application() {
    await I.wait(2);
    await I.waitInUrl('draft-conditional-order/draft-conditional-orderConditionalOrderReviewApplicant1');
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
    await I.waitInUrl('draft-conditional-order/draft-conditional-orderConditionalOrderNewDocuments');
    await I.see('Documents - Draft Conditional Order Application');
    await I.click(this.fields.addNewDocumentsNo);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  async draftConditionalOrderCYA() {
    await I.waitInUrl('/draft-conditional-order/submit');
    await I.runAccessibilityTest();
    await I.wait(2);
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.see('Link to respondent answers');
    await I.see('Does the applicant want to continue with the divorce and apply for a conditional order?');
    await I.see('Do you need to change your application or add anything?');
    await I.see('Is everything stated in this divorce application true?');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitSoTDetails(){
    await I.wait(2);

    await I.waitInUrl('/submit-conditional-order/submit-conditional-orderConditionalOrderSoT');
    await I.see('Statement of Truth - submit conditional order');
    await I.see('The applicant believes that the facts stated in this application are true.');

    await I.click(this.fields.coAppSoTYes);
    await I.fillField(this.fields.sotSolicitorName,'Robin Smith');
    await I.fillField(this.fields.sotSolicitorFirm, 'Sam Solicitors');
    await I.fillField(this.fields.sotSolicitorAdditionalComments, 'Additional comments ');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
  },

  async submitConditionalOrder(){
    await I.wait(2);
    await I.waitInUrl('/submit-conditional-order/submit');
    await I.see('Conditional order drafted');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  async updateCOAoSReview(){
    await I.wait(2);
    await I.waitInUrl('update-conditional-order/update-conditional-orderConditionalOrderReviewAoS');
    await I.see('Review Acknowledgement of Service - Draft Conditional Order Application');
    await I.click(this.fields.reviewAoSYes);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async updateCOReviewApplication(){
    await I.wait(2);
    await I.waitInUrl('update-conditional-order/update-conditional-orderConditionalOrderReviewApplicant1');
    await I.see('Link to online petition');
    await I.click(this.fields.updateChangeOrAddAnythingToApplication);
    await I.click(this.fields.updateEverythingInPetitionTrue);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async updateCODocuments(){
    await I.wait(2);
    await I.waitInUrl('/update-conditional-order/update-conditional-orderConditionalOrderNewDocuments');
    await I.see('Do you need to upload any other documents?');
    await I.click(this.fields.updateAddNewDocumentsNo);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async updateSubmit(){
    await I.wait(2);
    await I.waitInUrl('/trigger/update-conditional-order/submit');
    await I.see('Conditional order drafted');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async requestClarification(){
    await I.wait(2);
    await I.waitInUrl('/legal-advisor-request-clarification/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitClarification(){
    await I.wait(2);
    await I.waitInUrl('/submit-clarification/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  }

};
