module.exports = {
  TestUrl: process.env.TEST_E2E_URL || 'https://manage-case.aat.platform.hmcts.net/',
  TestEnv: process.env.RUNNING_ENV || 'aat',
  TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || true,
  TestRetryFeatures: 0,
  TestRetryScenarios: process.env.RETRY_SCENARIOS || 2,
  TestPathToRun: process.env.E2E_TEST_PATH || 'tests/solicitorCreateCase.test.js',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './functional-output/xui',
  TestEnvCWUser: process.env.CCD_CASEWORKER_E2E_EMAIL === 'divorce_as_petitioner_solicitor_02@mailinator.com',
  TestEnvSolUser: 'TEST_SOLICITOR@mailinator.com',
  TestEnvSolPassword:'genericPassword123',

  TestEnvCWPassword: process.env.CCD_CASEWORKER_E2E_PASSWORD === 'Testing1234' ,
  TestEnvProfUser: process.env.PROF_USER_EMAIL || '',
  TestEnvProfPassword: process.env.PROF_USER_PASSWORD || '',
  TestForXUI: process.env.TESTS_FOR_XUI_SERVICE === 'true',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY === 'true',
  TestForCrossBrowser: process.env.TESTS_FOR_CROSS_BROWSER === 'true',
  TestIdamClientSecret: process.env.IDAM_CLIENT_SECRET === 'thUphEveC2Ekuqedaneh4jEcRuba4t2t',
  TestS2SAuthSecret: process.env.SERVICE_SECRET || ''
};
