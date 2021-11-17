const {yesorno} = require('../common/constants');
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
    servceSolicitorService:'#solServiceMethod-solicitorService',
    prayerHasBeenGiven:'#applicant1PrayerHasBeenGivenCheckbox-Yes',
    additionalComments: '#statementOfReconciliationComments',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(urgent) {

    await I.waitInUrl('solicitor-submit-application/solicitor-submit-applicationSolStatementOfTruth');
    await I.runAccessibilityTest();

    if (urgent === yesorno.No) {
      await I.click(this.fields.caseUrgentNo);
    } else if (urgent === yesorno.Yes) {
      await I.click(this.fields.caseUrgentYes);
      await I.fillField(this.fields.caseUrgentSupportingInfoTextBox, 'here is the supporting information and instructions for the urgency');
    }
    await I.retry().click(this.fields.servceSolicitorService);
    //await I.see('After service is complete you must notify the court by completing the \'Confirm Service\' form in CCD.Refer to the notification that will be sent upon the issuing of the the case');
    await I.click(this.fields.reconciliationWithApplicant1);
    await I.click(this.fields.namesAndAddressesOfPersonsQualified);

    await I.click(this.fields.applicant1_BelievesFactsTrue);
    await I.click(this.fields.amAuthorisedByApplicant1ToSign);
    await I.click(this.fields.prayerHasBeenGiven);
    await I.fillField(this.fields.yourName, 'James Porter');
    await I.fillField(this.fields.nameOfYourFirm, 'Nicole Denvir and Purnell');
    await I.fillField(this.fields.additionalComments, 'Additional Comments');

    await I.wait(3);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
