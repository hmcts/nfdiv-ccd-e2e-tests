const I = actor();
const testConfig = require('../tests/config');

module.exports = {

  fields: {
    addNewButton: 'applicant1DocumentsUploaded',
    chooseFile: 'input[id="applicant1DocumentsUploaded_0_documentLink"]',
    fileComment: '#applicant1DocumentsUploaded_0_documentEmailContent',
    documentType:'#applicant1DocumentsUploaded_0_documentType',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('/solicitor-create-application/solicitor-create-applicationUploadSupportingDocuments');
    await I.runAccessibilityTest();
    await I.see('Upload your document');
    I.click(locate('.button').withText('Add new'));
    //const isAttachFileSupportedBrowser = !(await I.isMicrosoftEdgeOrSafariBrowser());

    await I.wait(3);
    await I.attachFile(this.fields.chooseFile, 'data/fileupload.txt');
    await I.wait(5);
    await I.see('Applicant 1 uploaded documents');
    await I.fillField(this.fields.fileComment, 'Uploading a dummy file');
    await I.selectOption(this.fields.documentType,'Marriage Certificate');

    // existing code in master
    //if (testConfig.TestForCrossBrowser && isAttachFileSupportedBrowser) {
    // await I.click(this.fields.addNewButton);
    // await I.attachFile(this.fields.chooseFile, 'data/fileupload.txt');
    // await I.fillField(this.fields.fileComment, 'Uploading a dummy file');
    // await I.wait(6);
    // }
    await I.wait(6);
    //I.acceptPopup();
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async notUploadingAnyDocuments() {
    await I.waitInUrl('/solicitor-create-application/solicitor-create-applicationUploadSupportingDocuments');
    await I.runAccessibilityTest();
    await I.wait(3);
    await I.see('Applicant 1 uploaded documents (Optional)');

    // XB tests fail on Document upload. this is a known issue.
    // if (testConfig.TestForCrossBrowser && isAttachFileSupportedBrowser) {
    // await I.click(this.fields.addNewButton);
    // await I.attachFile(this.fields.chooseFile, 'data/fileupload.txt');
    // await I.fillField(this.fields.fileComment, 'Uploading a dummy file');
    // await I.wait(6);
    //}

    await I.wait(3);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
