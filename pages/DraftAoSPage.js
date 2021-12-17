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
    await I.see('Confirm contact details');
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
    await I.see('Review application');
    await I.see('Link to online application');
    await I.runAccessibilityTest();
    await I.click(this.fields.confirmReadPetitionYes);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  async doYouAgreeJurisdiction(caseId) {
    await I.waitInUrl('trigger/draft-aos/draft-aosapplicant2HowToResponseToApplication');
    await I.wait(4);
    await I.see('How does the applicant want to respond to the application?');
    // await I.see(caseId);
    await I.see('The applicant can only dispute the application if: (one or more of the following)');
    await I.see('How do you want to respond ?');
    await I.runAccessibilityTest();
    await I.click(this.fields.continueWithoutDisputingTheDivorce);
    await I.see('Continue without disputing the divorce');
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async doYouAgreeCourts(caseId) {
    await I.waitInUrl('trigger/draft-aos/draft-aosApplicant2SolAosjurisdiction');
    await I.wait(4);
    await I.see('Do you agree that the courts of England and Wales have jurisdiction?');
    await I.see('Respondent agreed to claimed jurisdiction?');
    await I.runAccessibilityTest();
    await I.click(this.fields.jurisdictionAgreeYes);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async doYouAgreeCourtsNo(caseId) {
    await I.waitInUrl('trigger/draft-aos/draft-aosApplicant2SolAosjurisdiction');
    await I.wait(4);
    await I.see('Do you agree that the courts of England and Wales have jurisdiction?');
    await I.see('Respondent agreed to claimed jurisdiction?');
    await I.runAccessibilityTest();
    await I.click(this.fields.jurisdictionAgreeNo);
    await I.fillField(this.fields.reasonForNoJurisdiction,'Reason for no jurisdiction');
    await I.fillField(this.fields.whereIsYourLifeBased,'Sunny Australia');
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async anyOtherLegalProceedings(caseId) {
    await I.waitInUrl('trigger/draft-aos/draft-aosApplicant2SolAosOtherProceedings');
    await I.see(caseId);
    await I.see('Are there any existing or previous court proceedings relating to the marriage?');
    await I.runAccessibilityTest();
    await I.click(this.fields.legalProceedingsExistsYes);
    await I.wait(2);
    await I.fillField(this.fields.legalProceedingsDescription,'legal proceedings description');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async draftAosCYA(caseId) {
    await I.waitInUrl('trigger/draft-aos/submit');
    await I.see(caseId);
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.see('Link to online application');
    await I.see('Has the respondent read the application ?');
    await I.see('Respondent agreed to claimed jurisdiction?');
    await I.see('Are there any existing or previous court proceedings relating to the marriage?');
    await I.see('Provide details of the other legal proceedings');
    await I.runAccessibilityTest();
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
