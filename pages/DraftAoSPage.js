const I = actor();

module.exports = {

  fields: {
    respSolicitorName:'#applicant2SolicitorName',
    respSolicitorPhone:'#applicant2SolicitorPhone',
    respSolicitorEmail:'#applicant2SolicitorEmail',
    acceptServiceRadioYes:'#applicant2SolicitorAgreeToReceiveEmailsCheckbox-Yes',
    confirmReadPetitionYes:'#confirmReadPetition_Yes',
    disputeAgreeYes:'#howToRespondApplication-disputeDivorce',
    continueWithoutDisputingTheDivorce:'#howToRespondApplication-withoutDisputeDivorce',
    continueWithDisputingTheDivorce:'#howToRespondApplication-disputeDivorce',
    jurisdictionAgreeYes:'#jurisdictionAgree_Yes',
    jurisdictionAgreeNo:'#jurisdictionAgree_No',
    reasonForNoJurisdiction:'#reasonCourtsOfEnglandAndWalesHaveNoJurisdiction',
    whereIsYourLifeBased:'#inWhichCountryIsYourLifeMainlyBased',
    legalProceedingsExistsYes:'#applicant2LegalProceedings_Yes',
    legalProceedingsDescription:'#applicant2LegalProceedingsDetails',
    submit: 'button[type="submit"]'
  },


  async fillConfirmContactDetails() {
    await I.waitInUrl('trigger/draft-aos/draft-aosApplicant2SolConfirmContactDetails');
    await I.wait(2);
    await I.runAccessibilityTest();
    //await I.see('Confirm solicitor contact details');
    await I.fillField(this.fields.respSolicitorName, 'Porter & Co');
    await I.fillField(this.fields.respSolicitorPhone,'02031214214');
    await I.fillField(this.fields.respSolicitorEmail,'draftAos@email.com');
    await I.waitForElement(this.fields.acceptServiceRadioYes);
    await I.click(this.fields.acceptServiceRadioYes);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillReviewApplicant1_Application(caseId) {
    await I.waitInUrl('trigger/draft-aos/draft-aosApplicant2SolReviewApplicant1Application');
    await I.wait(4);
    //await I.see('Review application');
    await I.see('View application');
    await I.runAccessibilityTest();
    await I.click(this.fields.confirmReadPetitionYes);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  async doYouAgreeJurisdiction(caseId) {
    await I.waitInUrl('trigger/draft-aos/draft-aosapplicant2HowToResponseToApplication');
    await I.wait(4);
    await I.see('The respondent can only dispute the application if: (one or more of the following)');
    await I.see('How do you want to respond?');
    await I.runAccessibilityTest();
    await I.click(this.fields.continueWithoutDisputingTheDivorce);
    await I.see('Continue without disputing');
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async doYouAgreeJurisdictionDisputed(caseId) {
    await I.waitInUrl('trigger/draft-aos/draft-aosapplicant2HowToResponseToApplication');
    await I.wait(4);
    await I.see('The respondent can only dispute the application if: (one or more of the following)');
    await I.see('How do you want to respond?');
    await I.runAccessibilityTest();
    await I.see('Continue without disputing');
    await I.click(this.fields.continueWithDisputingTheDivorce);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async doYouAgreeCourts(caseId) {
    await I.waitInUrl('trigger/draft-aos/draft-aosApplicant2SolAosJurisdiction');
    await I.wait(4);
    await I.see('The applicant indicated the courts of England and Wales have jurisdiction because:');
    await I.see('Does the respondent agree the courts of England and Wales have jurisdiction?');
    await I.runAccessibilityTest();
    await I.click(this.fields.jurisdictionAgreeYes);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async doYouAgreeCourtsNo(caseId) {
    await I.waitInUrl('trigger/draft-aos/draft-aosApplicant2SolAosJurisdiction');
    await I.wait(4);
    await I.see('The applicant indicated the courts of England and Wales have jurisdiction because:');
    await I.see('Does the respondent agree the courts of England and Wales have jurisdiction?');
    await I.runAccessibilityTest();
    await I.click(this.fields.jurisdictionAgreeNo);
    await I.fillField(this.fields.reasonForNoJurisdiction,'Reason for no jurisdiction');
    await I.fillField(this.fields.whereIsYourLifeBased,'Sunny Australia');
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async anyOtherLegalProceedings(caseId) {
    await I.waitInUrl('trigger/draft-aos/draft-aosApplicant2SolAosOtherProceedings');
    await I.see('Are there any other legal proceedings relating to the');
    await I.runAccessibilityTest();
    await I.click(this.fields.legalProceedingsExistsYes);
    await I.wait(2);
    await I.fillField(this.fields.legalProceedingsDescription,'legal proceedings description');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async draftAosCYA(caseId) {
    await I.waitInUrl('trigger/draft-aos/submit');
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.see('How do you want to respond?');
    await I.see('Are there any other legal proceedings relating to the');
    await I.see('Provide details of the other legal proceedings');
    await I.runAccessibilityTest();
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
