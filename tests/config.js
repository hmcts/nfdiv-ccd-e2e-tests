module.exports = {
  TestUrl: process.env.TEST_E2E_URL || 'https://manage-case.aat.platform.hmcts.net/',
  TestManageOrgUrl: process.env.TEST_MO_E2E_URL || 'https://manage-org.aat.platform.hmcts.net/',
  TestEnv: process.env.RUNNING_ENV  || 'aat',
  TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || false,
  TestRetryFeatures: process.env.RETRY_SCENARIOS ||  0,
  TestRetryScenarios: process.env.RETRY_SCENARIOS || 1,
  TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/nightly/*.test.js',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './functional-output/xui',
  TestEnvSolUser: process.env.SOLICITOR_USER_NAME || '',
  TestEnvSolPassword: process.env.SOLICITOR_PASSWORD || '',
  TestEnvCitizenUser: process.env.CITIZEN_USER_NAME || '',
  TestEnvCitizenPassword: process.env.CITIZEN_PASSWORD || '',
  TestEnvCWUser: process.env.CASEWORKER_USER_NAME || '',
  TestEnvCWPassword: process.env.CASEWORKER_PASSWORD || '',
  TestEnvCourtAdminUser: process.env.CASEWORKER_USER_NAME || '',
  TestEnvCourtAdminPassword: process.env.CASEWORKER_PASSWORD || '',
  TestEnvRespondentSolAdminUser: process.env.CCD_CASEWORKER_E2E_EMAIL || '',
  TestEnvRespondentSolAdminPassword: process.env.CCD_CASEWORKER_E2E_PASSWORD || '',
  TestEnvRespondentSolUser:process.env.RESPONDENT_SOLICITOR_1_USERNAME || '',
  TestEnvRespondentSolPassword:process.env.RESPONDENT_SOLICITOR_1_PASSWORD || '',
  TestEnvLegalAdvisorUser:process.env.LEGAL_ADVISOR_USERNAME || '',
  TestEnvLegalAdvisorPassword:process.env.LEGAL_ADVISOR_PASSWORD || '',
  TestEnvProfUser: process.env.PROF_USER_EMAIL || '',
  TestEnvProfPassword: process.env.PROF_USER_PASSWORD || '',
  TestForXUI: process.env.TESTS_FOR_XUI_SERVICE === 'true',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY === 'true',
  TestS2SAuthSecret: process.env.SERVICE_AUTH_SECRET || '',
  TestForCrossBrowser: process.env.TESTS_FOR_CROSS_BROWSER === 'false',
  TestIdamClientSecret: process.env.IDAM_SECRET || '',
  TestSystemUser:process.env.SYSTEMUPDATE_USERNAME || '',
  TestSystemUserPW:process.env.SYSTEMUPDATE_PASSWORD || '',
  TestTimeToWaitForText: parseInt(process.env.E2E_TEST_TIME_TO_WAIT_FOR_TEXT || 30),
  TestNFDSystemUser:process.env.IDAM_NFD_E2E_SYSTEMUPDATE_USERNAME || '',
  TestNFDSystemUserPW:process.env.IDAM_NFD_E2E_SYSTEMUPDATE_PASSWORD || ''
};
