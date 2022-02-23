const I = actor();
const { firstLetterToCaps, formatDateToCcdDisplayDate } = require('../../helpers/utils');
const labels = require('../../data/tab-fields/nfdiv/application-tab-fields.json');
const content = require('../../data/nfdiv/application-issued-case-data.json');

const commonFields = require('../../data/tab-fields/nfdiv/commonFields.json');
const { reasonsForDivorce } = require('../../common/constants');
// const {getCaseDetailsFor, dateYYYYMMDD} = require('../../../helpers/utils');
// const assert = require('assert');

module.exports = async (reason, verifyContent) => {
  await I.wait(3);
  await I.clickTab(labels.name);
  await I.wait(5);

  // Application Tab.
  await I.see(labels.whenApplicationCreated);

  //todo- dates & format issues

  // let caseResponse =  await getCaseDetailsFor(caseNumber);
  // let createdDate = case_data.createdDate;
  // assert.strictEqual(createdDate,createdDate);
  //
  // await I.see(content.createdDate);

  // await I.see(labels.whenApplicationIssued);
  // await I.see(content.issueDate);

  await I.see(labels.applicationType);
  await I.see(content.applicationType);

  await I.see(labels.divorceOrCivil);
  await I.see(content.labelContentUnionTypeUC);

  await I.see(labels.rdc);
  await I.see(content.courtsTribunalsServiceCentre);

  await I.see(labels.theApplicant);

  await I.see(labels.firstName);
  await I.see(content.applicant1FirstName);

  await I.see(labels.lastName);
  await I.see(content.applicant1LastName);

  await I.see(labels.middleName);
  await I.see(content.applicant1MiddleName);

  await I.see(labels.gender);
  await I.see(content.applicant1Gender);

  await I.see(labels.nameChanged);
  await I.see(content.applicant1NameDifferentToMarriageCertificate);

  await I.see(labels.divorcingWho);

  await I.see(labels.marriageBrokenDown);
  await I.see(content.applicant1ScreenHasMarriageBroken);

  await I.see(labels.phoneNumber);
  await I.see(content.applicant1PhoneNumber);

  await I.see(labels.emailAddress);
  await I.see(content.applicant1Email);

  // await I.see(labels.homeAddress); //has multiple fields within homeAddress
  // await I.see(content.applicant1HomeAddress);

  await I.see(labels.applicantSolicitor); //heading

  await I.see(labels.solicitorRef);
  await I.see(content.applicant1SolicitorReference);

  await I.see(labels.solicitorName);
  await I.see(content.applicant1SolicitorName);

  await I.see(labels.solicitorPhoneNumber);
  await I.see(content.applicant1SolicitorPhone);

  await I.see(labels.solicitorEmail);
  await I.see(content.applicant1SolicitorEmail);

  await I.see(labels.respondentHeading); //heading

  await I.see(labels.nameChanged);
  await I.see(content.applicant2NameDifferentToMarriageCertificate);

  await I.see(labels.shareRespondentContactDetails);
  await I.see(content.applicant1SolicitorPhone);

  await I.see(labels.respondentSolicitorHeading);

  await I.see(labels.solicitorName);
  await I.see(content.applicant1SolicitorName);

  await I.see(labels.solicitorEmail);
  await I.see(content.applicant1SolicitorEmail);

  await I.see(labels.solicitorAddress);
  await I.see(content.applicant1SolicitorAddress);

  await I.see(labels.marriageAndCertificate); //heading

  // await I.see(labels.marriagedate); //fails due to date formatting
  // await I.see(content.marriageDate);

  await I.see(labels.applicantNameOnMarriageCert);
  await I.see(content.marriageApplicant1Name);

  await I.see(labels.respNameOnMarriageCert);
  await I.see(content.marriageApplicant2Name);

  // await I.see(labels.sameSexCouple);
  // await I.see(content.marriageFormationType); //different formatting

  await I.see(labels.marriageInUK);
  await I.see(content.marriageMarriedInUk);

  await I.see(labels.jurisdictionHeading);
  await I.see(labels.legalConnectionsHeading);

  await I.see(labels.anyPreviousCourtProceedings);
  await I.see(content.applicant1LegalProceedings);

  await I.see(labels.doYouWantToApplyForFO);
  await I.see(content.applicant1FinancialOrder);

  await I.see(labels.isUrgentCase);
  await I.see(content.solUrgentCase);

  await I.see(labels.reconcileWithApplicant);
  await I.see(content.solStatementOfReconciliationDiscussed);

  await I.see(labels.reconciliationHelp); //not sure
  await I.see(content.solStatementOfReconciliationCertify);

  await I.see(labels.applicantAuthorises); //SOT App1?
  await I.see(content.applicant1StatementOfTruth); //applicant1PrayerHasBeenGivenCheckbox

  await I.see(labels.yourName);
  await I.see(content.solStatementOfReconciliationName);

  await I.see(labels.firmName);
  await I.see(content.solStatementOfReconciliationFirm);

  await I.see(labels.additionalComments);
  await I.see(content.statementOfReconciliationComments);

  // AoS, Documents, Service Application , Marriage Certificate

  // // Legal Connections

  // other tabs .
};
