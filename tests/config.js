module.exports = {
  TestUrl: process.env.TEST_E2E_URL || 'https://manage-case.aat.platform.hmcts.net/',
  TestEnv: process.env.RUNNING_ENV || 'aat',
  //TestUrl: process.env.TEST_E2E_URL || 'https://xui-webapp-pr-1208.service.core-compute-preview.internal/',
  //TestEnv: process.env.RUNNING_ENV || 'pr',
  TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || false,
  TestRetryFeatures: 0,
  TestRetryScenarios: process.env.RETRY_SCENARIOS || 0,
  // TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/*.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/solicitorCreateJointApplication.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/generalOrderReferralAndEmail.test.js',
  TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/verifyCaseStateAndEvents.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/addNoteAndUpdateCase.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/shareACaseAndMoveToHolding.test.js',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './functional-output/xui',
  TestEnvSolUser:'TEST_SOLICITOR@mailinator.com',
  TestEnvSolPassword:'genericPassword123',
  //TestEnvSolUser2:process.env.TestEnvSolUser2,
  // TestEnvSolPassword2:process.env.TestEnvSolPassword2,
  //TestEnvSolUser:process.env.TestEnvSolUser2,
  //TestEnvSolPassword:process.env.TestEnvSolPassword2,
  // TestEnvCWUser:'TEST_CASE_WORKER_USER@mailinator.com',
  // TestEnvCWPassword:'genericPassword123',
  TestEnvCWUser:'TEST_CASE_WORKER_USER@mailinator.com',
  TestEnvCWPassword:'genericPassword123',
  TestEnvCourtAdminUser:'DivCaseWorkerUser@AAT.com',
  TestEnvCourtAdminPassword:'DivPassword1234',
  TestEnvRespondentSolUser:'divorce_as_respondent_solicitor_01@mailinator.com',
  TestEnvRespondentSolPassword:'Testing1234',

  TestEnvProfUser: process.env.PROF_USER_EMAIL || '',
  TestEnvProfPassword: process.env.PROF_USER_PASSWORD || '',
  TestForXUI: process.env.TESTS_FOR_XUI_SERVICE === 'true',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY === 'true',
  TestForCrossBrowser: process.env.TESTS_FOR_CROSS_BROWSER === 'true',
  TestIdamClientSecret: process.env.IDAM_CLIENT_SECRET || 'thUphEveC2Ekuqedaneh4jEcRuba4t2t',
  TestS2SAuthSecret: process.env.SERVICE_SECRET || 'HDNIOOGINKEIB5ZZ'
};
