const reasonsForDivorce = {
  ADULTERY: 'adultery',
  BEHAVIOUR: 'unreasonable-behaviour',
  DESERTION: 'desertion',
  SEPFIVEYRS: 'separation-5-years',
  SEPTWOYRS: 'separation-2-years',
  ADULTERYDISPLAY: 'Adultery',
  BEHAVIOURDISPLAY: 'Behaviour',
  DESERTIONDISPLAY: 'Desertion',
  SEPFIVEYRSDISPLAY: '5-year separation',
  SEPTWOYRSDISPLAY: '2-year separation (with consent)'
};

const signOut = 'Sign out';

const currentCaseType = 'New Law Case';

const citizenUserPW='Testing123';

const bulkCaseReferenceCaseType='NO_FAULT_DIVORCE_BulkAction';

const divorceOrDissolution = {
  DIVORCE: 'Divorce',
  DISSOLUTION: 'Dissolution'
};

const soleOrJoint = {
  SOLE: 'SoleApplicant',
  JOINT: 'JointApplicant'
};

const yesorno = {
  Yes: 'yes',
  No: 'no'
};

const paymentType = {
  FEE_ACCOUNT: 'Fee account',
  HWF: 'Help with fees'
};

const states = {
  SUBMITTTED: 'Submitted',
  AWAITING_HWF:'AwaitingHWFDecision',
  ISSUED: 'Issued',
  REJECTED: 'Rejected',
  CONDITIONAL_ORDER_DRAFTED:'Conditional order drafted',
  AWAITING_LEGAL_ADVISOR_REFERRAL:'AwaitingLegalAdvisorReferral',
  DEFENDED_DIVORCE: 'DefendedDivorce',
  AWAITING_SERVICE: 'AwaitingService',
  APPLICATION_AWAITING_SERVICE:'Awaiting service',
  AOS_AWAITING_SOL: 'AosAwaitingSol',
  AOS_AWAITING: 'AwaitingAos',
  AOS_STARTED: 'AosStarted',
  AOS_DRAFTED:'AosDrafted',
  AOS_OVERDUE:'AosOverdue',
  HOLDING:'Holding',
  AWAITING_ANSWER: 'AosSubmittedAwaitingAnswer',
  AWAITING_DN: 'AwaitingDecreeNisi',
  AWAITING_LA: 'AwaitingLegalAdvisorReferral',
  AWAITING_CONSIDERATION: 'AwaitingConsideration',
  AWAITING_PRONOUNCEMENT: 'AwaitingPronouncement',
  AWAITING_DA: 'AwaitingDecreeAbsolute',
  DIVORCE_GRANTED: 'DivorceGranted',
  DN_PRONOUNCED: 'DNPronounced',
  AWAITING_GENERAL_CONSIDERATION: 'Awaiting general consideration',
  AWAITING_GENERAL_REFERRAL_PAYMENT:'Awaiting general referral payment',
  TWENTY_WEEK_HOLDING_PERIOD:'20 week holding period',
  CONDITIONAL_ORDER_PRONOUNCED: 'Conditional order pronounced',
  GENERAL_CONSIDERATION_COMPLETE: 'General consideration complete',
  AWAITING_DWP_RESPONSE: 'Awaiting DWP response',
  AWAITING_GEN_CONSIDERATION:'AwaitingGeneralConsideration',
  AWAITING_ALTERNATIVE_SERVICE:'AwaitingAlternativeService',
  ATTACH_SCAN_DOCS:'Attach scanned docs',
  REMOVE_SCANNED_DOCS:'Remove scanned document',
  AWAITING_JOINT_CONDITIONAL_ORDER:'ConditionalOrderPending'
};

const stateDisplayName = {
  SOL_AWAIT_PAYMENT_CONFIRM : 'Solicitor - Awaiting Payment Confirmation',
  AOS_AWAITING_NAME:'AoS awaiting',
  WITHDRAWN:'Application withdrawn',
  AWAITING_LA_REFERRAL:'Awaiting legal advisor referral',
  AWAITING_CLARIFICATION:'Awaiting clarification',
  CONDITIONAL_ORDER_DRAFTED:'ConditionalOrderDrafted',
  COND_ORDER_DRAFTED:'Conditional order drafted',
  AWAITING_SERVICE_PAYMENT: 'Awaiting service payment',
  AWAITING_SERVICE_CONSIDERATION: 'Awaiting service consideration',
  TWENTY_WEEK_HOLDING_PERIOD: '20 week holding period',
  AWAITING_BAILIFF_REFERRAL: 'Awaiting bailiff referral',
  AWAITING_BAILIFF_SERVICE: 'Awaiting bailiff service',
  ISSUED_TO_BAILIFF: 'Issued To bailiff',
  SUBMITTED: 'Submitted',
  APPLICATION_REJECT: 'Application rejected',
  APPLICATION_AWAITING_SERVICE:'Awaiting service',
  BULK_CASE_LISTED_CREATED: 'Bulk case list created',
  BULK_CASE_LISTED: 'Bulk case listed',
  BULK_CASE_PRONOUNCED: 'Bulk case pronounced',
  BULK_CASE_DROPPED: 'Bulk case dropped',
  AWAITING_FINAL_ORDER: 'Awaiting final order',
  FINAL_ORDER_REQUESTED: 'Final order requested',
  FINAL_ORDER_COMPLETED: 'Final order complete',
  GENERAL_REFERRAL: 'Awaiting general referral payment',
  DRAFT_AOS: 'AoS drafted',
  DRAFT: 'Draft',
  OFFLINE_DOCS_RECEIVED_BY_CW: 'Offline document received by CW'
};

const eventDisplayName = {
  UPDATE_LANG: 'Update Language',
  UPDATE_CONTACT_DETAILS: 'Update contact details',
  PAYMENT_MADE: 'Payment made',
  HWF_APP_ACCEPTED: 'HWF application accepted',
  ISSUE: 'Issue',
  DRAFT_AOS: 'Draft AoS',
  UPDATE_AOS:'Update AoS',
  SUBMIT_AOS:'Submit AoS',
  ISSUE_AOS_TO_RESP: 'Issue AOS pack to respondent',
  AOS_STARTED: 'AOS started',
  CONDITIONAL_ORDER_SUBMIT:'Submit conditional order',
  UPDATE_CONDITIONAL_ORDER:'Update conditional order',
  AOS_RECVD_UNDEFENDED: 'AOS Received (undefended)',
  REFUND: 'Refund',
  TRANSFER_BETWEEN_RDC: 'Transfer between RDCs',
  TRANSFER_CTSC_TO_RDC: 'Transfer from CTSC to RDC',
  DN_RECEIVED: 'DN application received',
  REFER_TO_LEGAL_ADVSIOR: 'Refer to legal advisor',
  ENTITLEMENT_GRANTED: 'Entitlement granted',
  DN_PRONOUNCED_BY_BULK: 'DN Pronounced by Bulk',
  TEST_EVENT_FOR_DA_DATA: 'Data required for DA',
  MAKE_ELIGIBLE_FOR_DA: 'Make eligible for DA (Pet)',
  DA_GRANTED: 'DA Granted',
  HWF_RESULTS:'HWF Results',
  APPLICATION_PAID_SUBMIITED:'Application Paid and submitted',
  WITHDRAWN:'Withdrawn',
  DRAFT_CO: 'Draft conditional order',
  REQUEST_CLARIFICATION:'Request clarification',
  SUBMIT_CLARIFICATION:'Submit clarification',
  SOLICITOR_CONFIRM_SERVICE: 'Solicitor confirm service',
  SUBMIT_CO:'Submit Conditional Order',
  SCHEDULE_CASES_FOR_LISTING: 'Schedule cases for listing',
  PRINT_FOR_PRONOUNCEMENT: 'Print for pronouncement',
  SYSTEM_UPDATE_CASE: 'System update case',
  CREATE_BULK_LIST: 'Create bulk list',
  GENERAL_REFERRAL: 'General referral',
  GENERAL_CONSIDERATION: 'General Consideration',
  REQUEST_DWP_DISCLOSURE: 'Request DWP disclosure',
  OFFLINE_DOCS_RECEIVED_BY_CW :'Offline document received by CW',
  REMOVE_SCANNED_DOCS:'Remove scanned document'
};

const user = {
  SOLS : 'Solicitor',
  CW : 'Caseworker',
  LA : 'LegalAdminstrator',
  CA : 'CourtAdmin',
  SU : 'SuperUser',
  RS:  'RespondentSolicitor',
  RS2: 'RespondentSolicitor2',
  RSA: 'RespondentSolicitorAdmin',
  SYS: 'SystemUser',
  LAD: 'LegalAdvisor'
};

const events = {
  HWF_ACCEPT_AWAIT_DECISION:'hwfApplicationAcceptedfromAwaitingHWFDecision',
  SOLICITOR_SUBMIT_APPLICATION:'solicitor-submit-application',
  CASEWORKER_HWF_APPLICATION_ACCEPTED:'caseworker-hwf-application-accepted',
  CASE_SUBMISSION:'Sign and submit',
  DRAFT_CONDITIONAL_ORDER:'Draft conditional order',
  UPDATE_CONDITIONAL_ORDER:'Update conditional order',
  SUBMIT_CONDITIONAL_ORDER:'Submit Conditional Order',
  CO_REQUEST_CLARIFICATION:'Request clarification',
  SUBMIT_CLARIFICATION:'Submit clarification',
  DRAFT_AOS:'draft-aos',
  SUBMIT_AOS:'submit-aos',
  SUBMIT_CO:'submit-conditional-order',
  SUBMIT_JOINT_CO:'submit-joint-conditional-order',
  SOLS_DRAFT_CO:'draft-conditional-order',
  UPDATE_CO:'update-conditional-order',
  LEGAL_ADVISOR_MAKE_DECISION:'legal-advisor-make-decision',
  UPDATE_AOS:'Update AoS',
  HWF_AWAITING_DECISION:'AwaitingHWFDecision',
  HWF_REFUSED:'HWF refused',
  DRAFT_TO_SUBMITTED:'Submitted',
  ISSUED_FROM_SUBMITTED:'caseworker-issue-application',
  ISSUE_AOS:'caseworker-issue-aos',
  AOS_AWAITING_TO_AOS_DRAFTED:'solicitor-draft-aos',
  START_AOS: 'startAos',
  AOS_SUBMITTED_DEFENDED:'aosSubmittedDefended',
  ANSWER_NOT_RECEIVED:'answerNotReceived',
  DN_RECEIVED:'dnReceived',
  REFER_TO_LEGAL_ADVSIOR: 'refertoLegalAdvisor',
  ENTITLEMENT_GRANTED: 'entitlementGranted',
  DN_PRONOUNCED_BY_BULK: 'dnPronouncedBulk',
  DA_GRANTED:'daGranted',
  CO_RESP_ANSWER_RECVD_AOS: 'coRespAnswerReceivedAOS',
  CO_RESP_AOS_RECEIVED_STARTED: 'co-RespAOSReceivedStarted',
  MAKE_ELIGIBLE_FOR_DA: 'MakeEligibleForDA_Petitioner',
  SOLICITOR_CONFIRM_SERVICE:'Solicitor Confirm Service',
  GENERAL_REFERRAL:'General referral',
  CREATE_GENERAL_ORDER:'Create general order',
  APPLICATION_WITHDRAWN: 'Application withdrawn',
  SERVICE_APPLICATION_RECEIVED: 'Service application received',
  CONFIRM_SERVICE_PAYMENT: 'Confirm service payment',
  MAKE_SERVICE_DECISION: 'Make service decision',
  MAKE_BAILIFF_DECISION: 'Make bailiff decision',
  ISSUED_BAILIFF_PACK: 'Issue bailiff pack',
  UPLOAD_DOCUMENT: 'Upload document',
  UPLOAD_CONFIDENTIAL_DOCUMENT: 'Upload confidential document',
  REJECT: 'Reject',
  REISSUED: 'Reissue',
  SCHEDULE_CASES_LISTING: 'caseworker-schedule-case',
  SCHEDULE_CASES_FOR_LISTING: 'Schedule cases for listing',
  PRINT_FOR_PRONOUNCEMENT: 'Print for pronouncement',
  SYSTEM_UPDATE_CASE: 'System update case',
  CREATE_BULK_LIST: 'Create bulk list',
  PRONOUNCE_LIST: 'Pronounce list',
  AWAITING_FO:'AwaitingFinalOrder',
  AWAITING_FINAL_ORDER: 'Awaiting Final Order',
  TEST_CASE: 'Create test case',
  ALERT_APPLICANT: 'Alert Applicant 1',
  APPLY_FOR_FINAL_ORDER :'Apply for final order',
  GRANT_FINAL_ORDER: 'Grant Final order',
  GENERAL_REFERRAL: 'General referral',
  AOS_UNDISPUTED: 'AoS undisputed',
  AOS_DISPUTED: 'AoS disputed',
  NOTICE_OF_CHANGE: 'Notice of change',
  REMOVE_SCANNED_DOCS:'Remove scanned document'
};

const serviceApplicationType = {
  BAILIFF_APPLICATION: 'Bailiff application',
  DISPENSED_WITH_SERVICE: 'Dispensed with service',
  DEEMED_AS_SERVED: 'Deemed as served'
};

module.exports = {
  reasonsForDivorce,
  states,
  events,
  user,
  signOut,
  paymentType,
  eventDisplayName,
  stateDisplayName,
  yesorno,
  divorceOrDissolution,
  serviceApplicationType,
  currentCaseType,
  bulkCaseReferenceCaseType,
  citizenUserPW
};
