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
    submit: 'button[type="submit"]'
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
  }
};
