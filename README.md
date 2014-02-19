Nyx.Web
=======

Kooboodle Single Page Web Application


##Testing

###Unit tests via Karma
We are using Karma test runner. See config file: karma.conf.js

To run unit tests use grunt task:
```cmd
$ grunt test
...
Running "karma:unit" (karma) task
INFO [karma]: Karma v0.10.9 server started at http://localhost:8080/
...
INFO [Chrome 32.0.1700 (Mac OS X 10.8.5)]: Connected on socket fWiXRoXUT8L3mQPSQ_EW
Chrome 32.0.1700 (Mac OS X 10.8.5): Executed 3 of 3 SUCCESS (0.161 secs / 0.027 secs)

Done, without errors.

Execution Time (2014-02-19 17:49:02 UTC)
concurrent:test     4.8s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 62%
autoprefixer:dist  178ms  ▇▇▇▇▇▇ 2%
karma:unit          2.8s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 35%
Total 7.8s
```

###e2e via Protractor
Read this article: https://github.com/angular/protractor/blob/master/docs/getting-started.md

1 Install Protractor:
```cmd
$ npm install -g protractor
```
2 Install selenium standalone server and chromedriver to protractor/selenium:
```cmd
$ webdriver-manager update
```
3 Configure protractor for your project: https://github.com/angular/protractor/blob/master/referenceConf.js

Example: /usr/local/lib/node_modules/protractor/example/conf.js
```javascript
// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to the location of the spec file. They may
    // include glob patterns.
    specs: ['test/e2e/*-spec.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true // Use colors in the command line report.
    }
};
```

To run tests locally:
```cmd
$ webdriver-manager start
$ grunt serve
$ protractor protractor.conf.js
Using the selenium server at http://localhost:4444/wd/hub
...

Finished in 2.712 seconds
3 tests, 4 assertions, 0 failures
```
