const {divorceOrDissolution} = require('../common/constants');

const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(union) {
    var upperCased;
    if(union === divorceOrDissolution.DIVORCE){
      upperCased = union.toUpperCase();
      await I.waitInUrl(`/${upperCased}/NFD/solicitor-create-application/submit`);
    }else if ( union === divorceOrDissolutionCaps.DISSOLUTION){
      upperCased = union.toUpperCase();
      await I.waitInUrl(`/${upperCased}/NFD/solicitor-create-application/submit`);
    }
    await I.runAccessibilityTest();
    await I.see('Apply: divorce or dissolution');
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
