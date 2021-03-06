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
  }

};
