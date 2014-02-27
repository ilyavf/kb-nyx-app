// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:7899/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        //'browserName': 'chrome'
        'browserName': 'phantomjs',
        //'phantomjs.binary.path': '/usr/lib/node_modules/phantomjs/lib/phantom/bin/phantomjs'
        //'phantomjs.binary.path': '/usr/local/lib/node_modules/phantomjs/bin/phantomjs'
        'phantomjs.binary.path': 'node_modules/phantomjs/bin/phantomjs'
    },

    // Spec patterns are relative to the location of the spec file. They may
    // include glob patterns.
    specs: ['test/e2e/*-spec.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true // Use colors in the command line report.
    },

    onPrepare: function() {
        // The require statement must be down here, since jasmine-reporters
        // needs jasmine to be in the global and protractor does not guarantee
        // this until inside the onPrepare function.
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(
            new jasmine.JUnitXmlReporter('test-results-e2e-', true, true));
    }
};
