const {divorceOrDissolution} = require('../common/constants');

const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    selectActionDropDown: '#select[id="next-step"]',
    event: 'Invite Applicant 2',
    caseNumberDisplay: 'markdown[class="markdown"] h3',
    marriageBrokenApp2: '#applicant2ScreenHasMarriageBroken_Yes',
    financialOrder: '#applicant2FinancialOrder_No',
    hwfNo: '#applicant2NeedsHelpWithFees_No',
    noCorrectionNeeded : '#applicant2ConfirmApplicant1Information_No',
    prayerApp2: '#applicant2PrayerEndCivilPartnership-endCivilPartnership',
    prayerApp2Divorce:'#applicant2PrayerDissolveDivorce-dissolveDivorce',
    prayerApp2FinancialOrderThemselves:'#applicant2PrayerFinancialOrdersThemselves-financialOrdersThemselves',
    prayerApp1: '#applicant1PrayerDissolveDivorce-dissolveDivorce',
    prayerApp1FinancialOrderThemselves:'#applicant1PrayerFinancialOrdersThemselves-financialOrdersThemselves',
    prayerApp1FinancialOrderChildren:'#applicant1PrayerFinancialOrdersChild-financialOrdersChild',
    statementOfTruthApp2: '#applicant2StatementOfTruth_Yes',
    statementOfTruthSolApp2: '#applicant2SolSignStatementOfTruth_Yes',
    solName: '#applicant2SolStatementOfReconciliationName',
    solFirmName: '#applicant2SolStatementOfReconciliationFirm',
    urgentCase: '#solUrgentCase_No',
    courtService: '#serviceMethod-courtService',
    solReconciliation: '#solStatementOfReconciliationCertify_Yes',
    solReconciliationDiscussed: '#solStatementOfReconciliationDiscussed_Yes',
    prayerYes: '#applicant1PrayerEndCivilPartnership-endCivilPartnership',
    prayerDissolveDivorce:'#applicant1PrayerDissolveDivorce-dissolveDivorce',
    prayerDissolveCivil:'#applicant1PrayerEndCivilPartnership-endCivilPartnership',
    statementOfTruthApp1: '#applicant1StatementOfTruth_Yes',
    statementOfTruthSolApp1: '#solSignStatementOfTruth_Yes',
    solNameApp1: '#solStatementOfReconciliationName',
    solFirmNameApp1: '#solStatementOfReconciliationFirm',
    PBAaccount: '#solPaymentHowToPay-feePayByAccount',
    placeOfMarriage: '#marriagePlaceOfMarriage',
    countryOfMarriage:'#marriageCountryOfMarriage'
  },

  async fillFormAndSubmit(union) {
    var unionUpperCase;
    if(union === divorceOrDissolution.DIVORCE){
      unionUpperCase = union.toUpperCase();
      const isSafariBrowser = await I.isSafariBrowser();
      if (isSafariBrowser) {
        await I.wait(5);
        await I.waitInUrl(`/${unionUpperCase}/NFD/solicitor-create-application/submit`);
      } else {
        await I.wait(1);
        await I.waitInUrl(`/${unionUpperCase}/NFD/solicitor-create-application/submit`);
      }
    }else if ( union === divorceOrDissolution.DISSOLUTION){
      unionUpperCase = union.toUpperCase();
      // the switch to DISSOLUTION is not present in the URL Yet , but when done it will be a quick change.
      const isSafariBrowser = await I.isSafariBrowser();
      if (isSafariBrowser) {
        await I.wait(5);
        await I.waitInUrl('/DIVORCE/NFD/solicitor-create-application/submit');
      } else {
        await I.wait(1);
        await I.waitInUrl('/DIVORCE/NFD/solicitor-create-application/submit');
      }
    }
    //pause();
    ////await I.runAccessibilityTest;
    await I.see('Apply: divorce or dissolution');
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitInviteApplicant2() {
    await I.wait(5);
    await I.waitInUrl('trigger/invite-applicant2/submit');
    await I.wait(5);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
    await I.see('Awaiting applicant 2 response');
    await I.see('Invite Applicant 2');
    await I.waitForElement(this.fields.caseNumberDisplay);
    const display = await I.grabTextFrom(this.fields.caseNumberDisplay);
    await I.wait(1);
    return display;
  },

  async submitJointApplication() {
    await I.wait(2);
    await I.waitInUrl('trigger/solicitor-submit-joint-application/solicitor-submit-joint-applicationMarriageIrretrievablyBroken');
    await I.click(this.fields.marriageBrokenApp2);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.waitInUrl('trigger/solicitor-submit-joint-application/solicitor-submit-joint-applicationFinancialOrdersForApplicant2');
    await I.click(this.fields.financialOrder);
    await I.waitForNavigationToComplete(this.fields.submit);
    // await I.waitInUrl('trigger/solicitor-submit-joint-application/solicitor-submit-joint-applicationHelpWithFeesPageForApplicant2');
    // await I.click(this.fields.hwfNo);
    //await I.waitForNavigationToComplete(this.fields.submit);
    await I.waitInUrl('trigger/solicitor-submit-joint-application/solicitor-submit-joint-applicationcheckTheirAnswers');
    await I.click(this.fields.noCorrectionNeeded);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.waitInUrl('trigger/solicitor-submit-joint-application/solicitor-submit-joint-applicationSolStatementOfTruthApplicant2');
    await I.click(this.fields.solReconciliation);
    await I.click(this.fields.solReconciliationDiscussed);
    await I.click(this.fields.prayerApp2);
    await I.click(this.fields.statementOfTruthApp2);
    await I.click(this.fields.statementOfTruthSolApp2);
    await I.fillField(this.fields.solName, 'Solicitor Name');
    await I.fillField(this.fields.solFirmName, 'Solicitor Firm name');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.waitInUrl('trigger/solicitor-submit-joint-application/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitJointDivorceApplication() {
    await I.wait(2);
    await I.waitInUrl('trigger/solicitor-submit-joint-application/solicitor-submit-joint-applicationMarriageIrretrievablyBroken');
    await I.click(this.fields.marriageBrokenApp2);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.waitInUrl('trigger/solicitor-submit-joint-application/solicitor-submit-joint-applicationFinancialOrdersForApplicant2');
    await I.click(this.fields.financialOrder);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.waitInUrl('trigger/solicitor-submit-joint-application/solicitor-submit-joint-applicationcheckTheirAnswers');
    await I.click(this.fields.noCorrectionNeeded);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
    await I.waitInUrl('trigger/solicitor-submit-joint-application/solicitor-submit-joint-applicationSolStatementOfTruthApplicant2');
    await I.wait(2);
    await I.click(this.fields.solReconciliation);
    await I.click(this.fields.solReconciliationDiscussed);
    await I.click(this.fields.prayerApp2Divorce);
    await I.click(this.fields.prayerApp2FinancialOrderThemselves);
    await I.click(this.fields.statementOfTruthApp2);
    await I.click(this.fields.statementOfTruthSolApp2);
    await I.fillField(this.fields.solName, 'Solicitor Name');
    await I.fillField(this.fields.solFirmName, 'Solicitor Firm name');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.waitInUrl('trigger/solicitor-submit-joint-application/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitApproveApplicant2() {
    await I.wait(3);
    await I.waitInUrl('trigger/applicant2-approve/submit');
    await I.waitForNavigationToComplete(this.fields.submit);

  },

  async submitSignAndSubmit(union) {
    await I.wait(2);
    await I.waitInUrl('trigger/solicitor-submit-application/solicitor-submit-applicationConfirmJointApplication');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.waitInUrl('trigger/solicitor-submit-application/solicitor-submit-applicationSolStatementOfTruth');
    await I.click(this.fields.urgentCase);
    // await I.click(this.fields.courtService);
    await I.click(this.fields.solReconciliation);
    await I.click(this.fields.solReconciliationDiscussed);
    //pause();
    if(union === divorceOrDissolution.DISSOLUTION) {

      await I.click(this.fields.prayerDissolveCivil);
      console.log(' ...~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Dissolution Chosen');
    }else {
      console.log(' ....  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   Divorce Chosen');
      await I.click(this.fields.prayerApp1);
      await I.click(this.fields.prayerApp1FinancialOrderThemselves);
      await I.click(this.fields.prayerApp1FinancialOrderChildren);
      //await I.click(this.fields.prayerDissolveCivil);
    }
    await I.click(this.fields.statementOfTruthApp1);
    await I.click(this.fields.statementOfTruthSolApp1);
    await I.fillField(this.fields.solNameApp1, 'Solicitor 1 Name');
    await I.fillField(this.fields.solFirmNameApp1, 'Solicitor 1 Firm name');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async JointIssueApplication(){
    await I.wait(5);
    await I.waitInUrl('trigger/caseworker-issue-application/caseworker-issue-applicationissueApplication');
    await I.fillField(this.fields.placeOfMarriage, 'London');
    await I.fillField(this.fields.countryOfMarriage, 'UK');
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
