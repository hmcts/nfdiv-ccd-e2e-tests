const I = actor();
const testConfig = require('../tests/config');
const {currentCaseType,yesorno,divorceOrDissolution} = require('../common/constants');

module.exports = {

  fields: {
    jurisdiction: 'select[id="cc-jurisdiction"]',
    caseType: 'select[id="cc-case-type"]',
    applicationType: 'select[id="applicationType"]',
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
    await I.waitForText('Apply for a divorce');
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
    await I.waitForText('How do you want to apply for the divorce?');

    if(soleOrJoint === yesorno.Yes ){
      await I.retry(5).selectOption(this.fields.applicationType, 'Sole Application');
    }else{
      await I.retry(5).selectOption(this.fields.applicationType, 'Joint Application');
    }

    if(divorceOrCivil === divorceOrDissolution.DIVORCE) {
      await I.retry(5).click(this.fields.divorce);
      console.log(' ...~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Divorce Chosen');
    }else {
      console.log(' ....  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   Dissolution Chosen');
      await I.retry(5).click(this.fields.dissolution);
    }
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
