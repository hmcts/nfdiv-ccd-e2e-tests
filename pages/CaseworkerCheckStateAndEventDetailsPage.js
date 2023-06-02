const I = actor();

const { signOut } = require('../common/constants');

module.exports = {

  async checkEventAndStateOnPageAndSignOut(state, event) {
    await I.wait(7);
    await I.see(state);
    await I.see(event);
    await I.wait(5);
    await I.click(signOut);
  },

  async checkStateOnPage(state, event) {
    await I.wait(7);
    await I.see(state);
    await I.see(event);
    await I.wait(2);
  },
  async checkEventOnPage(event) {
    await I.wait(7);
    await I.see(event);
    await I.wait(2);
  },
  async checkApplicantTab(type){
    await I.click('#mat-tab-label-0-1');
    await I.wait(4);
    await I.see(type);
  }
};
