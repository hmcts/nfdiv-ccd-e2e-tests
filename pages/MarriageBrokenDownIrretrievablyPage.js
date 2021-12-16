const {divorceOrDissolution} = require('../common/constants');
const I = actor();

module.exports = {

  fields: {
    marriageBrokenDownYes: '#applicant1ScreenHasMarriageBroken_Yes',
    marriageBrokenDownNo: '#applicant1ScreenHasMarriageBroken_No',
    submit: 'button[type="submit"]'
  },

  async hasMarriageBrokenDown(union) {
    var unionUpperCase;
    if(union === divorceOrDissolution.DIVORCE){
      unionUpperCase = union.toUpperCase();
      await I.waitInUrl(`/${unionUpperCase}/NFD/solicitor-create-application/solicitor-create-applicationMarriageIrretrievablyBroken`);
      await I.waitForText('Has the applicant\'s marriage broken down irretrievably?');
    }else if ( union === divorceOrDissolution.DISSOLUTION){
      unionUpperCase = union.toUpperCase();
      // the switch to DISSOLUTION is not present in the URL Yet , but when done it will be a quick change.
      await I.waitInUrl('/DIVORCE/NFD/solicitor-create-application/solicitor-create-applicationMarriageIrretrievablyBroken');
      await I.waitForText('Has the applicant\'s civil partnership broken down irretrievably?');
    }
    // await I.waitForText('Has the applicant\'s marriage broken down irretrievably?');
    await I.runAccessibilityTest();
    await I.click(this.fields.marriageBrokenDownYes);

    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
