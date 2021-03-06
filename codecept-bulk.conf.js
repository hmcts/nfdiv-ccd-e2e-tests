const testConfig = require('./tests/config.js');

exports.config = {
  tests: testConfig.TestPathToRun,
  timeout: 10000,
  output: testConfig.TestOutputDir,
  rerun: {
    // run 4 times until 1st success
    minSuccess: 4,
    maxReruns: 4
  },
  helpers: {
    Puppeteer: {
      url: testConfig.TestUrl,
      moUrl:testConfig.TestManageOrgUrl,
      show: testConfig.TestShowBrowserWindow,
      waitForNavigation: ['domcontentloaded'],
      restart: true,
      keepCookies: false,
      keepBrowserState: false,
      waitForTimeout: 90000,
      chrome: {
        ignoreHTTPSErrors: true,
        args: [
          //'--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--allow-running-insecure-content',
          '--ignore-certificate-errors',
          '--window-size=1920,1080'
        ]
      }
    },
    PuppeteerHelper: {
      'require': './helpers/PuppeteerHelper.js'
    },
    JSWait: {
      require: './helpers/JSWait.js'
    },
    Mochawesome: {
      uniqueScreenshotNames: 'true'
    }
  },
  include: {
    I: './steps_definitions.js'
  },
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    autoDelay: {
      enabled: testConfig.TestAutoDelayEnabled
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: 'true'
    }
  },
  bootstrap: false,
  multiple: {
    'parallel': {
      'chunks': 2
    }
  },
  mocha: {
    reporterOptions: {
      reportDir: testConfig.TestOutputDir,
      reportName: 'NoFaultDivorce CCD E2E Tests',
      inlineAssets: true
    }
  },
  name: 'nfdiv-ccd-e2e-test'
};


