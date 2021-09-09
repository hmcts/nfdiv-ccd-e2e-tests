module.exports = {
  TestUrl: process.env.TEST_E2E_URL || 'https://manage-case.aat.platform.hmcts.net/',
  TestEnv: process.env.RUNNING_ENV || 'aat',
  TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || false,
  TestRetryFeatures: 0,
  TestRetryScenarios: process.env.RETRY_SCENARIOS || 2,
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/*.test.js',
  TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/nightly/*.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/verifyCaseStateAndEvents.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/verifyCaseForCourtService.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/solicitorCreateJointApplication.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/generalOrderReferralAndEmail.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/addNoteAndUpdateCase.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/shareACaseAndMoveToHolding.test.js',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './functional-output/xui',
  TestEnvSolUser: process.env.SOLICITOR_USER_NAME || '',
  TestEnvSolPassword: process.env.SOLICITOR_PASSWORD || '',
  TestEnvCWUser: process.env.CASEWORKER_USER_NAME || '',
  TestEnvCWPassword: process.env.CASEWORKER_PASSWORD || '',
  //TODO need to add CourtAdmin  to az secrets
  TestEnvCourtAdminUser: process.env.CASEWORKER_USER_NAME || '',
  TestEnvCourtAdminPassword: process.env.CASEWORKER_PASSWORD || '',
  //TODO need to add RespondentSolAdminUser  to az secrets
  TestEnvRespondentSolAdminUser: process.env.CCD_CASEWORKER_E2E_EMAIL || '',
  TestEnvRespondentSolAdminPassword: process.env.CCD_CASEWORKER_E2E_PASSWORD || '',
  TestEnvProfUser: process.env.PROF_USER_EMAIL || '',
  TestEnvProfPassword: process.env.PROF_USER_PASSWORD || '',
  TestForXUI: process.env.TESTS_FOR_XUI_SERVICE === 'true',
  //TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY === 'true',
  TestS2SAuthSecret: process.env.SERVICE_AUTH_SECRET || '',
  TestForCrossBrowser: process.env.TESTS_FOR_CROSS_BROWSER === 'true',
  TestIdamClientSecret: process.env.IDAM_SECRET || ''
};
