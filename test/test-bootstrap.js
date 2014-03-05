var tests = [];
console.log('[test-bootstrap]:');
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        // Find test files:
        if (/test\/spec/.test(file)) {
            tests.push(file);
        }
    }
}
console.log('---');
console.log('Test files:');
tests.forEach(function(f){ console.log(f);});
console.log('---');

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app/scripts',

    paths: {
    },

    shim: {
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
