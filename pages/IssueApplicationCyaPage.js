const {divorceOrDissolution} = require('../common/constants');
const I = actor();

module.exports = {

  fields: {
    eventSummary: '#field-trigger-summary',
    eventDescription:'#field-trigger-description',
    submit: 'button[type="submit"]'
  },

  async verifyCyaDetails(union) {
    var unionUpperCase;
    if(union === divorceOrDissolution.DIVORCE){
      unionUpperCase = union.toUpperCase();
      await I.waitInUrl('trigger/caseworker-issue-application/submit');
      await I.wait(7);
      // await I.waitInUrl('caseworker-issue-application/submit');
      await I.see('Check your answers');
      await I.see('Check the information below carefully.');
      await I.see('The applicant\'s full name as on marriage certificate');
      await I.see('The respondent full name as on marriage certificate');
      await I.see('Place of marriage');
      ////await I.runAccessibilityTest;
      await I.waitForNavigationToComplete(this.fields.submit);
      await I.wait(5);
    }else if ( union === divorceOrDissolution.DISSOLUTION){
      unionUpperCase = union.toUpperCase();
      // the switch to DISSOLUTION is not present in the URL Yet , but when done it will be a quick change.
      // await I.waitInUrl('/DIVORCE/NFD/caseworker-issue-application/caseworker-issue-applicationissueApplication');
      await I.waitInUrl('trigger/caseworker-issue-application/submit');
      await I.wait(7);
      // await I.waitInUrl('caseworker-issue-application/submit');
      await I.see('Check your answers');
      await I.see('Check the information below carefully.');
      await I.see('The applicant\'s full name as on civil partnership certificate');
      await I.see('The respondent full name as on civil partnership certificate');
      await I.see('Place of civil partnership');
      ////await I.runAccessibilityTest;
      await I.waitForNavigationToComplete(this.fields.submit);
      await I.wait(5);
    }
  },


  async verifyCyaDetailsJoint(union) {
    var unionUpperCase;
    if (union === divorceOrDissolution.DIVORCE) {
      unionUpperCase = union.toUpperCase();
      await I.waitInUrl('trigger/caseworker-issue-application/submit');
      await I.wait(7);
      // await I.waitInUrl('caseworker-issue-application/submit');
      await I.see('Check your answers');
      await I.see('Check the information below carefully.');
      await I.see('The applicant\'s full name as on marriage certificate');
      await I.see('Applicant 2 full name as on marriage certificate');
      await I.see('Place of marriage');
      ////await I.runAccessibilityTest;
      await I.waitForNavigationToComplete(this.fields.submit);
      await I.wait(5);
    } else if (union === divorceOrDissolution.DISSOLUTION) {
      unionUpperCase = union.toUpperCase();
      // the switch to DISSOLUTION is not present in the URL Yet , but when done it will be a quick change.
      // await I.waitInUrl('/DIVORCE/NFD/caseworker-issue-application/caseworker-issue-applicationissueApplication');
      await I.waitInUrl('trigger/caseworker-issue-application/submit');
      await I.wait(7);
      // await I.waitInUrl('caseworker-issue-application/submit');
      await I.see('Check your answers');
      await I.see('Check the information below carefully.');
      await I.see('The applicant\'s full name as on civil partnership certificate');
      await I.see('Applicant 2 full name as on civil partnership certificate');
      await I.see('Place of civil partnership');
      ////await I.runAccessibilityTest;
      await I.waitForNavigationToComplete(this.fields.submit);
      await I.wait(5);
    }
  }

};
