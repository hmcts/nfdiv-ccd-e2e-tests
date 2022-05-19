const I = actor();

module.exports = {
  fields: {
    scannedDocumentText: 'Scanned documents',
    documentNumber: '#scannedDocuments_0_controlNumber',
    deliveryDay: '#deliveryDate-day',
    deliveryMonth: '#deliveryDate-month',
    deliverYear: '#deliveryDate-year',
    deliveryMinute: '#deliveryDate-hour',
    deliveryHour: '#deliveryDate-minute',
    deliverSecond: '#deliveryDate-second',
    exceptionRecordReference: '#scannedDocuments_0_exceptionRecordReference',
    fileName: '#scannedDocuments_0_fileName',
    scanDay: '#scannedDate-day',
    scanMonth: '#scannedDate-month',
    scanYear: '#scannedDate-year',
    scanMinute: '#scannedDate-hour',
    scanHour: '#scannedDate-minute',
    scanSecond: '#scannedDate-second',
    documentSubType: '#scannedDocuments_0_subtype',
    selectDocumentDropDown: 'select[id="scannedDocuments_0_type"]',
    selectDocumentType: 'select[id="scannedDocuments_0_type"]',
    chooseFile: 'input[id="scannedDocuments_0_url"]',
    supplementaryEvidenceHandled:'#evidenceHandled_Yes',
    removeButtonXPath:'//mat-dialog-container//button[@title="Remove"]',
    newSolEmail: '#applicant1SolicitorEmail',
    searchOrgText: 'Search for an organisation',
    searchOrganisation:'#search-org-text',
    orgResultTable: '#organisation-table',
    orgSelectUnLink: 'a[title="Clear organisation selection for NFD Solicitor Organisation"]',
    orgSelectLink: 'a[title="Select the organisation NFD E2E Test Solicitor Organisation Ltd"]',
    submit: 'button[type="submit"]',
    correspondenceAddress: '#applicant1Address_applicant1Address_postcodeInput',
    addressButton: '#applicant1Address_applicant1Address_postcodeLookup > button',
    addressOption: 'select[id="applicant1Address_applicant1Address_addressList"]'
  },

  async attachScanDocuments(caseNumber) {
    await I.waitInUrl('trigger/attachScannedDocs/attachScannedDocsattachScannedDocs');
    await I.see('Attach scanned docs');
    I.click(locate('.button').withText('Add new'));
    await I.wait(3);
    await I.fillField(this.fields.documentNumber , '64654654654654');
    await I.fillField(this.fields.deliveryDay , '11');
    await I.fillField(this.fields.deliveryMonth , '11');
    await I.fillField(this.fields.deliverYear , '2000');
    await I.fillField(this.fields.deliveryMinute , '09');
    await I.fillField(this.fields.deliveryHour , '08');
    await I.fillField(this.fields.deliverSecond , '01');

    await I.fillField(this.fields.exceptionRecordReference , '1236465454');
    await I.fillField(this.fields.fileName , 'e2eTestFileName');
    await I.fillField(this.fields.scanDay , '12');
    await I.fillField(this.fields.scanMonth , '12');
    await I.fillField(this.fields.scanYear , '2020');
    await I.fillField(this.fields.scanHour , '08');
    await I.fillField(this.fields.scanMinute , '09');
    await I.fillField(this.fields.scanSecond , '10');

    await I.fillField(this.fields.documentSubType, 'DocSubType');

    await I.waitForClickable(this.fields.selectDocumentDropDown);
    await I.wait(5);
    await I.retry(2).selectOption(this.fields.selectDocumentType, 'Form');
    await I.wait(4);
    await I.attachFile(this.fields.chooseFile, 'data/scanDocumentsFileUpload.txt');
    await I.wait(7);

    await I.waitForElement(this.fields.supplementaryEvidenceHandled);
    await I.click(this.fields.supplementaryEvidenceHandled);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async scanDocsSubmit(caseNumber) {
    await I.waitInUrl('trigger/attachScannedDocs/submit');
    await I.wait(2);
    await I.see('Attach scanned docs');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(5);
  },


  async removeScanDocument(caseNumber) {
    await I.waitInUrl('trigger/caseworker-remove-scanned-document/caseworker-remove-scanned-documentremoveScannedDocument');
    await I.wait(3);
    await I.click(locate('.button').withText('Remove'));
    await I.wait(3);
    // Overlapy Remove PopUp
    await I.retry(3).click(this.fields.removeButtonXPath);
    await I.wait(5);
    await I.waitInUrl('caseworker-remove-scanned-document/caseworker-remove-scanned-documentremoveScannedDocument');
    await I.click(this.fields.submit);
    await I.wait(3);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
