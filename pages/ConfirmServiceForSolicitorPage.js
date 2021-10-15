const I = actor();

module.exports = {

  fields: {
    selectActionDropDown: 'select[id="next-step"]',
    marriageDateDay: '#solServiceDateOfService-day',
    marriageDateMonth: '#solServiceDateOfService-month',
    marriageDateYear: '#solServiceDateOfService-year',
    solServiceDocumentsServed:'#solServiceDocumentsServed',
    solServiceOnWhomServed:'#solServiceOnWhomServed',
    selectOptionSolServiceHowServed:'#solServiceHowServed',
    addressServed:'#solServiceAddressServed',
    solServiceBeingApplicant:'#solServiceBeingThe-applicants',
    solicitorName:'#solServiceServiceSotName',
    solicitorFirmName:'#solServiceServiceSotFirm',
    serviceLocationServed:'#solServiceLocationServed',
    submit: 'button[type="submit"]',
    applicationDateDay: 'receivedServiceApplicationDate-day',
    applicationDateMonth: 'receivedServiceApplicationDate-month',
    applicationDateYear: 'receivedServiceApplicationDate-year',
    selectAlternativeServiceType: '#alternativeServiceType',
    selectPaymentMethod: '#paymentMethod',
    serviceAppGranted: '#serviceApplicationGranted_Yes',
    deemedDateDay: '#deemedServiceDate-day',
    deemedDateMonth: '#deemedServiceDate-month',
    deemedDateYear: '#deemedServiceDate-year',
    localCourtName: 'localCourtName',
    localCourtEmail: 'localCourtEmail'
  },

  async fillServiceDetailsAndSubmit(caseNumber) {
    await I.waitInUrl('solicitor-confirm-service/solicitor-confirm-serviceSolConfirmService');
    await I.see('Certificate of Service - Confirm Service\n');
    await I.see('Awaiting service');

    await I.fillField(this.fields.marriageDateDay, '09');
    await I.fillField(this.fields.marriageDateMonth, '12');
    await I.fillField(this.fields.marriageDateYear, '2002');
    await I.fillField(this.fields.solServiceDocumentsServed,'Marriage Certificate');
    await I.fillField(this.fields.solServiceOnWhomServed,'Partner');
    await I.fillField(this.fields.addressServed,'Flat 3, 27 Heigham Street, Norwich NR2 4TE');


    await I.selectOption(this.fields.selectOptionSolServiceHowServed, 'By personally handing it to or leaving it with');

    await I.click(this.fields.solServiceBeingApplicant);

    await I.selectOption(this.fields.serviceLocationServed,'principal office of the corporation');
    await I.fillField(this.fields.solicitorName, 'James Porter');
    await I.fillField(this.fields.solicitorFirmName,'Porter & Co.');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitServiceDetails(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('solicitor-confirm-service/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitWithdrawn(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-withdrawn/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationReceived(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-received/caseworker-service-receivedserviceApplicationReceived');
    await I.fillField(this.fields.applicationDateDay, '27');
    await I.fillField(this.fields.applicationDateMonth, '09');
    await I.fillField(this.fields.applicationDateYear, '2022');
    await I.selectOption(this.fields.selectAlternativeServiceType,'Deemed as served');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationReceivedBailiff(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-received/caseworker-service-receivedserviceApplicationReceived');
    await I.fillField(this.fields.applicationDateDay, '27');
    await I.fillField(this.fields.applicationDateMonth, '09');
    await I.fillField(this.fields.applicationDateYear, '2022');
    await I.selectOption(this.fields.selectAlternativeServiceType,'Bailiff application');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationReceivedCYA(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-received/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationReceivedCYABaillif(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-received/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },


  async fillServiceApplicationPayment(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-payment/caseworker-service-paymentalternativeServicePayment');
    await I.selectOption(this.fields.selectPaymentMethod,'Telephone');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationPaymentCYA(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-payment/caseworker-service-paymentAltPaymentSummary');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationPaymentSubmit(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-payment/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationPaymentBailiff(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-payment/caseworker-service-paymentalternativeServicePayment');
    await I.selectOption(this.fields.selectPaymentMethod,'Telephone');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationPaymentCYABailiff(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-payment/caseworker-service-paymentAltPaymentSummary');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationPaymentSubmitBailiff(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-payment/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillApproveServiceApplication(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/legal-advisor-service-decision/legal-advisor-service-decisionmakeServiceDecision');
    await I.click(this.fields.serviceAppGranted);
    await I.fillField(this.fields.deemedDateDay, '01');
    await I.fillField(this.fields.deemedDateMonth, '04');
    await I.fillField(this.fields.deemedDateYear, '2022');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillApproveServiceApplicationCYA(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/legal-advisor-service-decision/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillMakeBailiffDecision(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-bailiff-decision/caseworker-bailiff-decisionmakeBailiffDecision-1');
    await I.click(this.fields.serviceAppGranted);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillMakeBailiffDecisionCYA(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-bailiff-decision/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillIssueBailiffPack(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-issue-bailiff-pack/caseworker-issue-bailiff-packissueBailiffPack');
    await I.fillField(this.fields.localCourtName, 'Script Court Name');
    await I.fillField(this.fields.localCourtEmail, 'ScriptCourtEmail@mailinator.com');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillIssueBailiffPackCYA(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-issue-bailiff-pack/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  }

};
