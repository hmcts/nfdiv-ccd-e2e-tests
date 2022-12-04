const I = actor();

module.exports = {

  fields: {
    applyConditionalOrderYes:'#coApplicant1ApplyForConditionalOrder_Yes',
    changeOrAddAnythingToApplication:'#coApplicant1ConfirmInformationStillCorrect_Yes',
    everythingInPetitionTrue:'#coApplicant1IsEverythingInApplicationTrue_Yes',
    addNewDocumentsNo:'#coAddNewDocuments_No',
    jurisdictionAgreeNo:'#jurisdictionAgree_No',
    legalProceedingsExistsYes:'#legalProceedingsExist_Yes',
    legalProceedingsDescription:'#legalProceedingsDescription',
    sotSolicitorName:'#coApplicant1SolicitorName',
    sotSolicitorFirm:'#coApplicant1SolicitorFirm',
    reviewAoSYes:'#coApplicant1ApplyForConditionalOrder_Yes',
    coAppSoTYes:'#coApplicant1StatementOfTruth_Yes',
    coGrantedNo:'#coGranted_No',
    coRefusalMoreInfo:'#coRefusalDecision-moreInfo',
    coRefusalReason:'#coRefusalClarificationReason-marriageCertificate',
    updateChangeOrAddAnythingToApplication:'#coApplicant1ConfirmInformationStillCorrect_No',
    updateEverythingInPetitionTrue:'#coApplicant1ReasonInformationNotCorrect',
    updateAddNewDocumentsNo:'#coAddNewDocuments_No',
    sotSolicitorAdditionalComments:'#coApplicant1SolicitorAdditionalComments',
    submit: 'button[type="submit"]'
  },

  async fillReviewAoS(){
    await I.waitInUrl('trigger/draft-conditional-order/draft-conditional-orderConditionalOrderReviewAoS');
    await I.wait(2);

    await I.see('Does the applicant want to continue with their divorce application?');
    await I.click(this.fields.applyConditionalOrderYes);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async reviewApplicant1Application() {
    await I.wait(2);
    await I.waitInUrl('trigger/draft-conditional-order/draft-conditional-orderConditionalOrderReviewApplicant1');
    await I.wait(2);
    ////await I.runAccessibilityTest;
    await I.see('Link to online application');
    await I.see('Is the information in this application still correct?');
    await I.click(this.fields.changeOrAddAnythingToApplication);
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
    ////await I.runAccessibilityTest;
    await I.wait(2);
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.see('Link to online application');
    await I.see('Is the information in this application still correct?');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitSoTDetails(){
    await I.wait(2);

    await I.waitInUrl('/submit-conditional-order/submit-conditional-orderConditionalOrderSoT');
    await I.see('The applicant believes that the facts stated in the application for a conditional order are true.');

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
    await I.see('Submit Conditional Order');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  async updateCOAoSReview(){
    await I.wait(5);
    await I.waitInUrl('update-conditional-order/update-conditional-orderConditionalOrderReviewAoS');
    await I.see('Does the applicant want to continue with their divorce application?');
    await I.click(this.fields.reviewAoSYes);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async updateCOReviewApplication(){
    await I.wait(2);
    await I.waitInUrl('update-conditional-order/update-conditional-orderConditionalOrderReviewApplicant1');
    await I.see('Link to online application');
    await I.see('Is the information in this application still correct?');

    await I.click(this.fields.updateChangeOrAddAnythingToApplication);
    await I.fillField(this.fields.updateEverythingInPetitionTrue, 'Some details');
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
    await I.see('Update conditional order');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async requestClarification(){
    await I.wait(2);
    await I.waitInUrl('trigger/legal-advisor-make-decision/legal-advisor-make-decisiongrantConditionalOrder');
    await I.click(this.fields.coGrantedNo);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(4);
    await I.waitInUrl('trigger/legal-advisor-make-decision/legal-advisor-make-decisionmakeRefusalOrder');
    await I.wait(4);
    await I.click(this.fields.coRefusalMoreInfo);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(4);
    await I.waitInUrl('trigger/legal-advisor-make-decision/legal-advisor-make-decisionrefusalOrderClarification');
    await I.wait(4);
    await I.click(this.fields.coRefusalReason);
    await I.wait(4);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(4);
    await I.waitInUrl('/trigger/legal-advisor-make-decision/legal-advisor-make-decisionrefusalDraft');
    await I.see('Refusal Draft');
    await I.see('NoticeOfRefusalDocument.pdf');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
    await I.see('Awaiting clarification');
  },

  async submitClarification(){
    await I.wait(2);
    await I.waitInUrl('/submit-clarification/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  }

};
