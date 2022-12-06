const I = actor();

const testConfig = require('../tests/config');
const {yesorno,SoleOrJoint,divorceOrDissolution} = require('../common/constants');

module.exports = {

  fields: {
    jurisdiction: 'select[id="cc-jurisdiction"]',
    //jurisdictionSelect: '#cc-jurisdiction',
    //jurisdictionSelect: 'select[id="cc-jurisdiction"]',
    jurisdictionSelect: 'select[id="cc-jurisdiction"]',

    caseType: 'select[id="cc-case-type"]',
    applicationTypeSole: '#applicationType-soleApplication',
    applicationTypeJoint: '#applicationType-jointApplication',
    divorce:'#divorceOrDissolution-divorce',
    dissolution:'#divorceOrDissolution-dissolution',
    event: '#cc-event',
    stateOption: 'select[id="stateToTransitionApplicationTo"]',
    applicant1Represented: '#applicant1SolicitorRepresented_Yes',
    applicant2Represented: '#applicant2SolicitorRepresented_Yes',
    applicant2ID: '#applicant2UserId',
    caseNumberDisplay: 'markdown[class="markdown"] h3',
    submit: 'button[type="submit"]',
    continue: '#content > div > exui-ccd-connector > ccd-case-edit > ccd-case-edit-submit > div > form > div > button:nth-child(2)'
  },

  async clickCreateCase() {
    await I.waitForText('Create case',testConfig.TestTimeToWaitForText);
    await I.wait(5);
    await I.click('Create case');
    await I.wait(4);
  },

  async useCaseFilterUrl() {
    await I.amOnPage('/cases/case-filter');
    await I.waitForText('Create case',testConfig.TestTimeToWaitForText);
    await I.wait(5);
  },

  async createCaseBasedWithUrl(url) {
    console.log('URL is ::'+ url );
    await I.amOnPage(url);
    await I.see('Divorce');
    await I.see('Dissolution');
    await I.wait(4);
  },

  async createTestCaseWithUrl(url) {
    console.log('URL is ::'+ url );
    await I.amOnPage(url);
    await I.see('Create test case');
    await I.see('Application type');
    await I.see('Is applicant 1 represented');
    await I.see('Is applicant 2 represented');
    await I.wait(4);
  },

  async fillFormAndSubmit() {
    if (testConfig.TestForCrossBrowser) {
      await I.wait(7);
      I.waitForElement('select[id="cc-jurisdiction"]>option:nth-of-type(1)', testConfig.TestTimeToWaitForText);
      await I.retry(9).selectOption(this.fields.jurisdictionSelect, 'Family Divorce');

    } else {
      await I.wait(7);
      I.waitForElement('select[id="cc-jurisdiction"]>option:nth-of-type(1)', testConfig.TestTimeToWaitForText);
      await I.retry(9).selectOption(this.fields.jurisdictionSelect, 'Family Divorce');
    }

    if (testConfig.TestForCrossBrowser) {
      await I.wait(5);
      await I.retry(5).selectOption(this.fields.caseType, 'New Law Case');
    }else{
      await I.wait(5);
      await I.retry(5).selectOption(this.fields.caseType, 'New Law Case');
    }
    if (testConfig.TestForCrossBrowser) {
      await I.wait(5);
      await I.retry(5).selectOption(this.fields.event, 'Apply: divorce or dissolution');
    }
    else{
      // Apply: divorce or dissolution
      await I.wait(5);
      await I.retry(5).selectOption(this.fields.event, 'Apply: divorce or dissolution');
    }
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(1);
  },

  async fillTestCaseFormAndSubmit() {
    if (testConfig.TestForCrossBrowser) {
      await I.wait(60);
    } else {
      await I.wait(8);
    }

    await I.waitForText('Apply: divorce or dissolution',testConfig.TestTimeToWaitForText);
    await I.wait(5);
    await I.retry(5).selectOption(this.fields.event, 'Apply: divorce or dissolution');

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
      await I.wait(15);
    } else {
      await I.wait(5);
    }

    if(divorceOrCivil === divorceOrDissolution.DIVORCE) {
      await I.wait(5);
      await I.retry(5).click(this.fields.divorce);
      console.log(' ...~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Divorce Chosen');
    }else {
      console.log(' ....  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   Dissolution Chosen');
      await I.wait(5);
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
