const I = actor();

module.exports = {

  fields: {
    firstName: '#applicant1FirstName',
    lastName: '#applicant1LastName',
    applicant1_changedName: '#applicant1NameDifferentToMarriageCertificate_No',
    whoIsApplicant1Divorcing: '#divorceWho',
    addressLine1_Building:'#applicant1HomeAddress__detailAddressLine1',
    // applicant1Gender: '#applicant1Gender-male',
    sameSex: '#marriageFormationType-oppositeSexCouple',
    applicant1_postcode:'#applicant1HomeAddress__detailPostCode',
    applicant1_selected_address:'#applicant1HomeAddress_applicant1HomeAddress_addressList',
    findAddressButton:'button[type="button" ]',
    selectAddresssDropDown: '#applicant1HomeAddress_applicant1HomeAddress_addressList',
    applicant1_phoneNumber: '#applicant1PhoneNumber',
    applicant1_email: '#applicant1Email',
    keepPetitionerContactDetails: '#applicant1KeepContactDetailsConfidential_Yes',
    keepPetitionerContactDetailsNotConfidential: '#applicant1ContactDetailsType-public',

    submit: 'button[type="submit"]'
  },

  async fillFormAndSubmit() {
    await I.waitForElement(this.fields.firstName);
    await I.fillField(this.fields.firstName, 'E2E James');
    await I.fillField(this.fields.lastName, 'Patterson');
    await I.click(this.fields.applicant1_changedName);
    await I.selectOption(this.fields.whoIsApplicant1Divorcing, 'Wife');
    await I.selectOption(this.fields.applicant1Gender, 'Male');
    await I.click(this.fields.sameSex);
    await I.click('I can\'t enter a UK postcode');
    // TODO AddressSearch and select dropdown. ( Find Address button )
    await I.wait(3);
    await I.fillField(this.fields.addressLine1_Building, 'Building 007');
    await I.fillField(this.fields.applicant1_phoneNumber, '02086452154');
    await I.fillField(this.fields.applicant1_email, 'kasi.subramaniam@solirius.com');
    await I.click(this.fields.keepPetitionerContactDetailsNotConfidential);
    await I.wait(2);
    await I.waitForNavigationToComplete(this.fields.submit);
  }
};
