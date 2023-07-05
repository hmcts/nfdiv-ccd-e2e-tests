const testConfig = require('./tests/config.js');

exports.config = {
  tests: testConfig.TestPathToRun,
  output: testConfig.TestOutputDir,
  helpers: {
    Puppeteer: {
      waitForTimeout: 90000,
      getPageTimeout: 90000,
      setDefaultTimeout: 90000,
      retry:2,
      smartWait: 90000,
      url: testConfig.TestUrl,
      moUrl:testConfig.TestManageOrgUrl,
      show: testConfig.TestShowBrowserWindow,
      waitForNavigation: ['networkidle2'],
      restart: true,
      keepCookies: false,
      keepBrowserState: false,
      chrome: {
        ignoreHTTPSErrors: true,
        'ignore-certificate-errors': true,
        'defaultViewport': {
          'width': 1280,
          'height': 960
        },
        args: [
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--allow-running-insecure-content',
          '--ignore-certificate-errors',
          '--window-size=1440,1400'
        ]}
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
      'chunks': 3
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


