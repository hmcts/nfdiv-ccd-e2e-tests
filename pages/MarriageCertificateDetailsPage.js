const {divorceOrDissolution} = require('../common/constants');
const I = actor();

module.exports = {

  fields: {
    marriageDateDay: '#marriageDate-day',
    marriageDateMonth: '#marriageDate-month',
    marriageDateYear: '#marriageDate-year',
    petitionerFullname: '#marriageApplicant1Name',
    respondentFullname: '#marriageApplicant2Name',
    didMarriageTakePlaceInUK: '#marriageMarriedInUk_Yes',
    placeOfMarriage:'#marriagePlaceOfMarriage',
    placeOfCivilPartnership: '#marriagePlaceOfMarriage',
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
  async fillMarriageDetails(union){
    var unionUpperCase;
    if(union === divorceOrDissolution.DIVORCE){
      unionUpperCase = union.toUpperCase();
      await I.waitInUrl('trigger/caseworker-issue-application/caseworker-issue-applicationissueApplication');
      await I.waitForElement(this.fields.marriageDateDay);
      await I.runAccessibilityTest();
      await I.fillField(this.fields.marriageDateDay, '09');
      await I.fillField(this.fields.marriageDateMonth, '12');
      await I.fillField(this.fields.marriageDateYear, '2002');
      await I.fillField(this.fields.placeOfMarriage,'Point Pedro');
      await I.waitForNavigationToComplete(this.fields.submit);
      await I.wait(2);
    }else if ( union === divorceOrDissolution.DISSOLUTION){
      // unionUpperCase = union.toUpperCase();
      // the switch to DISSOLUTION is not present in the URL Yet , but when done it will be a quick change.
      // await I.waitInUrl('/DIVORCE/NFD/caseworker-issue-application/caseworker-issue-applicationissueApplication');
      await I.waitInUrl('trigger/caseworker-issue-application/caseworker-issue-applicationissueApplication');
      await I.waitForElement(this.fields.marriageDateDay);
      await I.runAccessibilityTest();
      await I.fillField(this.fields.marriageDateDay, '09');
      await I.fillField(this.fields.marriageDateMonth, '12');
      await I.fillField(this.fields.marriageDateYear, '2002');
      await I.fillField(this.fields.placeOfCivilPartnership,'Point Pedro');
      await I.waitForNavigationToComplete(this.fields.submit);
      await I.wait(2);
    }

  }
};
