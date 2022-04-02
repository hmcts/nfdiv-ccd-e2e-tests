const I = actor();
const { firstLetterToCaps, formatDateToCcdDisplayDate } = require('../../helpers/utils');
const labels = require('../../data/tab-fields/nfdiv/application-tab-fields.json');
const content = require('../../data/tab-fields/nfdiv/application-issued-case-data');

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
  await I.see(labels.dueDate);
  await I.see(labels.applicationType);
  await I.see(content.applicationType);
  await I.see(labels.divorceOrCivil);
  await I.see(content.labelContentUnionTypeUC);
  await I.see(labels.rdc);
  await I.see(content.courtsTribunalsServiceCentre);

  //The applicant
  await I.see(labels.labelContentTheApplicantOrApplicant1UC);
  await I.see(labels.firstName);
  await I.see(content.applicant1FirstName);
  await I.see(labels.middleName);
  await I.see(content.applicant1MiddleName);
  await I.see(labels.lastName);
  await I.see(content.applicant1LastName);
  await I.see(labels.gender);
  await I.see(content.applicant1Gender);
  await I.see(labels.sameSexCouple);
  await I.see(content.applicant1Gender);//will need to be hard coded
  await I.see(labels.nameChanged);
  await I.see(content.applicant1NameDifferentToMarriageCertificate);
  await I.see(labels.divorcingWho);
  await I.see(content.divorceWho);
  await I.see(labels.marriageBrokenDown);
  await I.see(content.applicant1ScreenHasMarriageBroken);
  await I.see(labels.offline);
  await I.see(content.applicant1Offline);
  await I.see(labels.phoneNumber);
  await I.see(content.applicant1PhoneNumber);
  await I.see(labels.emailAddress);
  await I.see(content.applicant1Email);
  await I.see(labels.homeAddress); //will need to be hardcoded
  await I.see(labels.applicantBelievesFacts);
  await I.see(content.applicant1StatementOfTruth);

  //the applicant's sol
  await I.see(labels.applicantSolicitor);
  await I.see(labels.solicitorRef);
  await I.see(content.applicant1SolicitorReference);
  await I.see(labels.solicitorName);
  await I.see(content.applicant1SolicitorName);
  await I.see(labels.solicitorAddress); //will need to be hardcoded
  await I.see(labels.solicitorPhoneNumber);
  await I.see(content.applicant1SolicitorPhone);
  await I.see(labels.solicitorEmail);
  await I.see(content.applicant1SolicitorEmail);
  await I.see(labels.caseAssignedRole);
  await I.see(content.applicant1SolicitorOrganisationPolicy.OrgPolicyCaseAssignedRole);
  await I.see(labels.serviceByEmail);
  await I.see(content.applicant1StatementOfTruth);
  await I.see(labels.anyPreviousCourtProceedings);
  await I.see(content.applicant1LegalProceedings);
  await I.see(labels.doYouWantToApplyForFO);
  await I.see(content.applicant1FinancialOrder);

  //The respondent
  await I.see(labels.respondentHeading);
  await I.see(labels.respondentFirstName);
  await I.see(content.applicant2FirstName);
  await I.see(labels.respondentMiddleName);
  await I.see(content.applicant2MiddleName);
  await I.see(labels.respondentLastName);
  await I.see(content.applicant2LastName);
  await I.see(labels.respondentGender);
  await I.see(content.applicant2Gender);
  await I.see(labels.respondentNameChanged);
  await I.see(content.applicant1NameDifferentToMarriageCertificate);
  await I.see(labels.respondentOffline);
  await I.see(content.applicant2Offline);
  await I.see(labels.RespondentEmailAddress);
  await I.see(content.applicant2Email);
  await I.see(labels.RespondentHomeAddress); //will need to be hardcoded

  //the respondent sol
  await I.see(labels.respondentSolicitorHeading);
  await I.see(labels.respondentSolicitorRef);
  await I.see(content.applicant2SolicitorReference);
  await I.see(labels.respondentSolicitorName);
  await I.see(content.applicant2SolicitorName);
  await I.see(labels.respondentSolicitorAddress);
  await I.see(content.applicant2SolicitorAddress);
  await I.see(labels.respondentSolicitorPhoneNumber);
  await I.see(content.applicant2SolicitorPhone);
  await I.see(labels.respondentSolicitorEmail);
  await I.see(content.applicant2SolicitorEmail);
  await I.see(labels.respondentCaseAssignedRole);
  await I.see(content.applicant2SolicitorOrganisationPolicy.OrgPolicyCaseAssignedRole);

  //marriage & certificate
  await I.see(labels.marriageAndCertificate);
  await I.see(labels.marriageDate); //will need to be hardcoded
  await I.see(labels.applicantNameOnMarriageCert);
  await I.see(content.marriageApplicant1Name);
  await I.see(labels.respNameOnMarriageCert);
  await I.see(content.marriageApplicant2Name);
  await I.see(labels.marriageInUK);
  await I.see(content.marriageMarriedInUk);
  await I.see(labels.placeOfMarriage);
  await I.see(content.marriagePlaceOfMarriage);
  await I.see(labels.countryOfMarriage);
  await I.see(content.marriageCountryOfMarriage);

  //Jurisdiction
  await I.see(labels.jurisdictionHeading);
  await I.see(labels.legalConnectionsHeading); // 3 sections that need to be checked
  await I.see(labels.isUrgentCase);
  await I.see(content.solUrgentCase);
  await I.see(labels.reconcileWithApplicant);
  await I.see(content.solStatementOfReconciliationDiscussed);
  await I.see(labels.reconciliationHelp);
  await I.see(content.solStatementOfReconciliationCertify);

  await I.see(labels.applicantAuthorises); // need to figure how content for this

  await I.see(content.marriageCountryOfMarriage);
  await I.see(labels.yourName);
  await I.see(content.solStatementOfReconciliationName);
  await I.see(labels.firmName);
  await I.see(content.solStatementOfReconciliationFirm);
  // await I.see(labels.additionalComments);
  // await I.see(content.statementOfReconciliationComments);
  await I.see(labels.howShouldRespondentBeServed); //will need to be hardcoded
  // await I.see(content.statementOfReconciliationComments);
};
