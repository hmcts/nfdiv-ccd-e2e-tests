const {yesorno,currentCaseType,bulkCaseReferenceCaseType} = require('../common/constants');
const I = actor();
const testConfig = require('../tests/config');


module.exports = {

  selectors: {
    caseLink: 'table tr:nth-last-child(1) a[href^="/cases/case-details/"]',
    jurisdictionSelect: '#wb-jurisdiction',
    caseTypeSelect: '#wb-case-type',
    caseStateSelect: '#wb-case-state',
    rdcSelect: '#D8DivorceUnit',
    solicitorPaymentMethodSelect: '#SolPaymentHowToPay',
    urgentFilterYes: '#SolUrgentCase_Yes',
    urgentFilterNo: '#SolUrgentCase_No',
    caseNumber:'#[CASE_REFERENCE]',
    eventSummary: '#field-trigger-summary'
  },
  fields: {
    selectActionDropDown: 'select[id="next-step"]',
    submit: 'button[type="submit"]'
  },

  async clickCreateList() {
    await I.waitForText('Case List');
    await I.click('Case List');
  },

  async selectCase() {
    await I.waitForElement(this.selectors.caseLink, 25);
    await I.click(this.selectors.caseLink);
  },

  async resetFilter(caseNumber) {
    await I.waitIn;
    await I.waitForElement(this.selectors.jurisdictionSelect);
    await I.retry(5).selectOption(this.selectors.jurisdictionSelect, 'Family Divorce');
    await I.waitForElement(this.selectors.caseTypeSelect);
    await I.selectOption(this.selectors.caseTypeSelect, currentCaseType);
    await I.waitForElement(this.selectors.caseStateSelect);
    await I.selectOption(this.selectors.caseStateSelect, 'Any');
    // await I.fillField(this.fields.caseNumber, caseNumber);
    await I.wait(3);
    if (testConfig.TestForCrossBrowser) {
      await I.wait(5);
    }
    await I.click('Apply');
    if (testConfig.TestForCrossBrowser) {
      await I.wait(3);
    }
  },

  async filterByCaseId(caseNumber) {

    if (testConfig.TestForCrossBrowser) {
      await I.wait(3);
    }

    await I.waitForElement(this.selectors.jurisdictionSelect);
    await I.retry(5).selectOption(this.selectors.jurisdictionSelect, 'Family Divorce');
    await I.waitForElement(this.selectors.caseTypeSelect);
    await I.selectOption(this.selectors.caseTypeSelect, 'New Law Case');
    await I.waitForElement(this.selectors.caseStateSelect);
    await I.selectOption(this.selectors.caseStateSelect, 'Any');
    await I.wait(5);

    if (testConfig.TestForCrossBrowser) {
      await I.wait(8);
    }

    //await I.fillField(this.fields.caseNumber, caseNumber); // Does nt work
    await I.wait(3);
    await I.click('Apply');
  },

  async filterByBulkCaseReference(caseNumber) {
    await I.waitForElement(this.selectors.jurisdictionSelect);
    await I.retry(5).selectOption(this.selectors.jurisdictionSelect, 'Family Divorce');
    await I.waitForElement(this.selectors.caseTypeSelect);
    await I.selectOption(this.selectors.caseTypeSelect, 'New Law Bulk Case');
    await I.waitForElement(this.selectors.caseStateSelect);
    await I.selectOption(this.selectors.caseStateSelect, 'Any');
    // await I.fillField(this.fields.caseNumber, caseNumber);
    await I.wait(5);
    await I.click('Apply');
    await I.wait(3);
  },

  async checkEventAndStateAndBeginHWFValidation(){
    await I.see('Awaiting HWF decision');
    await I.see('Case submission');
    // await I.waitForElement(this.fields.selectActionDropDown);
    // await I.selectOption(this.fields.selectActionDropDown, eventName);
    // await I.wait(3);
    // await I.waitForNavigationToComplete(this.fields.submit);
  },

  async   clickNextStepForEvent(eventName){
    await I.waitForElement(this.fields.selectActionDropDown);
    await I.selectOption(this.fields.selectActionDropDown, eventName);
    await I.wait(3);
    await I.waitForNavigationToComplete(this.fields.submit);
    await I.wait(8);
  },



  async urgentCaseFilter(urgent, state = 'Any', caseNum) {
    await I.waitForElement(this.selectors.jurisdictionSelect);
    await I.retry(5).selectOption(this.selectors.jurisdictionSelect, 'Family Divorce');
    await I.waitForElement(this.selectors.caseTypeSelect);
    await I.retry(5).selectOption(this.selectors.caseTypeSelect, 'Divorce case - v115.00');
    await I.waitForElement(this.selectors.caseStateSelect);
    await I.selectOption(this.selectors.caseStateSelect, state);
    await I.waitForElement(this.selectors.rdcSelect);
    await I.waitForElement(this.selectors.solicitorPaymentMethodSelect);
    if (urgent === yesorno.Yes) {
      await I.click(this.selectors.urgentFilterYes);
    } else {
      await I.click(this.selectors.urgentFilterNo);
    }
    await I.see('Create case');
    await I.click('Apply');
    await I.waitForText('Last Modified');
    await I.click('Last Modified');
    await I.waitForText(caseNum);
    await I.click(caseNum);
  },

  async shouldBeAbleToFilterAndSearch(caseNum) {
    await I.waitForElement(this.selectors.jurisdictionSelect);
    await I.retry(5).selectOption(this.selectors.jurisdictionSelect, 'Family Divorce');
    await I.waitForElement(this.selectors.caseTypeSelect);
    await I.retry(5).selectOption(this.selectors.caseTypeSelect, currentCaseType);
    await I.see('Create case');
    await I.click('Apply');
    await I.waitForText('Last Modified');
    await I.click('Last Modified');
    await I.waitForText(caseNum);
    await I.click(caseNum);
  }

};
