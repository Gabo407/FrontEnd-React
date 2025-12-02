process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'vite'],
        files: [
            { pattern: 'src/**/*.test.jsx', type: 'module', watched: false, served: false }
        ],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-spec-reporter',
            'karma-vite'
        ],
        vite: {
            config: {
                resolve: {
                    alias: {}
                }
            }
        },
        browsers: ['ChromeHeadless'],
        reporters: ['spec'],
        singleRun: true
    })
}
