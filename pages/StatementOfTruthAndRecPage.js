const {yesorno, divorceOrDissolution} = require('../common/constants');
const I = actor();

module.exports = {

  fields: {
    caseUrgentYes: '#solUrgentCase_Yes',
    caseUrgentNo: '#solUrgentCase_No',
    caseUrgentSupportingInfoTextBox: '#solUrgentCaseSupportingInformation',
    reconciliationWithApplicant1: '#solStatementOfReconciliationCertify_Yes',
    namesAndAddressesOfPersonsQualified: '#solStatementOfReconciliationDiscussed_Yes',
    applicant1_BelievesFactsTrue: '#applicant1StatementOfTruth_Yes',
    amAuthorisedByApplicant1ToSign: '#solSignStatementOfTruth_Yes',
    yourName: '#solStatementOfReconciliationName',
    nameOfYourFirm: '#solStatementOfReconciliationFirm',
    howToServeRespondent:'#solServiceMethod-courtService',
    serviceSolicitorService:'#solServiceMethod-solicitorService',
    serviceCourtService:'#solServiceMethod-courtService',
    //prayerHasBeenGiven:'#applicant1PrayerHasBeenGivenCheckbox-Yes',
    prayerDissolveCivil:'#applicant1PrayerEndCivilPartnership-endCivilPartnership',
    prayerDissolveDivorce:'#applicant1PrayerDissolveDivorce-dissolveDivorce',
    prayerFinancialOrderForSelf:'#applicant1PrayerFinancialOrdersThemselves-financialOrdersThemselves',

    additionalComments: '#statementOfReconciliationComments',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(urgent, union) {

    await I.waitInUrl('trigger/solicitor-submit-application/solicitor-submit-applicationSolStatementOfTruth');
    await I.runAccessibilityTest();

    if (urgent === yesorno.No) {
      await I.click(this.fields.caseUrgentNo);
    } else if (urgent === yesorno.Yes) {
      await I.click(this.fields.caseUrgentYes);
      await I.fillField(this.fields.caseUrgentSupportingInfoTextBox, 'here is the supporting information and instructions for the urgency');
    }
    await I.retry().click(this.fields.serviceCourtService);
    await I.click(this.fields.reconciliationWithApplicant1);
    await I.click(this.fields.namesAndAddressesOfPersonsQualified);

    // The Prayer
    if(union === divorceOrDissolution.DIVORCE) {
      await I.click(this.fields.prayerDissolveDivorce);
      console.log(' ...~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Divorce Chosen');
    }else {
      console.log(' ....  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   Dissolution Chosen');
      await I.click(this.fields.prayerDissolveCivil);
    }
    // await I.click(this.fields.prayerDissolveCivil);
    await I.click(this.fields.prayerFinancialOrderForSelf);

    // Statement of Truth
    await I.click(this.fields.applicant1_BelievesFactsTrue);
    await I.click(this.fields.amAuthorisedByApplicant1ToSign);

    await I.fillField(this.fields.yourName, 'James Porter');
    await I.fillField(this.fields.nameOfYourFirm, 'Nicole Denvir and Purnell');
    await I.fillField(this.fields.additionalComments, 'Additional Comments');

    await I.wait(3);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
