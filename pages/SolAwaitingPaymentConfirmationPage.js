const I = actor();

const { signOut } = require('../common/constants');

module.exports = {
  async checkPageAndSignOut() {
    await I.wait(5);
    await I.see('Awaiting HWF decision');
    await I.wait(5);
    await I.click(signOut);
    await I.wait(5);
    console.log('...~~~~~~~~~~~~~~~~ Solicitor Signed Out ~~~~~~~~~~~~~');

  }
};
