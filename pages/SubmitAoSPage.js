const I = actor();
const testConfig = require('./../tests/config');

module.exports = {

  fields: {
    respSolicitorName:'#applicant2SolicitorName',
    respSolicitorPhone:'#applicant2SolicitorPhone',
    respSolicitorEmail:'#applicant2SolicitorEmail',
    sotYES:'#statementOfTruth_Yes',
    solicitorNameSOT:'#solicitorName',
    solicitorFirmSOT: '#solicitorFirm',
    solicitorAddress:'#applicant2SolicitorAddress',
    additionalComments:'#additionalComments',
    prayer_Yes:'#prayerHasBeenGiven_Yes',
    confirmReadPetitionYes:'#confirmReadPetition_Yes',
    jurisdictionAgreeYes:'#jurisdictionAgree_Yes',
    jurisdictionAgreeNo:'#jurisdictionAgree_No',
    legalProceedingsExistsYes:'#legalProceedingsExist_Yes',
    legalProceedingsDescription:'#legalProceedingsDescription',
    submit: 'button[type="submit"]'
  },

  async fillSoTAndSoRDetails() {
    await I.waitInUrl('trigger/submit-aos/submit-aosApplicant2SolStatementOfTruth');
    await I.wait(2);
    ////await I.runAccessibilityTest;
    await I.see('Statement of truth and reconciliation');
    await I.see('Review the answers in your Acknowledgement of Service below. If you wish to change any of your answers, please go back and use the \'Update AoS\' action');
    await I.see('Has the respondent read the application ?');
    await I.see('Respondent agreed to claimed jurisdiction?');
    // await I.see('Reason respondent disagreed to claimed jurisdiction');
    await I.see('Are there any existing or previous court proceedings relating to the marriage?');
    await I.see('Updates  to  legal proceedings');
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async checkYourAnswers(caseId) {
    await I.waitInUrl('trigger/submit-aos/submit');
    await I.wait(4);
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.see('I am duly authorised by the respondent to sign this statement.');
    await I.see('Solicitor’s name');
    await I.see('Solicitor’s firm');
    await I.see('Additional Comments');
    ////await I.runAccessibilityTest;
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  async doYouAgreeJurisdiction(caseId) {
    await I.waitInUrl('trigger/solicitor-draft-aos/solicitor-draft-aosApplicant2SolAosjurisdiction');
    await I.wait(4);
    await I.see('Do you agree that the courts of England and Wales have jurisdiction?');
    await I.see('Respondent agreed to claimed jurisdiction?');
    // await I.see(caseId);
    ////await I.runAccessibilityTest;
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
    // await I.see(caseId);
    ////await I.runAccessibilityTest;
    await I.click(this.fields.legalProceedingsExistsYes);
    await I.wait(2);
    await I.fillField(this.fields.legalProceedingsDescription,'legal proceedings description');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async draftAosCYA(caseId) {
    await I.waitInUrl('trigger/solicitor-draft-aos/submit');
    // await I.see(caseId);
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.see('Link to online petition');
    await I.see('Has the respondent read the application for divorce?');
    await I.see('Respondent agreed to claimed jurisdiction?');
    ////await I.runAccessibilityTest;
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillSolicitorDetails(caseId) {
    await I.waitInUrl('submit-aos/submit-aosSubmitAos');
    await I.see('Statement of truth');
    await I.click(this.fields.sotYES);
    await I.fillField(this.fields.solicitorNameSOT,'Sol Name');
    await I.fillField(this.fields.solicitorFirmSOT,'Sol Firm');
    await I.fillField(this.fields.additionalComments,'Solicitors Additional Comments');
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
