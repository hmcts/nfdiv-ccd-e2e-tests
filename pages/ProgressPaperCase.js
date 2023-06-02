const I = actor();
const {divorceOrDissolution} = require('../common/constants');
const testConfig = require('../tests/config');


module.exports = {

  fields: {
    progressOption: '#progressPaperCase',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(unionType) {
    console.log (' .. Within  AboutThePetitionerPage.js . Union Type is ==' + unionType);
    await I.selectOption(this.fields.progressOption,'Submitted');
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
