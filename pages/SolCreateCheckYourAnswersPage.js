const {divorceOrDissolution} = require('../common/constants');

const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(union) {
    var unionUpperCase;
    if(union === divorceOrDissolution.DIVORCE){
      unionUpperCase = union.toUpperCase();
      await I.waitInUrl(`/${unionUpperCase}/NFD/solicitor-create-application/submit`);
    }else if ( union === divorceOrDissolution.DISSOLUTION){
      unionUpperCase = union.toUpperCase();
      await I.waitInUrl(`/${unionUpperCase}/NFD/solicitor-create-application/submit`);
    }
    await I.runAccessibilityTest();
    await I.see('Apply: divorce or dissolution');
    await I.see('Check your answers');
    await I.see('Check the information below carefully.');
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
