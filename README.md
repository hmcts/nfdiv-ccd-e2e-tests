# nfdiv-ccd-e2e-tests

NoFault Divorce CCD journey tests

## Purpose

This service is to help people to run End2End Journey Tests for NoFault Divorce Solicitor Journeys.

## Getting Started

### Prerequisites

Running the application requires the following tools to be installed in your environment:

  * [Node.js](https://nodejs.org/) v7.2.0 or later
  * [yarn](https://yarnpkg.com/)

### Running the application

Install dependencies by executing the following command:

 ```bash
$ yarn install
 ```

### Running the expertui tests against aat ..
### Currently running only one E2E test is run using the yarn test-e2e-standalone.

 ```bash

### Set these properties in your terminal before running the yarn test-e2e-standalone

export LA_USER_EMAIL=divorce_as_caseworker_la@mailinator.com
export LA_USER_PASSWORD=<<Take this from the .env file of nfdiv-dev>>
export PROF_USER_EMAIL=divorce_as_petitioner_solicitor_01@mailinator.com
export PROF_USER_PASSWORD=<<Take this from the .env file of nfdiv-dev>>
export CCD_CASEWORKER_E2E_EMAIL=divorce_as_caseworker_beta@mailinator.com
export CCD_CASEWORKER_E2E_PASSWORD=<<Take this from the .env file of nfdiv-dev>>
export IDAM_CLIENT_SECRET=<<Take this value from Azure Secret Vault >>
export SERVICE_SECRET=<<Take this value from Azure Secret Vault >>
export TestEnvSolUser='TEST_SOLICITOR@mailinator.com',
export TestEnvSolPassword=<<Take this from the .env file of nfdiv-dev>>
export TestEnvCaseworkerUser='TEST_CASE_WORKER_USER@mailinator.com',
export TestEnvCaseworkerPassword=<<Take this from the .env file of nfdiv-dev>>


## For NFDiv e2e Tests
$ yarn test-e2e-standalone

$ yarn test:fullfunctional (to run all the e2e tests

 ```
### Running the cross browser tests against aat

 ```bash
$ yarn test:crossbrowser
 ```

