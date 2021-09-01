const I = actor();
const testConfig = require('../tests/config');
const {currentCaseType,yesorno} = require('../common/constants');

module.exports = {

  fields: {
    jurisdiction: 'select[id="cc-jurisdiction"]',
    caseType: 'select[id="cc-case-type"]',
    applicationType: 'select[id="applicationType"]',
    divorceOrDissolutionDivorce:'#divorceOrDissolution-divorce',
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
    await I.retry(5).selectOption(this.fields.event, 'Apply for a divorce');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  },

  async fillHowDoYouWantToApplyForDivorce(soleOrJoint) {
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

    await I.click(this.fields.divorceOrDissolutionDivorce);

    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  }
};
