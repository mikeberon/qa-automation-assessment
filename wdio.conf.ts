export const config: WebdriverIO.Config = {
    runner: 'local',

    specs: [
        './test/**/*.spec.ts'
    ],

    maxInstances: 1,

    capabilities: [
        {
            browserName: 'chrome'
        }
    ],

    logLevel: 'info',

    baseUrl: 'https://www.cheapflights.com.au',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 2,

    framework: 'mocha',

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}