const supportedBrowsers = require('./crossbrowser/supportedBrowsers.js');

const testConfig = require('./tests/config');

const waitForTimeout = parseInt(process.env.WAIT_FOR_TIMEOUT) || 90000;
const smartWait = parseInt(process.env.SMART_WAIT) || 90000;
const browser = process.env.BROWSER_GROUP || 'chrome';
const defaultSauceOptions = {
  //sauceSeleniumAddress: 'ondemand.eu-central-1.saucelabs.com:443/wd/hub',
  // /wd/hub/session
  host: 'ondemand.eu-central-1.saucelabs.com',
  //  sauceRegion: 'eu',
  //  port: 80,
  //sauceConnect: true,
  //sauceProxy: 'http://proxyout.reform.hmcts.net:8080',  // Proxy for the REST API
  //sauceUser: process.env.SAUCE_USERNAME,
  //sauceKey: process.env.SAUCE_ACCESS_KEY,
  tunnelIdentifier: process.env.TUNNEL_IDENTIFIER || 'reformtunnel',
  //SAUCE_REST_ENDPOINT: 'https://eu-central-1.saucelabs.com/rest/v1/',
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  acceptSslCerts: true,
  windowSize: '1600x900',
  tags: ['nfdiv_expertui']
};

function merge (intoObject, fromObject) {
  return Object.assign({}, intoObject, fromObject);
}

function getBrowserConfig(browserGroup) {
  const browserConfig = [];
  for (const candidateBrowser in supportedBrowsers[browserGroup]) {
    if (candidateBrowser) {
      const candidateCapabilities = supportedBrowsers[browserGroup][candidateBrowser];
      candidateCapabilities['sauce:options'] = merge(
        defaultSauceOptions, candidateCapabilities['sauce:options']
      );
      browserConfig.push({
        browser: candidateCapabilities.browserName,
        capabilities: candidateCapabilities
      });
    } else {
      // eslint-disable-next-line no-console
      console.error('ERROR: supportedBrowsers.js is empty or incorrectly defined');
    }
  }
  return browserConfig;
}

const setupConfig = {
  'tests': testConfig.TestPathToRun,
  'output': testConfig.TestOutputDir,
  'helpers': {
    WebDriver: {
      url: testConfig.TestUrl,
      waitForTimeout: 90000,
      smartWait: 90000,
      cssSelectorsEnabled: 'true',
      host: 'ondemand.eu-central-1.saucelabs.com',
      port: 80,
      region: 'eu',
      capabilities: {}
    },
    WebDriverHelper: {
      require: './helpers/WebDriverHelper.js'
    },
    SauceLabsReportingHelper: {
      require: './helpers/SauceLabsReportingHelper.js'
    },
    Mochawesome: {
      uniqueScreenshotNames: 'true'
    }
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 2
    },
    autoDelay: {
      enabled: true,
      delayAfter: 2000
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: 'true'
    }
  },
  include: {
    I: './steps_definitions.js'
  },

  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {steps: true}
      },
      'mocha-junit-reporter': {
        stdout: '-',
        options: {mochaFile: `${testConfig.TestOutputDir}/result.xml`}
      },
      mochawesome: {
        stdout: testConfig.TestOutputDir + '/console.log',
        options: {
          reportDir: testConfig.TestOutputDir,
          reportName: 'index',
          reportTitle: 'Crossbrowser results for: ' + browser.toUpperCase(),
          inlineAssets: true
        }
      }
    }
  },
  multiple: {
    microsoft: {
      browsers: getBrowserConfig('microsoft')
    },
    chrome: {
      browsers: getBrowserConfig('chrome')
    },
    // firefox: {
    //   browsers: getBrowserConfig('firefox')
    // }
    // ,
    // },
    safari: {
      browsers: getBrowserConfig('safari')
    }
  },
  name: 'NoFaultDivorce-ExpertUI Cross-Browser Tests'
};

exports.config = setupConfig;
