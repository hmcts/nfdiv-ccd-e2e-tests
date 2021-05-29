const I = actor();

const { signOut } = require('../common/constants');

module.exports = {
  async checkPageAndSignOut() {
    await I.wait(1);
    await I.see("AwaitingHWFDecision")
    await I.see("Case submission")

    // check for Uploaded Docs as part of Documents Tab
    await I.click(signOut);
  }
};
