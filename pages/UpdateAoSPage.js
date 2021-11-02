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
    jurisdictionDisagreeReason:'#jurisdictionDisagreeReason',
    legalProceedingsExistsYes:'#applicant2LegalProceedings_Yes',
    legalProceedingsExistsNo:'#applicant2LegalProceedings_No',
    legalProceedingsDescription:'#applicant2LegalProceedingsDetails',
    submit: 'button[type="submit"]'
  },

  async updateAoSDetails() {
    await I.waitInUrl('/update-aos/update-aosApplicant2SolUpdateAosApplicant1Application');
    await I.wait(2);
    await I.runAccessibilityTest();
    await I.see('Update AoS');
    await I.see('Review the applicant 1\'s application');
    await I.wait(2);
    await I.click(this.fields.confirmReadPetitionYes);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(3);
    await I.waitInUrl('/update-aos/update-aosApplicant2SolAosjurisdiction');
    await I.wait(2);
    await I.click(this.fields.jurisdictionAgreeYes);
    await I.waitForNavigationToComplete(this.fields.submit);

    await I.waitInUrl('update-aos/update-aosApplicant2SolAosOtherProceedings');
    await I.wait(3);
    await I.click(this.fields.legalProceedingsExistsYes);
    await I.fillField(this.fields.legalProceedingsDescription,'Updates  to  legal proceedings');
    await I.waitForNavigationToComplete(this.fields.submit);

    await I.waitInUrl('update-aos/submit');
    await I.wait(3);
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.see('Link to online petition');
    await I.see('Has the respondent read the application for divorce?');
    await I.see('Respondent agreed to claimed jurisdiction?');
    await I.see('Are there any existing or previous court proceedings relating to the marriage?');
    await I.see('Legal proceeding details');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }
};
