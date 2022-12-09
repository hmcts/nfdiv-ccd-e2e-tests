const I = actor();
const testConfig = require('../tests/config');

module.exports = {

  fields: {
    email: '#username',
    password: '#password',
    submit: 'input[type="submit"]'
  },

  async submitLogin(email, password) {
    await I.wait(5);
    await I.fillField(this.fields.email, email);
    await I.fillField(this.fields.password, password);
    await I.click(this.fields.submit);
    //The waitForNavigationToComplete is not working
    // await I.waitForNavigationToComplete(this.fields.submit,testConfig.TestTimeToWaitForText);
    //await I.wait(5);
    await I.waitInUrl('/cases',testConfig.TestTimeToWaitForText);
  }
};
