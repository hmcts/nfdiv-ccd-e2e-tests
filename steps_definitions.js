
'use strict';
// in this file you can append custom step methods to 'I' object

const LoginPage = require('./pages/LoginPage');
const CaseListPage = require('./pages/CaseListPage');
const CaseDetailsPage = require('./pages/CaseDetailsPage');
const CreateCasePage = require('./pages/CreateCasePage');
const AboutSolicitorPage = require('./pages/AboutSolicitorPage');
const AboutThePetitionerPage = require('./pages/AboutThePetitionerPage');
const AboutTheRespondentPage = require('./pages/AboutTheRespondentPage');
const RespSolicitorRepresented = require('./pages/RespSolicitorRepresented');
const JurisdictionPage = require('./pages/JurisdictionPage');
const ReasonForTheDivorcePage = require('./pages/ReasonForTheDivorcePage');
const StatementOfCaseAdulteryPage = require('./pages/StatementOfCaseAdulteryPage');
const StatementOfCaseBehaviourPage = require('./pages/StatementOfCaseBehaviourPage');
const StatementOfCaseDesertionPage = require('./pages/StatementOfCaseDesertionPage');
const StatementOfCaseSeparationDetail = require('./pages/StatementOfCaseSeparationDetail');
const LivedApartPage = require('./pages/LivedApartPage');
const StatementOfCaseAdulterySecPage = require('./pages/StatementOfCaseAdulterySecPage');
const OtherLegalProceedingsPage = require('./pages/OtherLegalProceedingsPage');
const FinancialOrdersPage = require('./pages/FinancialOrdersPage');
const ClaimForCostsPage = require('./pages/ClaimForCostsPage');
const UploadMarriageCertificatePage = require('./pages/UploadMarriageCertificatePage');
const SolCreateLanguagePrefPage = require('./pages/SolCreateLanguagePrefPage');
const SolCreateCheckYourAnswersPage = require('./pages/SolCreateCheckYourAnswersPage');
const SolCaseCreatedPage = require('./pages/SolCaseCreatedPage');
const StatementOfTruthAndRecPage = require('./pages/StatementOfTruthAndRecPage');
const FeeAccountPaymentCaseSubmissionPage = require('./pages/FeeAccountPaymentCaseSubmissionPage');
const HWFPaymentCaseSubmissionPage = require('./pages/HWFPaymentCaseSubmissionPage');
const HWFReferencePage=require('./pages/HWFReferencePage');
const CaseSubmissionOrderSummaryPage = require('./pages/CaseSubmissionOrderSummaryPage');
const CaseSubmissionAppCompletePage = require('./pages/CaseSubmissionAppCompletePage');
const CaseSubmissionCheckYourAnswersPage = require('./pages/CaseSubmissionCheckYourAnswersPage');
const SolAwaitingPaymentConfirmationPage = require('./pages/SolAwaitingPaymentConfirmationPage');
const CcdCaseCreatedLandingPage = require('./pages/CcdCaseCreatedLandingPage');
const AwaitingPetitionerPage = require('./pages/AwaitingPetitionerPage');
const IssuePage = require('./pages/IssuePage');
const IssueCheckYourAnswersPage = require('./pages/IssueCheckYourAnswersPage');
const CcdCaseCreatedPetitionIssuedLandingPage = require('./pages/CcdCaseCreatedPetitionIssuedLandingPage');
const IssueAosPackToRespondentCheckYourAnswersPage = require('./pages/IssueAosPackToRespondentCheckYourAnswersPage');
const IssueAosPackToRespondentLandingPage = require('./pages/IssueAosPackToRespondentLandingPage');
const AosStartedPage = require('./pages/AosStartedPage');
const AosStartedCheckYourAnswersPage = require('./pages/AosStartedCheckYourAnswersPage');
const AosReceivedUndefendedMoveToDN = require('./pages/AosReceivedUndefendedMoveToDN');
const SetTestDataForDA = require('./pages/SetTestDataForDA');
const SelectEventAndSubmit = require('./pages/SelectEventAndSubmit');
const SelectEvent = require('./pages/SelectEvent');
const MarriageCertificateDetailsPage = require('./pages/MarriageCertificateDetailsPage');
const TransferCaseToADifferentRDCsPage = require('./pages/TransferCaseToADifferentRDCsPage');
const TransferBetweenRDCsPage = require('./pages/TransferBetweenRDCsPage');
const TransferToRDCLandingPage = require('./pages/TransferToRDCLandingPage');
const ServiceApplicationReceivedPage = require('./pages/ServiceApplicationReceivedPage');
const ConfirmServicePaymentPage = require('./pages/ConfirmServicePaymentPage');
const ConfirmServiceForSolicitorPage = require('./pages/ConfirmServiceForSolicitorPage');
const IssueBailiffPackPage = require('./pages/IssueBailiffPackPage');
const MarriageBrokenDownPage = require('./pages/MarriageBrokenDownIrretrievablyPage');
const CaseworkerCheckStatAndEventPage = require('./pages/CaseworkerCheckStateAndEventDetailsPage');
const DivorceApplicationDetailsPage = require('./pages/DivorceApplicationDetailsPage');
const IssueApplicationCyaPage = require('./pages/IssueApplicationCyaPage');
const GeneralEmailPage = require('./pages/GeneralEmailPage');
const GeneralOrderPage = require('./pages/GeneralOrderPage');
const GeneralReferralPage = require('./pages/GeneralReferralPage');
const CaseNotesPage = require('./pages/CaseNotesPage');
const ChangeApplicationTypePage = require('./pages/ChangeApplicationTypePage');
const UpdateDueDatePage = require('./pages/UpdateDueDatePage');
const draftAosPage = require('./pages/DraftAoSPage.js');
const UpdateAosPage = require('./pages/UpdateAoSPage.js');
const submitAosPage = require('./pages/SubmitAoSPage.js');
const ConditionalOrderPage = require('./pages/ConditionalOrderPage.js');
const validatePetitionTabData = require ('./tabs/validatePetitionTabData');
const validateConfidentialPetitionerTab = require ('./tabs/validateConfidentialPetitionerTab');
const validateAOSTabData = require ('./tabs/validateAOSTabData');
const validateCoRespTabData = require ('./tabs/validateCoRespTabData');
const validateDecreeNisiTabData = require ('./tabs/validateDecreeNisiTabData');
const validateOutcomeOfDNTabData = require ('./tabs/validateOutcomeOfDNTabData');
const validateDecreeAbsoluteTabData = require ('./tabs/validateDecreeAbsoluteTabData');
const validateMarriageCertTabData = require ('./tabs/validateMarriageCertTabData');
const validateDocumentTabData = require ('./tabs/validateDocumentTabData');
const validatePaymentTabData = require ('./tabs/validatePaymentTabData');
const validateLanguageTabData = require ('./tabs/validateLanguageTabData');
const validateLinkedCaseTabData = require ('./tabs/validateLinkedCaseTabData');

module.exports = function () {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    amOnHomePage: function () {
      return this.amOnPage('');
    },

    amOnManageOrgPage: function(){
      return this.amOnManageOrgPage('');
    },

    login: function (email, password) {
      return LoginPage.submitLogin(email, password);
    },

    selectACaseFromList: function () {
      return CaseListPage.selectCase();
    },

    shouldBeOnCaseDetailsPage: function () {
      return CaseDetailsPage.shouldDisplayTabs();
    },

    shouldBeOnCaseListPage: function (caseNumber) {
      return CaseListPage.resetFilter(caseNumber);
    },

    startValidationHWFProcess: function (){
      return CaseListPage.checkEventAndStateAndBeginHWFValidation();
    },

    checkNextStepForEvent: function (eventName){
      return CaseListPage.clickNextStepForEvent(eventName);
    },

    ShouldBeAbleToFilterAnUrgentCase: function (urgent, state, caseNum) {
      return CaseListPage.urgentCaseFilter(urgent, state, caseNum);
    },

    shouldBeAbleToFilterAndSearchByCaseNumber: function (caseNum) {
      return CaseListPage.filterByCaseNumber(caseNum);
    },


    clickCreateCase: function() {
      return CreateCasePage.clickCreateCase();
    },

    clickCreateList: function() {
      return CaseListPage.clickCreateList();
    },

    fillCreateCaseFormAndSubmit() {
      return CreateCasePage.fillFormAndSubmit();
    },

    filterByCaseId : function(caseNumber){
      return CaseListPage.filterByCaseId(caseNumber);
    },

    issueDivorceApplication(){
      return DivorceApplicationDetailsPage.fillFormAndSubmit();
    },

    fillIssueApplicationEventDetails(){
      return DivorceApplicationDetailsPage.fillEventSummaryAndDescription();
    },

    fillIssueApplicationMarriageDetails(){
      return MarriageCertificateDetailsPage.fillMarriageDetails();
    },

    checkYourAnswersIssueApplication(){
      return IssueApplicationCyaPage.verifyCyaDetails();
    },

    // How do you want to apply for Divorce Sole/Joint
    fillSoleOrJointOptionForDivorce(soleApp,divorceOrCivil){
      return CreateCasePage.fillHowDoYouWantToApplyForDivorce(soleApp,divorceOrCivil);
    },

    fillAboutSolicitorFormAndSubmit() {
      return AboutSolicitorPage.fillFormAndSubmit();
    },

    fillAboutThePetitionerFormAndSubmit() {
      return AboutThePetitionerPage.fillFormAndSubmit();
    },

    fillAboutTheRespondentFormAndSubmit() {
      return AboutTheRespondentPage.fillFormAndSubmit();
    },

    fillAboutRespSolicitorFormAndSubmit() {
      return RespSolicitorRepresented.fillFormAndSubmit();
    },

    fillAboutRepresentedRespSolicitorFormAndSubmit() {
      return RespSolicitorRepresented.fillFormForRepresentedRespondentAndSubmit();
    },

    completeMarriageCertificateDetailsPageAndSubmit: function () {
      return MarriageCertificateDetailsPage.fillFormAndSubmit();
    },

    selectJurisdictionQuestionPageAndSubmit: function () {
      return JurisdictionPage.selectLegalActionsAndSubmit();
    },

    marriageBrokenDown: function () {
      return MarriageBrokenDownPage.hasMarriageBrokenDown();
    },


    selectReasonForTheDivorceQuestionPageAndSubmit: function (reason) {
      return ReasonForTheDivorcePage.fillFormAndSubmit(reason);
    },

    fillAdulteryDetailsFormAndSubmit() {
      return StatementOfCaseAdulteryPage.fillFormAndSubmit();
    },

    fillAdulteryDetailsSecondPageFormAndSubmit() {
      return StatementOfCaseAdulterySecPage.fillFormAndSubmit();
    },

    fillBehaviourDetailsFormAndSubmit() {
      return StatementOfCaseBehaviourPage.fillFormAndSubmit();
    },

    fillDesertionDetailsFormAndSubmit() {
      return StatementOfCaseDesertionPage.fillFormAndSubmit();
    },

    fillSeparationDetailsFormAndSubmit() {
      return StatementOfCaseSeparationDetail.fillFormAndSubmit();
    },

    fillLiveApartFormAndSubmit(reason) {
      return LivedApartPage.fillFormAndSubmit(reason);
    },

    otherLegalProceedings: function() {
      return OtherLegalProceedingsPage.fillFormAndSubmit();
    },

    financialOrdersSelectButton: function() {
      return FinancialOrdersPage.fillFormAndSubmit();
    },

    claimForCostsSelectButton: function() {
      return ClaimForCostsPage.fillFormAndSubmit();
    },

    uploadTheMarriageCertificateOptional: function() {
      return UploadMarriageCertificatePage.fillFormAndSubmit();
    },

    languagePreferenceSelection: function() {
      return SolCreateLanguagePrefPage.fillFormAndSubmit();
    },

    solicitorCreateCheckYourAnswerAndSubmit: function() {
      return SolCreateCheckYourAnswersPage.fillFormAndSubmit();
    },

    solicitorCaseCreatedAndSubmit: function() {
      return SolCaseCreatedPage.fillFormAndSubmit();
    },

    statementOfTruthAndReconciliationPageFormAndSubmit: function (urgent) {
      return StatementOfTruthAndRecPage.fillFormAndSubmit(urgent);
    },


    paymentWithHelpWithFeeAccount: function() {
      return FeeAccountPaymentCaseSubmissionPage.fillFormAndSubmit();
    },

    paymentWithPbaAccount: function(){
      return FeeAccountPaymentCaseSubmissionPage.fillFormPba();
    },

    fillPba:function() {
      return FeeAccountPaymentCaseSubmissionPage.fillPbaAccountNumberAndReference();
    },



    casePaymentWithHWFAndSubmissionPageFormAndSubmit: function() {
      return HWFPaymentCaseSubmissionPage.fillFormAndSubmit();
    },

    validateHWFCode:function(){
      return HWFReferencePage.fillFormAndSubmit();
    },

    fillHwfEventSummaryFor:function(caseNumber){
      return HWFReferencePage.fillFormAndSubmit(caseNumber);
    },

    hwfAccepted:function(caseNumber){
      return HWFReferencePage.hwfAcceptedSaveAndContinue(caseNumber);
    },


    fillHwfRefused:function(caseNumber) {
      return HWFReferencePage.fillHwfRefusedEventNotes(caseNumber);
    },

    createGeneralEmailDetails:function(caseNumber){
      return GeneralEmailPage.fillFormAndSubmit(caseNumber);
    },

    fillGeneralEmailCya:function(){
      return GeneralEmailPage.cyaGeneralEmail();
    },

    createGeneralOrderDetails:function(caseNumber){
      return GeneralOrderPage.fillFormAndSubmit(caseNumber);
    },

    fillGeneralOrderCya:function(caseNumber){
      return GeneralOrderPage.fillCya(caseNumber);
    },

    createGeneralReferral:function(caseNumber){
      return GeneralReferralPage.fillFormAndSubmit(caseNumber);
    },

    createGeneralReferralEventSummary:function(caseNumber){
      return GeneralReferralPage.submitGeneralReferral(caseNumber);
    },

    createAddCaseNotes:function(caseNumber){
      return CaseNotesPage.fillFormAndSubmit(caseNumber);
    },

    createAddCaseNoteEventSummary:function(caseNumber){
      return CaseNotesPage.fillEventSummaryAndDetail(caseNumber);
    },

    updateApplicationType:function(caseNumber){
      return ChangeApplicationTypePage.fillFormAndSubmit(caseNumber);
    },

    updateApplicationTypeSubmit:function(caseNumber){
      return ChangeApplicationTypePage.updateApplicationTypeSubmit(caseNumber);
    },

    updateDueDate:function(){
      return UpdateDueDatePage.fillFormAndSubmit();
    },

    updateDueDateEventSummary:function(caseNumber){
      return UpdateDueDatePage.submitUpdateDueDate(caseNumber);
    },

    caseOrderSummaryPageFormAndSubmit: function(paymentType) {
      return CaseSubmissionOrderSummaryPage.fillFormAndSubmit(paymentType);
    },

    caseApplicationCompletePageFormAndSubmit: function() {
      return CaseSubmissionAppCompletePage.fillFormAndSubmit();
    },

    caseCheckYourAnswersPageFormAndSubmit: function() {
      return CaseSubmissionCheckYourAnswersPage.fillFormAndSubmit();
    },

    solAwaitingPaymentConfPageFormAndSubmit: function() {
      return SolAwaitingPaymentConfirmationPage.checkPageAndSignOut();
    },

    // TODO refactor to generic name checkStateAndEvent
    checkStateAndEvent: function(state, event){
      return CaseworkerCheckStatAndEventPage.checkEventAndStateOnPageAndSignOut(state,event);
    },

    // TODO checkState and checkStateAndEvent to be refactored .
    checkState: function(state, event){
      return CaseworkerCheckStatAndEventPage.checkStateOnPage(state,event);
    },

    ccdCaseCreatedFromJsonLandingPageFormAndSubmit: function() {
      return CcdCaseCreatedLandingPage.fillFormAndSubmit();
    },

    awaitingPetitionerFormAndSubmit: function () {
      return AwaitingPetitionerPage.fillFormAndSubmit();
    },

    issueFromSubmittedPageFormAndSubmit: function() {
      return IssuePage.fillFormAndSubmit();
    },

    issueCheckYourAnswersPageFormAndSubmit: function() {
      return IssueCheckYourAnswersPage.fillFormAndSubmit();
    },

    petitionIssuedPageAndAosPackSelectPageFormAndSubmit: function() {
      return CcdCaseCreatedPetitionIssuedLandingPage.fillFormAndSubmit();
    },

    // aosPackIssueTestPageFormAndSubmit: function() {
    //   AosPackIssueTestPage.fillFormAndSubmit();
    // },

    draftAosContactDetails : function() {
      return draftAosPage.fillConfirmContactDetails();
    },

    draftAoSReview :  function(caseNumber) {
      return draftAosPage.fillReviewApplicant1_Application(caseNumber);
    },

    draftAoSDoYouAgree :  function(caseNumber) {
      return draftAosPage.doYouAgreeJurisdiction(caseNumber);
    },

    draftAoSAnyOtherLegalProceedings: function(caseNumber){
      return draftAosPage.anyOtherLegalProceedings(caseNumber);
    },

    draftAosCheckYourAnswers: function(caseNumber){
      return draftAosPage.draftAosCYA(caseNumber);
    },

    draftConditionalOrderReviewAoS:function(caseNumber) {
      return ConditionalOrderPage.fillReviewAoS();
    },

    draftConditionalOrderReviewApplicant1Application:function(){
      return ConditionalOrderPage.reviewApplicant1Application();
    },

    draftConditionalOrderDocuments:function() {
      return ConditionalOrderPage.draftConditionalOrderDocuments();
    },

    draftConditionalOrderCYA:function() {
      return ConditionalOrderPage.draftConditionalOrderCYA();
    },

    updateCOReviewAoS:function() {
      return ConditionalOrderPage.updateCOAoSReview();
    },

    updateCOReviewApplication:function() {
      return ConditionalOrderPage.updateCOReviewApplication();
    },

    updateCODocuments:function() {
      return ConditionalOrderPage.updateCODocuments();
    },

    updateCOAndSave:function() {
      return ConditionalOrderPage.updateSubmit();
    },


    submitSoTConditionalOrderDetails:function() {
      return ConditionalOrderPage.submitSoTDetails();
    },

    submitConditionalOrder:function() {
      return ConditionalOrderPage.submitConditionalOrder();
    },

    conditionalOrderClarification:function() {
      return ConditionalOrderPage.requestClarification();
    },

    conditionalOrderSubmitClarification:function() {
      return ConditionalOrderPage.submitClarification();
    },

    updateAoS:function(caseNumber){
      return UpdateAosPage.updateAoSDetails(caseNumber);
    },

    submitAosSOT: function(caseNumber) {
      return submitAosPage.fillSoTAndSoRDetails(caseNumber);
    },

    submitAosCYA : function(caseNumber) {
      return submitAosPage.checkYourAnswers(caseNumber);
    },

    aosPackIssueTestCheckYourAnswersPageFormAndSubmit: function() {
      return IssueAosPackToRespondentCheckYourAnswersPage.fillFormAndSubmit();
    },

    aosPackToRespondentLandingPageFormAndSubmit: function() {
      return IssueAosPackToRespondentLandingPage.fillFormAndSubmit();
    },

    aosReceivedUndefendedMoveToDNFormSubmit: function() {
      return AosReceivedUndefendedMoveToDN.fillFormAndSubmit();
    },

    setTestDataForDA: function() {
      return SetTestDataForDA.fillFormAndSubmit();
    },

    selectAndSubmitEvent: function(eventName) {
      return SelectEventAndSubmit.fillFormAndSubmit(eventName);
    },

    selectEvent: function(eventName) {
      return SelectEvent.fillFormAndSubmit(eventName);
    },

    signOut: function() {
      return SelectEvent.signOut();
    },

    aosStartedPageFormAndSubmit: function() {
      return AosStartedPage.fillFormAndSubmit();
    },

    aosStartedCheckYourAnswersPageFormAndSubmit: function() {
      return AosStartedCheckYourAnswersPage.fillFormAndSubmit();
    },

    changeToCourtsAndTribunalsServiceCentrePageFormAndSubmit: function() {
      return TransferCaseToADifferentRDCsPage.fillFormAndSubmit();
    },

    enterRDCChangeSummaryAndDescriptionPageFormAndSubmit: function() {
      return TransferBetweenRDCsPage.fillFormAndSubmit();
    },

    caseCreatedCTSCServiceCentrePageFormAndSubmit: function() {
      return TransferToRDCLandingPage.fillFormAndSubmit();
    },

    serviceApplicationReceivedPageFormAndSubmit: function(serviceApplicationType) {
      return ServiceApplicationReceivedPage.fillFormAndSubmit(serviceApplicationType);
    },

    confirmServicePaymentPageFormAndSubmit: function () {
      return ConfirmServicePaymentPage.fillFormAndSubmit();
    },

    confirmServiceForSolicitor:function (caseNumber) {
      return ConfirmServiceForSolicitorPage.fillServiceDetailsAndSubmit(caseNumber);
    },

    submitConfirmService: function(caseNumber){
      return ConfirmServiceForSolicitorPage.submitServiceDetails(caseNumber);
    },

    submitWithdrawnCW: function(caseNumber){
      return ConfirmServiceForSolicitorPage.submitWithdrawn(caseNumber);
    },

    submitRejectCW: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillRejectSubmit(caseNumber);
    },

    submitRejectCWSubmit: function(caseNumber){
      return ConfirmServiceForSolicitorPage.submitReject(caseNumber);
    },

    submitUploadDocCW: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillUploadDocCW(caseNumber);
    },

    submitUploadDocCWSubmit: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillUploadDocCWSubmit(caseNumber);
    },

    submitUploadConfidentialDocCW: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillUploadConfidentialDocCW(caseNumber);
    },

    submitUploadConfidentialDocCWSubmit: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillUploadConfidentialDocCWSubmit(caseNumber);
    },

    submitServiceApplicationReceived: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillServiceApplicationReceived(caseNumber);
    },

    submitServiceApplicationReceivedCYA: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillServiceApplicationReceivedCYA(caseNumber);
    },

    submitServiceApplicationReceivedBailiff: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillServiceApplicationReceivedBailiff(caseNumber);
    },

    submitServiceApplicationReceivedDispensed: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillServiceApplicationReceivedDispensed(caseNumber);
    },

    submitServiceApplicationReceivedCYABailiff: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillServiceApplicationReceivedCYA(caseNumber);
    },

    submitServiceApplicationPayment: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillServiceApplicationPayment(caseNumber);
    },

    submitServiceApplicationPaymentCYA: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillServiceApplicationPaymentCYA(caseNumber);
    },

    submitServiceApplicationPaymentSubmit: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillServiceApplicationPaymentSubmit(caseNumber);
    },

    submitServiceApplicationPaymentBailiff: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillServiceApplicationPayment(caseNumber);
    },

    submitServiceApplicationPaymentCYABailiff: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillServiceApplicationPaymentCYA(caseNumber);
    },

    submitServiceApplicationPaymentSubmitBailiff: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillServiceApplicationPaymentSubmit(caseNumber);
    },

    submitApproveServiceApplication: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillApproveServiceApplication(caseNumber);
    },

    submitApproveServiceApplicationCYA: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillApproveServiceApplicationCYA(caseNumber);
    },

    submitMakeBailiffDecision: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillMakeBailiffDecision(caseNumber);
    },

    submitMakeBailiffDecisionCYA: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillMakeBailiffDecisionCYA(caseNumber);
    },

    submitIssueBailiffPack: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillIssueBailiffPack(caseNumber);
    },

    submitIssueBailiffPackCYA: function(caseNumber){
      return ConfirmServiceForSolicitorPage.fillIssueBailiffPackCYA(caseNumber);
    },

    issueBailiffPackPageFormAndSubmit: function() {
      return IssueBailiffPackPage.fillFormAndSubmit();
    },

    validatePetitionTabData: function(reason,verifyContent) {
      return validatePetitionTabData(reason,verifyContent);
    },

    validateCoRespTabData: function(verifyContent) {
      return validateCoRespTabData(verifyContent);
    },

    validateDocumentTabData: function(reason, caseId) {
      return validateDocumentTabData(reason, caseId);
    },

    validateMarriageCertTabData: function(verifyContent) {
      return validateMarriageCertTabData(verifyContent);
    },

    validateAOSTabData: function(reason,verifyContent){
      return validateAOSTabData(reason,verifyContent);
    },

    validateDecreeNisiTabData: function(reason,verifyContent) {
      return validateDecreeNisiTabData(reason,verifyContent);
    },

    validateConfidentialPetitionerTab: function(verifyContent) {
      return validateConfidentialPetitionerTab(verifyContent);
    },

    validateOutcomeOfDNTabData: function(verifyContent) {
      return validateOutcomeOfDNTabData(verifyContent);
    },

    validateDecreeAbsoluteTabData: function(verifyContent) {
      return validateDecreeAbsoluteTabData(verifyContent);
    },

    validatePaymentTabData: function(verifyContent) {
      return validatePaymentTabData(verifyContent);
    },

    validateLanguageTabData: function(reason, verifyContent) {
      return validateLanguageTabData(reason, verifyContent);
    },

    validateLinkedCaseTabData: function(verifyContent) {
      return validateLinkedCaseTabData(verifyContent);
    }
  });
};
