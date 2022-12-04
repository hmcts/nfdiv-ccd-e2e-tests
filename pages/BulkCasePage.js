const I = actor();

module.exports = {

  fields: {
    applyConditionalOrderYes:'#coApplyForConditionalOrder_Yes',
    changeOrAddAnythingToApplication:'#coChangeOrAddToApplication_Yes',
    everythingInPetitionTrue:'#coIsEverythingInPetitionTrue_Yes',
    addNewDocumentsNo:'#coAddNewDocuments_No',
    jurisdictionAgreeNo:'#jurisdictionAgree_No',
    legalProceedingsExistsYes:'#legalProceedingsExist_Yes',
    legalProceedingsDescription:'#legalProceedingsDescription',
    sotSolicitorName:'#coSolicitorName',
    sotSolicitorFirm:'#coSolicitorFirm',
    reviewAoSYes:'#coApplyForConditionalOrder_Yes',
    updateChangeOrAddAnythingToApplication:'#coChangeOrAddToApplication_Yes',
    updateEverythingInPetitionTrue:'#coIsEverythingInPetitionTrue_Yes',
    updateAddNewDocumentsNo:'#coAddNewDocuments_No',
    sotSolicitorAdditionalComments:'#coSolicitorAdditionalComments',
    submit: 'button[type="submit"]'
  },

  async submitLinkWithBulkCase(caseNumber){
    await I.waitInUrl('system-link-with-bulk-case/submit');
    await I.wait(2);
    ////await I.runAccessibilityTest;
    await I.see('Link with bulk case');
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
