const I = actor();

const { signOut } = require('../common/constants');

module.exports = {
  async checkPageAndSignOut() {
    await I.wait(1);
    await I.see('Awaiting HWF decision');

    await I.click(signOut);
    await I.wait(5);
    console.log('...~~~~~~~~~~~~~~~~ Solicitor Signed Out ~~~~~~~~~~~~~');

  }
};
