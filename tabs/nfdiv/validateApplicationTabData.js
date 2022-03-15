const I = actor();
const { firstLetterToCaps, formatDateToCcdDisplayDate } = require('../../helpers/utils');
const labels = require('../../data/tab-fields/nfdiv/application-tab-fields.json');

const commonFields = require('../../data/tab-fields/nfdiv/commonFields.json');
const { reasonsForDivorce } = require('../../common/constants');

module.exports = async (reason, verifyContent) => {
  await I.wait(3);
  await I.clickTab(labels.name);
  await I.wait(5);

  // Application Tab.
  await I.see(labels.whenApplicationCreated);
  await I.see(labels.whenApplicationSubmitted);
  await I.see(labels.whenApplicationIssued);
  await I.see(labels.applicationType);
  await I.see(verifyContent.applicationType);
  await I.see(labels.divorceOrCivil);
  await I.see(verifyContent.labelContentUnionTypeUC);
  await I.see(labels.rdc);

  await I.see(labels.labelContentTheApplicantOrApplicant1UC);
  await I.see(labels.firstName);
  await I.see(labels.lastName);
  await I.see(labels.middleName);

  await I.see(labels.gender);
  await I.see(labels.nameChanged);
  await I.see(labels.divorcingWho);
  await I.see(labels.marriageBrokenDown);
  await I.see(labels.phoneNumber);
  await I.see(labels.emailAddress);
  await I.see(labels.homeAddress);
  await I.see(labels.applicantSolicitor);
  await I.see(labels.solicitorRef);
  await I.see(labels.solicitorName);
  await I.see(labels.solicitorPhoneNumber);
  await I.see(labels.solicitorEmail);
  await I.see(labels.respondentHeading);
  await I.see(labels.nameChanged);
  await I.see(labels.shareRespondentContactDetails);
  await I.see(labels.respondentSolicitorHeading);
  await I.see(labels.solicitorName);
  await I.see(labels.solicitorEmail);
  await I.see(labels.marriageAndCertificate);
  await I.see(labels.marriagedate);
  await I.see(labels.applicantNameOnMarriageCert);
  await I.see(labels.respNameOnMarriageCert);
  await I.see(labels.sameSexCouple);
  await I.see(labels.marriageInUK);
  await I.see(labels.jurisdictionHeading);
  await I.see(labels.legalConnectionsHeading);
  await I.see(labels.anyPreviousCourtProceedings);
  await I.see(labels.doYouWantToApplyForFO);
  await I.see(labels.isUrgentCase);
  await I.see(labels.reconcileWithApplicant);
  await I.see(labels.reconciliationHelp);
  await I.see(labels.applicantAuthorises);
  await I.see(labels.yourName);
  await I.see(labels.firmName);
  await I.see(labels.additionalComments);

  // AoS, Documents, Service Application , Marriage Certificate

  // // Legal Connections

  // other tabs .
};
