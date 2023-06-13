const I = actor();

module.exports = {

  fields: {
    respSolicitorName:'#applicant2SolicitorName',
    respSolicitorPhone:'#applicant2SolicitorPhone',
    respSolicitorEmail:'#applicant2SolicitorEmail',
    acceptServiceCheckBoxYes:'#applicant2SolicitorAgreeToReceiveEmailsCheckbox-Yes',
    confirmReadPetitionYes:'#confirmReadPetition_Yes',

    disputeAgreeYes:'#howToRespondApplication-disputeDivorce',
    disputeAgreeNo:'#howToRespondApplication-withoutDisputeDivorce',
    jurisdictionAgreeYes:'#jurisdictionAgree_Yes',
    jurisdictionAgreeNo:'#jurisdictionAgree_No',
    jurisdictionDisagreeReason:'#jurisdictionDisagreeReason',
    legalProceedingsExistsYes:'#applicant2LegalProceedings_Yes',
    legalProceedingsExistsNo:'#applicant2LegalProceedings_No',
    legalProceedingsDescription:'#applicant2LegalProceedingsDetails',
    submit: 'button[type="submit"]'
  },

  async updateAoSContactDetails() {
    await I.waitInUrl('trigger/update-aos/update-aosApplicant2SolConfirmContactDetails');
    await I.wait(2);
    ////await I.runAccessibilityTest;
    await I.see('Confirm solicitor contact details');
    await I.wait(2);
    await I.fillField(this.fields.respSolicitorName,'Respondent Name');
    await I.fillField(this.fields.respSolicitorPhone,'02031241245');
    await I.fillField(this.fields.respSolicitorEmail,'NFDe2eNightlytest@mailinator.com');
    await I.wait(3);
    await I.click(this.fields.acceptServiceCheckBoxYes);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
  },

  async updateAoSDispute() {
    await I.waitInUrl('trigger/update-aos/update-aosapplicant2HowToResponseToApplication');
    await I.wait(2);
    await I.see('How does the respondent want to respond to the application');
    await I.see('The respondent can only dispute the application if: (one or more of the following)');
    await I.click(this.fields.disputeAgreeNo);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I .wait(3);
  },


  async updateDoYouAgreeCourts(caseId) {
    await I.waitInUrl('trigger/update-aos/update-aosApplicant2SolAosjurisdiction');
    await I.wait(4);
    await I.see('Do you agree that the courts of England and Wales have jurisdiction?');
    await I.see('Respondent agreed to claimed jurisdiction?');
    // await I.see(caseId);
    ////await I.runAccessibilityTest;
    await I.click(this.fields.jurisdictionAgreeYes);
    await I.see('Yes');
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async updateAoSLegalProceedings() {
    await I.waitInUrl('update-aos/update-aosApplicant2SolAosJurisdiction');
    await I.wait(3);
    await I.click(this.fields.jurisdictionAgreeYes);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async updateAosOtherLegalProceedings() {
    await I.waitInUrl('update-aos/update-aosApplicant2SolAosOtherProceedings');
    await I.wait(3);
    await I.click(this.fields.legalProceedingsExistsYes);
    await I.wait(2);
    await I.fillField(this.fields.legalProceedingsDescription,'Updates  to  legal proceedings');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async updateAoSReviewApplication() {
    await I.waitInUrl('trigger/update-aos/update-aosApplicant2SolConfirmContactDetails');
    await I.fillField(this.fields.respSolicitorName,'Respondent Name');
    await I.fillField(this.fields.respSolicitorPhone,'02031241245');
    await I.fillField(this.fields.respSolicitorEmail,'NFDe2eNightlytest@mailinator.com');
    await I.wait(2);
    await I.click(this.fields.acceptServiceCheckBoxYes);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async updateAoSReviewApplicationRes(caseNumber) {
    await I.wait(3);
    await I.waitInUrl('trigger/update-aos/update-aosApplicant2SolReviewApplicant1Application');
    await I.wait(2);
    await I.click(this.fields.confirmReadPetitionYes);
    await I.wait(3);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async updateAoSCya(){
    await I.waitInUrl('update-aos/submit');
    await I.wait(3);
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.see('Has the respondent read the application ?');
    await I.see('How do you want to respond?');
    await I.see('Does the respondent agree the courts of England and Wales have jurisdiction?');
    await I.see('Are there any other legal proceedings relating to the marriage?');
    await I.see('Provide details of the other legal proceedings');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }

};
