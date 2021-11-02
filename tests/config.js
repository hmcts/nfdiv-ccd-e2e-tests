module.exports = {
  TestUrl: process.env.TEST_E2E_URL || 'https://manage-case.aat.platform.hmcts.net/',
  TestManageOrgUrl: process.env.TEST_MO_E2E_URL || 'https://manage-org.aat.platform.hmcts.net/',
  TestEnv: process.env.RUNNING_ENV  || 'aat',
  TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || false,
  TestRetryFeatures: 0,
  TestRetryScenarios: process.env.RETRY_SCENARIOS || 0,
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/nightly/*.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/nightly/verifyCaseStateAndEvents.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/nightly/verifyCaseForCourtService.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/nightly/solicitorCreateJointApplication.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/nightly/generalOrderReferralAndEmail.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/nightly/addNoteAndUpdateCase.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/nightly/shareACaseAndMoveToHolding.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/nightly/shareACaseAndDraftUpdateSubmitAoS.test.js',
  //TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/nightly/verifyHoldingToConditionalOrder.test.js',
  TestPathToRun: process.env.E2E_TEST_PATH || 'tests/nfdiv/nightly/shareACaseAndDraftAoS.test.js',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './functional-output/xui',
  TestEnvSolUser:'TEST_SOLICITOR@mailinator.com',
  TestEnvSolPassword:'genericPassword123',
  TestEnvCWUser:'TEST_CASE_WORKER_USER@mailinator.com',
  TestEnvCWPassword:'genericPassword123',
  TestEnvCourtAdminUser:'DivCaseWorkerUser@AAT.com',
  TestEnvCourtAdminPassword:'DivPassword1234',
  TestEnvRespondentSolUser:'divorce_as_respondent_solicitor_01@mailinator.com',
  TestEnvRespondentSolPassword:'Testing1234',
  TestEnvRespondentSolAdminUser:'divorce_as_respondent_solicitor_caa@mailinator.com',
  TestEnvRespondentSolAdminPassword:'Testing1234',
  TestEnvProfUser: process.env.PROF_USER_EMAIL || '',
  TestEnvProfPassword: process.env.PROF_USER_PASSWORD || '',
  TestForXUI: process.env.TESTS_FOR_XUI_SERVICE === 'true',
  TestSystemUser:'TEST_SYSTEM_USER@mailinator.com',
  TestSystemUserPW:'genericPassword123',
  TestEnvLegalAdvisorUser:'divorce_as_caseworker_la@mailinator.com',
  TestEnvLegalAdvisorPassword:'Testing1234',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY === 'true',
  TestForCrossBrowser: process.env.TESTS_FOR_CROSS_BROWSER === 'true',
  TestIdamClientSecret: process.env.IDAM_CLIENT_SECRET || 'thUphEveC2Ekuqedaneh4jEcRuba4t2t',
  TestS2SAuthSecret: process.env.SERVICE_SECRET || 'HDNIOOGINKEIB5ZZ'
};
