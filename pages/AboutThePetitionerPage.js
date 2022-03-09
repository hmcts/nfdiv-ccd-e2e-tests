const I = actor();
const {divorceOrDissolution} = require('../common/constants');


module.exports = {

  fields: {
    firstName: '#applicant1FirstName',
    lastName: '#applicant1LastName',
    applicant1_changedName: '#applicant1NameDifferentToMarriageCertificate_No',
    whoIsApplicant1Divorcing: '#divorceWho',
    addressLine1_Building:'#applicant1Address_applicant1Address_postcodeInput',
    applicant1Gender: '#applicant1Gender-male',
    oppositeSex: '#marriageFormationType-oppositeSexCouple',
    findAddressButton:'button[type="button" ]',
    applicant1_phoneNumber: '#applicant1PhoneNumber',
    applicant1_email: '#applicant1Email',
    keepPetitionerContactDetails: '#applicant1KeepContactDetailsConfidential_Yes',
    keepPetitionerContactDetailsNotConfidential: '#applicant1ContactDetailsType-public',
    addressButton: '#applicant1Address_applicant1Address_postcodeLookup > button',
    addressOption: 'select[id="applicant1Address_applicant1Address_addressList"]',
    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit(unionType) {
    console.log (' .. Within  AboutThePetitionerPage.js . Union Type is ==' + unionType);
    await I.waitForElement(this.fields.firstName);
    await I.fillField(this.fields.firstName, 'E2E James');
    await I.fillField(this.fields.lastName, 'Patterson');
    await I.click(this.fields.applicant1_changedName);


    if(unionType === divorceOrDissolution.DIVORCE){
      await I.selectOption(this.fields.whoIsApplicant1Divorcing, 'Wife');
    }
    if(unionType === divorceOrDissolution.DISSOLUTION){
      await I.wait(2);
      await I.click(this.fields.applicant1Gender);
    }

    // Same sex or oppositeSex Couple ?
    await I.click(this.fields.oppositeSex);
    await I.fillField(this.fields.applicant1_phoneNumber, '02086452154');
    await I.fillField(this.fields.applicant1_email, 'kasi.subramaniam@solirius.com');

    await I.click(this.fields.addressLine1_Building);
    await I.fillField(this.fields.addressLine1_Building, 'SW1A 1BJ');
    await I.wait(3);

    await I.click(this.fields.addressButton);
    if (testConfig.TestForCrossBrowser) {
      await I.wait(8);
    }
    await I.wait(3);
    await I.waitForElement(this.fields.addressOption);
    await I.wait(3);
    await I.selectOption(this.fields.addressOption, '22 St. James\'s Palace, London');
    await I.click(this.fields.keepPetitionerContactDetailsNotConfidential);
    await I.waitForNavigationToComplete(this.fields.submit);

  }
};
