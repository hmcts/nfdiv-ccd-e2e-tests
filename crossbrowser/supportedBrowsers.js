const LATEST_MAC = 'macOS 13';
const LATEST_WINDOWS = 'Windows 10';


/* eslint-disable */
const supportedBrowsers = {
  microsoft: {
    edge_win_latest: {
      browserName: 'MicrosoftEdge',
      platformName: LATEST_WINDOWS,
      browserVersion: 'latest',
      'sauce:options': {
        name: 'NFD CCD E2E Tests - XUI: Edge_Win10',
        screenResolution: '2560x1600'
      }
    }
  },
  safari: {
    safari_mac: {
      browserName: 'safari',
      platformName: LATEST_MAC,
      browserVersion: 'latest',
      'sauce:options': {
        name: 'NFD CCD E2E Tests - XUI: MAC_SAFARI',
        screenResolution: '1376x1032'
      }
    }
  },
  chrome: {
    chrome_win_latest: {
      browserName: 'chrome',
      platformName: LATEST_WINDOWS,
      browserVersion: 'latest',
      'sauce:options': {
        name: 'NFD CCD E2E Tests - XUI: WIN_CHROME_LATEST',
        screenResolution: '2560x1600'
      }
    },
    chrome_mac_latest: {
      browserName: 'chrome',
      platformName: LATEST_MAC,
      browserVersion: 'latest',
      'sauce:options': {
        name: 'NFD CCD E2E Tests - XUI: MAC_CHROME_LATEST',
        screenResolution: '1376x1032'
      }
    }
  },
  //,
  // firefox: {
  //   firefox_win_latest: {
  //     browserName: 'firefox',
  //     platformName: LATEST_WINDOWS,
  //     browserVersion: 'latest',
  //     'sauce:options': {
  //        name: 'NFD CCD E2E Tests - XUI: WIN_FIREFOX_LATEST',
  //        screenResolution: '2560x1600'
  //   }
  // },
  //   firefox_mac_latest: {
  //      browserName: 'firefox',
  //      platformName: LATEST_MAC,
  //      browserVersion: 'latest',
  //      'sauce:options': {
  //         name: 'NFD CCD E2E Tests - XUI: MAC_FIREFOX_LATEST',
  //         screenResolution: '2360x1770'
  //   }
  // }
  // }
};

module.exports = supportedBrowsers;
