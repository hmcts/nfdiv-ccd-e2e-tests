const I = actor();

module.exports = {

  fields: {
    selectActionDropDown: 'select[id="next-step"]',
    marriageDateDay: '#solServiceDateOfService-day',
    marriageDateMonth: '#solServiceDateOfService-month',
    marriageDateYear: '#solServiceDateOfService-year',
    solServiceDocumentsServed:'#solServiceDocumentsServed',
    solServiceOnWhomServed:'#solServiceOnWhomServed',
    selectOptionSolServiceHowServed:'#solServiceHowServed',
    addressServed:'#solServiceAddressServed',
    solServiceBeingApplicant:'#solServiceBeingThe-applicants',
    solicitorName:'#solServiceServiceSotName',
    solicitorFirmName:'#solServiceServiceSotFirm',
    serviceLocationServed:'#solServiceLocationServed',
    submit: 'button[type="submit"]',
    addNew: 'button[type="button"]',
    documentUpload: 'input[id="documentsUploaded_0_documentLink"]',
    confidentialDocumentUpload:'input[id="confidentialDocumentsUploaded_0_documentLink"]',
    confidentialDocumentComment:'#confidentialDocumentsUploaded_0_documentComment',
    confidentialDocumentType:'#confidentialDocumentsUploaded_0_confidentialDocumentsReceived',
    applicationDateDay: 'receivedServiceApplicationDate-day',
    applicationDateMonth: 'receivedServiceApplicationDate-month',
    applicationDateYear: 'receivedServiceApplicationDate-year',
    selectAlternativeServiceType: '#alternativeServiceType',
    selectPaymentMethod: '#servicePaymentFeePaymentMethod',
    serviceAppGranted: '#serviceApplicationGranted_Yes',
    serviceAppGrantedNo: '#serviceApplicationGranted_No',
    bailiffRefusalReason: '#serviceApplicationRefusalReason',
    deemedDateDay: '#deemedServiceDate-day',
    deemedDateMonth: '#deemedServiceDate-month',
    deemedDateYear: '#deemedServiceDate-year',
    localCourtName: '#localCourtName',
    localCourtEmail: '#localCourtEmail',
    selectRejectReason: '#rejectReason_rejectReasonType',
    rejectDetailsTextBox: '#rejectReason_rejectDetails',
    digitalAoS: '#reissueOption-digitalAos',
    offlineAoS: '#reissueOption-offlineAos',
    reissueCase: '#reissueOption-reissueCase',
    courtNameBirmingham: '#court-birmingham',
    hearingDateDay: 'dateAndTimeOfHearing-day',
    hearingDateMonth: 'dateAndTimeOfHearing-month',
    hearingDateYear: 'dateAndTimeOfHearing-year',
    hearingDateHour: 'dateAndTimeOfHearing-hour',
    hearingDateMinute: 'dateAndTimeOfHearing-minute',
    hearingDateSecond: 'dateAndTimeOfHearing-second',
    LADecisionDateDateDay: 'decisionDate-day',
    LADecisionDateDateMonth: 'decisionDate-month',
    LADecisionDateDateYear: 'decisionDate-year',
    judgePronouncedYes: '#hasJudgePronounced_Yes',
    bulkCaseReferenceNumber:'#bulkListCaseDetails_0_caseReference'
  },

  async fillServiceDetailsAndSubmit(caseNumber) {
    await I.waitInUrl('solicitor-confirm-service/solicitor-confirm-serviceSolConfirmService');
    await I.see('Certificate of Service - Confirm Service\n');
    // await I.see('Awaiting service');

    await I.fillField(this.fields.marriageDateDay, '09');
    await I.fillField(this.fields.marriageDateMonth, '12');
    await I.fillField(this.fields.marriageDateYear, '2002');
    await I.fillField(this.fields.solServiceDocumentsServed,'Marriage Certificate');
    await I.fillField(this.fields.solServiceOnWhomServed,'Partner');
    await I.fillField(this.fields.addressServed,'Flat 3, 27 Heigham Street, Norwich NR2 4TE');


    await I.selectOption(this.fields.selectOptionSolServiceHowServed, 'By personally handing it to or leaving it with');

    await I.click(this.fields.solServiceBeingApplicant);

    await I.selectOption(this.fields.serviceLocationServed,'principal office of the corporation');
    await I.fillField(this.fields.solicitorName, 'James Porter');
    await I.fillField(this.fields.solicitorFirmName,'Porter & Co.');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitServiceDetails(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('solicitor-confirm-service/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitWithdrawn(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-withdrawn/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillRejectSubmit(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-rejected/caseworker-rejectedreject');
    await I.selectOption(this.fields.selectRejectReason,'No information');
    await I.fillField(this.fields.rejectDetailsTextBox, 'Script Reject Details');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async submitReject(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-rejected/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillUploadDocCW(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-upload-document/caseworker-upload-documentuploadDocument');
    await I.waitForNavigationToComplete(this.fields.addNew);
    // await I.attachFile(this.fields.documentUpload, 'data/fileupload.txt');
    await I.wait(5);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillUploadDocCWSubmit(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('/caseworker-upload-document/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillUploadConfidentialDocCW(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-upload-confidential-document/caseworker-upload-confidential-documentuploadConfidentialDocuments');
    await I.wait(3);
    I.click(locate('.button').withText('Add new'));
    //await I.waitForNavigationToComplete(this.fields.addNew);
    await I.wait(3);
    await I.attachFile(this.fields.confidentialDocumentUpload, 'data/fileupload.txt');
    await I.wait(5);
    await I.see('Confidential documents uploaded');
    await I.fillField(this.fields.confidentialDocumentComment, 'Uploading a dummy file');
    await I.selectOption(this.fields.confidentialDocumentType,'Marriage Certificate');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillUploadConfidentialDocCWSubmit(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-upload-confidential-document/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },


  async fillServiceApplicationReceived(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-received/caseworker-service-receivedserviceApplicationReceived');
    await I.fillField(this.fields.applicationDateDay, '27');
    await I.fillField(this.fields.applicationDateMonth, '09');
    await I.fillField(this.fields.applicationDateYear, '2022');
    await I.selectOption(this.fields.selectAlternativeServiceType,'Deemed as served');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationReceivedDispensed(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-received/caseworker-service-receivedserviceApplicationReceived');
    await I.fillField(this.fields.applicationDateDay, '27');
    await I.fillField(this.fields.applicationDateMonth, '09');
    await I.fillField(this.fields.applicationDateYear, '2022');
    await I.selectOption(this.fields.selectAlternativeServiceType,'Dispensed with service');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationReceivedBailiff(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-received/caseworker-service-receivedserviceApplicationReceived');
    await I.fillField(this.fields.applicationDateDay, '27');
    await I.fillField(this.fields.applicationDateMonth, '09');
    await I.fillField(this.fields.applicationDateYear, '2022');
    await I.selectOption(this.fields.selectAlternativeServiceType,'Bailiff application');
    await I.waitForNavigationToComplete(this.fields.submit);
  },


  async fillServiceApplicationReceivedCYA(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-service-received/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationPayment(caseNumber) {
    await I.wait(5);
    await I.waitInUrl('trigger/caseworker-service-payment/caseworker-service-paymentalternativeServicePayment');
    await I.selectOption(this.fields.selectPaymentMethod,'Telephone');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationPaymentCYA(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('/caseworker-service-payment/caseworker-service-paymentAltPaymentSummary');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillServiceApplicationPaymentSubmit(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('/caseworker-service-payment/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillApproveServiceApplication(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('/legal-advisor-service-decision/legal-advisor-service-decisionmakeServiceDecision');
    await I.click(this.fields.serviceAppGranted);
    await I.fillField(this.fields.deemedDateDay, '01');
    await I.fillField(this.fields.deemedDateMonth, '04');
    await I.fillField(this.fields.deemedDateYear, '2022');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillApproveServiceApplicationCYA(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/legal-advisor-service-decision/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillMakeBailiffDecision(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-bailiff-decision/caseworker-bailiff-decisionmakeBailiffDecision-1');
    await I.click(this.fields.serviceAppGranted);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillMakeBailiffDecisionNo(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-bailiff-decision/caseworker-bailiff-decisionmakeBailiffDecision-1');
    await I.click(this.fields.serviceAppGrantedNo);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillMakeBailiffDecisionNoReason(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-bailiff-decision/caseworker-bailiff-decisionmakeBailiffDecision-2');
    await I.fillField(this.fields.bailiffRefusalReason, 'Some reason for bailiff refusal');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillMakeBailiffDecisionCYA(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-bailiff-decision/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillIssueBailiffPack(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-issue-bailiff-pack/caseworker-issue-bailiff-packissueBailiffPack');
    await I.fillField(this.fields.localCourtName, 'Script Court Name');
    await I.fillField(this.fields.localCourtEmail, 'ScriptCourtEmail@mailinator.com');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillIssueBailiffPackCYA(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-issue-bailiff-pack/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillReissueDivorceApplicationDigital(caseNumber){
    await I.wait(2);
    await I.waitInUrl('/trigger/caseworker-reissue-application/caseworker-reissue-applicationreissueApplication');
    await I.click(this.fields.digitalAoS);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillReissueDivorceApplicationOffline(caseNumber){
    await I.wait(2);
    await I.waitInUrl('/trigger/caseworker-reissue-application/caseworker-reissue-applicationreissueApplication');
    await I.click(this.fields.offlineAoS);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillReissueDivorceApplication(caseNumber){
    await I.wait(2);
    await I.waitInUrl('/trigger/caseworker-reissue-application/caseworker-reissue-applicationreissueApplication');
    await I.click(this.fields.reissueCase);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillSubmitReissue(caseNumber){
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-reissue-application/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillScheduleCases(bulkCaseReferenceNumber){
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-schedule-case/caseworker-schedule-casescheduleForListing');
    await I.click(this.fields.courtNameBirmingham);

    let currentDateTime = new Date();
    let dateInImmediateFuture = new Date();
    dateInImmediateFuture.setTime(dateInImmediateFuture.getTime() + 500 * 60);

    const hearingDate = dateInImmediateFuture.getDate();
    const hearingMonth =  parseInt(dateInImmediateFuture.getMonth()+ 1);
    const hearingYear = dateInImmediateFuture.getFullYear();
    const hearingTimeHours = dateInImmediateFuture.getHours();
    const hearingTimeMinutes = dateInImmediateFuture.getMinutes();
    const hearingTimeSeconds = dateInImmediateFuture.getSeconds();


    await I.fillField(this.fields.hearingDateDay, hearingDate);
    await I.fillField(this.fields.hearingDateMonth,  hearingMonth );
    await I.fillField(this.fields.hearingDateYear,  hearingYear );
    await I.fillField(this.fields.hearingDateHour, hearingTimeHours);
    await I.fillField(this.fields.hearingDateMinute, hearingTimeMinutes);
    await I.fillField(this.fields.hearingDateSecond,hearingTimeSeconds);

    await I.wait(2);
    await I.fillField(this.fields.bulkCaseReferenceNumber, bulkCaseReferenceNumber);
    await I.wait(2);


    console.log('Hearing Date must be in Future.......');
    console.log('DD MM YYYY hh:mm:ss === '  + hearingDate  + ' ' + hearingMonth + '  ' + hearingYear + '  ' + hearingTimeHours + '  ' + hearingTimeMinutes + '  ' + hearingTimeSeconds);

    await I.fillField(this.fields.LADecisionDateDateDay, dateInImmediateFuture.getDate());
    await I.fillField(this.fields.LADecisionDateDateMonth, dateInImmediateFuture.getMonth()+1);
    await I.fillField(this.fields.LADecisionDateDateYear, dateInImmediateFuture.getFullYear());
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillScheduleCasesCYA(caseNumber){
    await I.wait(7);
    await I.waitInUrl('/caseworker-schedule-case/submit');
    await I.wait(5);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillPrintForPronouncement(caseNumber){
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-print-for-pronouncement/caseworker-print-for-pronouncementprintPronouncement');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillPrintForPronouncementCYA(caseNumber){
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-print-for-pronouncement/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillPronounceList(caseNumber) {
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-pronounce-list/caseworker-pronounce-listpronounceList');
    await I.click(this.fields.judgePronouncedYes);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillPronounceListCYA(caseNumber){
    await I.wait(7);
    await I.waitInUrl('trigger/caseworker-pronounce-list/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async dropBulkCaseEvent(caseNumber){
    await I.wait(2);
    await I.waitInUrl('trigger/caseworker-drop-case/submit');
    await I.waitForNavigationToComplete(this.fields.submit);
  }

};
