const I = actor();

module.exports = {

  fields: {
    respSolicitorName:'#applicant2SolicitorName',
    respSolicitorPhone:'#applicant2SolicitorPhone',
    respSolicitorEmail:'#applicant2SolicitorEmail',
    acceptServiceRadioYes:'#applicant2SolicitorAgreeToReceiveEmails_Yes',
    confirmReadPetitionYes:'#confirmReadPetition_Yes',
    jurisdictionAgreeYes:'#jurisdictionAgree_Yes',
    jurisdictionAgreeNo:'#jurisdictionAgree_No',
    legalProceedingsExistsYes:'#legalProceedingsExist_Yes',
    legalProceedingsDescription:'#legalProceedingsDescription',
    submit: 'button[type="submit"]'
  },

  async fillConfirmContactDetails() {
    await I.waitInUrl('trigger/solicitor-draft-aos/solicitor-draft-aosApplicant2SolConfirmContactDetails');
    await I.wait(2);
    await I.runAccessibilityTest();
    await I.see('Confirm contact details');
    await I.see('AoS awaiting');
    await I.fillField(this.fields.respSolicitorName, 'Porter & Co');
    await I.fillField(this.fields.respSolicitorPhone,'02031214214');
    await I.fillField(this.fields.respSolicitorEmail,'draftAos@email.com');
    await I.waitForElement(this.fields.acceptServiceRadioYes);
    await I.click(this.fields.acceptServiceRadioYes);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillReviewApplicant1_Application(caseId) {
    await I.waitInUrl('trigger/solicitor-draft-aos/solicitor-draft-aosApplicant2SolReviewApplicant1Application');
    await I.wait(4);
    await I.see('Review the applicant 1\'s application');
    await I.see('Link to online petition');
    await I.see('mini-application-'+caseId+'.pdf');
    await I.runAccessibilityTest();
    await I.click(this.fields.confirmReadPetitionYes);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  async doYouAgreeJurisdiction(caseId) {
    await I.waitInUrl('trigger/solicitor-draft-aos/solicitor-draft-aosApplicant2SolAosjurisdiction');
    await I.wait(4);
    await I.see('Do you agree that the courts of England and Wales have jurisdiction?');
    await I.see('Respondent agreed to claimed jurisdiction?');
    await I.see(caseId);
    await I.runAccessibilityTest();
    await I.click(this.fields.jurisdictionAgreeNo);
    await I.see('Reason respondent disagreed to claimed jurisdiction');
    await I.wait(2);
    await I.click(this.fields.jurisdictionAgreeYes);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async anyOtherLegalProceedings(caseId) {
    await I.waitInUrl('trigger/solicitor-draft-aos/solicitor-draft-aosApplicant2SolAosOtherProceedings');
    await I.wait(4);
    await I.see('Are there any other legal proceedings outside of England and Wales?');
    await I.see(caseId);
    await I.runAccessibilityTest();
    await I.click(this.fields.legalProceedingsExistsYes);
    await I.wait(2);
    await I.fillField(this.fields.legalProceedingsDescription,'legal proceedings description');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async draftAosCYA(caseId) {
    await I.waitInUrl('trigger/solicitor-draft-aos/submit');
    await I.see(caseId);
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.see('Link to online petition');
    await I.see('mini-application-'+caseId+'.pdf');
    await I.see('Has the respondent read the application for divorce?');
    await I.see('Respondent agreed to claimed jurisdiction?');
    await I.see('Do legal proceedings exist (respondent)?');
    await I.runAccessibilityTest();
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
