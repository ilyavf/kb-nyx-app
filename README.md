Nyx.Web
=======


Kooboodle Single Page Web Application

The project was created using yeoman toolset (http://yeoman.io/). Tools used:

- bower (dependency manager, http://bower.io/)
- grunt (build tool, http://gruntjs.com/)
- Karma as a unit test runner (see section Testing)
- Protractor and Selenium standalone server for e2e testing (see section Testing)

## Initial setup
First, install NodeJS http://nodejs.org/ which includes NPM https://www.npmjs.org/

Install project dependencies:
```cmd
$ npm install
```
Install package dependencies using bower (see /bower.json for config):
```cmd
$ bower install
```
To run locally in dev mode (will launch web server and will be watching for any changes in code to be reflected in browser):
```cmd
$ grunt serve
```
To build the project for production  (see /Gruntfile.js for task details) which will:
- compile SASS;
- concatinate / minify / uglify both app and bower packages javascript files;
- version images updating css and html accordingly:
```cmd
$ grunt build
...
Done, without errors.

Execution Time (2014-02-19 21:18:51 UTC)
concurrent:dist     4.5s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 28%
autoprefixer:dist  174ms  ▇▇ 1%
ngmin:dist          7.2s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 46%
copy:dist          713ms  ▇▇▇▇ 4%
uglify:generated    2.6s  ▇▇▇▇▇▇▇▇▇▇▇▇▇ 16%
Total 15.9s
```

### Installing on Ubuntu Virtual Machine

- Node:
http://www.hacksparrow.com/how-to-install-node-js-on-ubuntu-linux.html
- Ruby:
https://www.digitalocean.com/community/articles/how-to-install-ruby-on-rails-on-ubuntu-12-04-lts-precise-pangolin-with-rvm
- JDK (for Selenium web driver):
http://stackoverflow.com/questions/14788345/how-to-install-jdk-on-ubuntulinux



##Enabling protractor in Jenkins
Onetime setup (or when a new dependency added):
```sh
$ npm install
$ bower install
```
For e2e tests there is a grunt task which starts Selemium, launches local webserver (on port 9000) and runs protractor:
```cmd
$ grunt p:test
```
For unit tests run:
```cmd
$ grunt test
```

##Testing

###Unit tests via Karma
We are using Jasmine (http://pivotal.github.io/jasmine/) as a unit test framework and Karma (http://karma-runner.github.io/) as a test runner.

See config file: karma.conf.js

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

###End-to-end tests via Protractor

End-to-end testing is a methodology used to test whether the flow of an application is performing as designed from start to finish. The purpose of carrying out end-to-end tests is to identify system dependencies and to ensure that the right information is passed between various system components and systems.

Protractor is an end to end test framework for AngularJS applications built on top of WebDriverJS. Protractor runs tests against your application running in a real browser, interacting with it as a user would. Read this to get started: https://github.com/angular/protractor/blob/master/docs/getting-started.md

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

To run tests locally (selenium port is also reffered in /protractor.conf):
```cmd
$ webdriver-manager --seleniumPort 7899 start
$ grunt serve
$ protractor protractor.conf.js
Using the selenium server at http://localhost:7899/wd/hub
...

Finished in 2.712 seconds
3 tests, 4 assertions, 0 failures
```


##Links
###Must-Read:
- http://docs.angularjs.org/guide/module
- http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
###Architecture / Code organization:
- Scalable code organization in AngularJS: https://medium.com/opinionated-angularjs/9f01b594bf06
- ANGULARJS + REQUIREJS: http://www.startersquad.com/blog/angularjs-requirejs/

