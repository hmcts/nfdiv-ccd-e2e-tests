const I = actor();
const testConfig = require('../tests/config');

module.exports = {

  fields: {
    addNewButton: 'button[type="button"]',
    chooseFile: 'input[id="applicant1DocumentsUploaded_0_documentLink"]',
    fileComment: '#applicant1DocumentsUploaded_0_documentComment',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('/solicitor-create-applicationUploadSupportingDocuments');
    await I.runAccessibilityTest();
    await I.see('Documents uploaded (Optional)');
    const isAttachFileSupportedBrowser = !(await I.isMicrosoftEdgeOrSafariBrowser());

    // TODO Remove , once sorted for Chromium browswer .
      //await I.click(this.fields.addNewButton);
      // await I.wait(5);
      // await I.attachFile(this.fields.chooseFile, 'data/fileupload.txt');
      // await I.wait(8);
      // await I.fillField(this.fields.fileComment, 'Uploading a dummy file');

    // existing code in master
    if (testConfig.TestForCrossBrowser && isAttachFileSupportedBrowser) {
      //await I.click(this.fields.addNewButton);
      //await I.attachFile(this.fields.chooseFile, 'data/fileupload.txt');
      //await I.fillField(this.fields.fileComment, 'Uploading a dummy file');
      await I.wait(6);

    }
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
