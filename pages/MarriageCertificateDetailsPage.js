const I = actor();

module.exports = {

  fields: {
    marriageDateDay: '#marriageDate-day',
    marriageDateMonth: '#marriageDate-month',
    marriageDateYear: '#marriageDate-year',
    petitionerFullname: '#marriageApplicant1Name',
    respondentFullname: '#marriageApplicant2Name',
    didMarriageTakePlaceInUK: '#marriageMarriedInUk-Yes',
    placeOfMarriage:'#marriagePlaceOfMarriage',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitInUrl('solicitor-create-applicationMarriageCertificateDetails');
    await I.waitForElement(this.fields.marriageDateDay);
    await I.runAccessibilityTest();
    await I.fillField(this.fields.marriageDateDay, '09');
    await I.fillField(this.fields.marriageDateMonth, '04');
    await I.fillField(this.fields.marriageDateYear, '2011');
    await I.fillField(this.fields.petitionerFullname, 'James St Patrick');
    await I.fillField(this.fields.respondentFullname, 'Tasha St Patrick');
    await I.click(this.fields.didMarriageTakePlaceInUK);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  },

  // {caseId}/trigger/caseworker-issue-application/caseworker-issue-applicationissueApplication
  async fillMarriageDetails(){
    await I.waitInUrl('caseworker-issue-application/caseworker-issue-applicationissueApplication');
    await I.waitForElement(this.fields.marriageDateDay);
    await I.runAccessibilityTest();
    await I.fillField(this.fields.marriageDateDay, '09');
    await I.fillField(this.fields.marriageDateMonth, '12');
    await I.fillField(this.fields.marriageDateYear, '2002');
    await I.fillField(this.fields.placeOfMarriage,'Point Pedro');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(2);
  }
};
