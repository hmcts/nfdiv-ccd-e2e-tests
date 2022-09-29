const I = actor();

const testConfig = require('../tests/config');
const {yesorno,SoleOrJoint,divorceOrDissolution} = require('../common/constants');

module.exports = {

  fields: {
    jurisdiction: 'select[id="cc-jurisdiction"]',
    caseType: 'select[id="cc-case-type"]',
    applicationTypeSole: '#applicationType-soleApplication',
    applicationTypeJoint: '#applicationType-jointApplication',
    divorce:'#divorceOrDissolution-divorce',
    dissolution:'#divorceOrDissolution-dissolution',
    event: 'select[id="cc-event"]',
    stateOption: 'select[id="stateToTransitionApplicationTo"]',
    applicant1Represented: '#applicant1SolicitorRepresented_Yes',
    applicant2Represented: '#applicant2SolicitorRepresented_Yes',
    applicant2ID: '#applicant2UserId',
    caseNumberDisplay: 'markdown[class="markdown"] h3',
    submit: 'button[type="submit"]',
    continue: '#content > div > exui-ccd-connector > ccd-case-edit > ccd-case-edit-submit > div > form > div > button:nth-child(2)'
  },

  async clickCreateCase() {
    await I.waitForText('Create case');
    await I.click('Create case');

  },

  async fillFormAndSubmit() {
    if (testConfig.TestForCrossBrowser) {
      await I.wait(20);
    } else {
      await I.wait(5);
    }
    if (testConfig.TestForCrossBrowser) {
      await I.wait(15);
      await I.waitForText('Family Divorce');
      await I.retry(5).selectOption(this.fields.jurisdiction, 'Family Divorce');
    } else {
      await I.wait(12);
      await I.waitForText('Family Divorce');
      await I.retry(5).selectOption(this.fields.jurisdiction, 'Family Divorce');
    }

    if (testConfig.TestForCrossBrowser) {
      await I.wait(10);
      await I.retry(5).selectOption(this.fields.caseType, 'New Law Case');
    }else{
      await I.wait(8);
      await I.retry(5).selectOption(this.fields.caseType, 'New Law Case');
    }
    if (testConfig.TestForCrossBrowser) {
      await I.wait(10);
      await I.retry(5).selectOption(this.fields.event, 'Apply: divorce or dissolution');
    }
    else{
      await I.wait(8);
      await I.retry(5).selectOption(this.fields.event, 'Apply: divorce or dissolution');
    }
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  },

  async fillTesCaseFormAndSubmit() {
    if (testConfig.TestForCrossBrowser) {
      await I.wait(60);
    } else {
      await I.wait(8);
    }
    await I.waitForText('Family Divorce');
    await I.retry(5).selectOption(this.fields.jurisdiction, 'Family Divorce');
    await I.retry(5).selectOption(this.fields.caseType, 'New Law Case');
    await I.retry(5).selectOption(this.fields.event, 'Create test case');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  },

  async fillCreateTestCase() {

    await I.waitForText('Create test case');
    await I.retry(5).click(this.fields.applicationTypeSole);
    await I.retry(5).click(this.fields.applicant1Represented);
    await I.retry(5).click(this.fields.applicant2Represented);
    await I.retry(5).fillField(this.fields.applicant2ID, '93b108b7-4b26-41bf-ae8f-6e356efb11b3');
    await I.retry(5).selectOption(this.fields.stateOption, 'Awaiting final order');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async createTestCaseInAwaitingPronouncement() {
    await I.waitForText('Create test case');
    await I.retry(5).click(this.fields.applicationTypeSole);
    await I.retry(5).click(this.fields.applicant1Represented);
    await I.retry(5).click(this.fields.applicant2Represented);
    await I.retry(5).fillField(this.fields.applicant2ID, '93b108b7-4b26-41bf-ae8f-6e356efb11b3');
    await I.retry(5).selectOption(this.fields.stateOption, 'Listed; awaiting pronouncement');
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(6);
  },

  async pressSubmit() {
    await I.retry(5).click(this.fields.continue);
    await I.waitForElement(this.fields.caseNumberDisplay);
    const display = await I.grabTextFrom(this.fields.caseNumberDisplay);
    await I.wait(1);
    return display;
  },

  async fillHowDoYouWantToApplyForDivorce(soleOrJoint,divorceOrCivil) {
    if (testConfig.TestForCrossBrowser) {
      await I.wait(60);
    } else {
      await I.wait(5);
    }

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
