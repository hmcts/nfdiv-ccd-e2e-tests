const I = actor();
const testConfig = require('../tests/config');
const {currentCaseType,yesorno,divorceOrDissolution} = require('../common/constants');

module.exports = {

  fields: {
    jurisdiction: 'select[id="cc-jurisdiction"]',
    caseType: 'select[id="cc-case-type"]',
    applicationTypeSole: '#applicationType-soleApplication',
    applicationTypeJoint: '#applicationType-jointApplication',
    divorce:'#divorceOrDissolution-divorce',
    dissolution:'#divorceOrDissolution-dissolution',
    event: 'select[id="cc-event"]',
    submit: 'button[type="submit"]'
  },

  async clickCreateCase() {
    await I.waitForText('Create case');
    await I.click('Create case');

  },

  async fillFormAndSubmit() {
    if (testConfig.TestForCrossBrowser) {
      await I.wait(60);
    } else {
      await I.wait(5);
    }
    await I.waitForText('Family Divorce');
    await I.retry(5).selectOption(this.fields.jurisdiction, 'Family Divorce');
    await I.retry(5).selectOption(this.fields.caseType, currentCaseType);
    await I.wait(5);
    await I.retry(5).selectOption(this.fields.event, 'Apply:divorce or dissolution');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  },

  async fillHowDoYouWantToApplyForDivorce(soleOrJoint,divorceOrCivil) {
    if (testConfig.TestForCrossBrowser) {
      await I.wait(60);
    } else {
      await I.wait(5);
    }
    await I.waitForText('Is this a divorce or dissolution application?');

    if(divorceOrCivil === divorceOrDissolution.DIVORCE) {
      await I.retry(5).click(this.fields.divorce);
      console.log(' ...~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Divorce Chosen');
    }else {
      console.log(' ....  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   Dissolution Chosen');
      await I.retry(5).click(this.fields.dissolution);
    }

    if(soleOrJoint === yesorno.Yes ){
      await I.waitForText('Application type');
      await I.retry(5).click(this.fields.applicationTypeSole);
    }else{
      await I.retry(5).click(this.fields.applicationTypeJoint);
    }

    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
