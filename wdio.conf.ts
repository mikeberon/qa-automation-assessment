import { execSync } from 'child_process'

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

    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                addConsoleLogs: true,
                reportedEnvironmentVars: {
                    NODE_VERSION: process.version,
                    BROWSER: 'chrome'
                }
            }
        ]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    before: async () => {
        await browser.maximizeWindow()
    },

    afterTest: async function (
        test,
        context,
        { error }
    ) {
        if (error) {
            await browser.takeScreenshot()
        }
    },

    onComplete: function () {
        console.log('\nGenerating Allure report...')

        try {
            execSync(
                'npx allure generate allure-results --clean -o allure-report',
                {
                    stdio: 'inherit'
                }
            )

            console.log(
                'Allure report generated successfully.'
            )
        } catch (error) {
            console.error(
                'Failed to generate Allure report:',
                error
            )
        }
    }
}