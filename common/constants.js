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

const currentCaseType = 'NFD';


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
  DEFENDED_DIVORCE: 'DefendedDivorce',
  AWAITING_SERVICE: 'AwaitingService',
  APPLICATION_AWAITING_SERVICE:'Awaiting service',
  AOS_AWAITING_SOL: 'AosAwaitingSol',
  AOS_AWAITING: 'AwaitingAos',
  AOS_STARTED: 'AosStarted',
  AOS_DRAFTED:'AosDrafted',
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
  TWENTY_WEEK_HOLDING_PERIOD:'20 week holding period'
};

const stateDisplayName = {
  SOL_AWAIT_PAYMENT_CONFIRM : 'Solicitor - Awaiting Payment Confirmation',
  AOS_AWAITING_NAME:'AoS awaiting',
  WITHDRAWN:'Application withdrawn',
  AWAITING_SERVICE_PAYMENT: 'Awaiting service payment',
  AWAITING_SERVICE_CONSIDERATION: 'Awaiting Service Consideration',
  TWENTY_WEEK_HOLDING_PERIOD: '20 week holding period',
  AWAITING_BAILIFF_REFERRAL: 'Awaiting bailiff referral',
  AWAITING_BAILIFF_SERVICE: 'Awaiting bailiff service',
  ISSUED_TO_BAILIFF: 'Issued To bailiff',
  SUBMITTED: 'Submitted',
  APPLICATION_REJECT: 'Application rejected'
};

const eventDisplayName = {
  UPDATE_LANG: 'Update Language',
  UPDATE_CONTACT_DETAILS: 'Update contact details',
  PAYMENT_MADE: 'Payment made',
  HWF_APP_ACCEPTED: 'HWF application accepted',
  ISSUE: 'Issue',
  ISSUE_AOS_TO_RESP: 'Issue AOS pack to respondent',
  AOS_STARTED: 'AOS started',
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
  WITHDRAWN:'Withdrawn'
};


const user = {
  SOLS : 'Solicitor',
  CW : 'Caseworker',
  LA : 'LegalAdminstrator',
  CA : 'CourtAdmin',
  SU : 'SuperUser',
  RS:  'RespondentSolicitor',
  RSA: 'RespondentSolicitorAdmin'
};

const events = {
  HWF_ACCEPT_AWAIT_DECISION:'hwfApplicationAcceptedfromAwaitingHWFDecision',
  SOLICITOR_SUBMIT_APPLICATION:'solicitor-submit-application',
  CASEWORKER_HWF_APPLICATION_ACCEPTED:'caseworker-hwf-application-accepted',
  CASE_SUBMISSION:'Case submission',
  DRAFT_AOS:'Draft AoS',
  UPDATE_AOS:'Update AoS',
  HWF_AWAITING_DECISION:'AwaitingHWFDecision',
  HWF_REFUSED:'HWF Refused',
  DRAFT_TO_SUBMITTED:'Submitted',
  ISSUED_FROM_SUBMITTED:'caseworker-issue-application',
  ISSUE_AOS:'caseworker-issue-aos',
  AOS_AWAITING_TO_AOS_DRAFTED:'solicitor-draft-aos',
  START_AOS: 'startAos',
  SUBMIT_AOS:'Submit AoS',
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
  CONFIRM_SERVICE_PAYMENT: 'Confirm Service Payment',
  MAKE_SERVICE_DECISION: 'Make service decision',
  MAKE_BAILIFF_DECISION: 'Make Bailiff Decision',
  ISSUED_BAILIFF_PACK: 'Issue bailiff pack',
  UPLOAD_DOCUMENT: 'Upload document',
  UPLOAD_CONFIDENTIAL_DOCUMENT: 'Upload confidential document',
  REJECT: 'Reject'
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
  serviceApplicationType,
  currentCaseType
};
