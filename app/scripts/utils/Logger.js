/**
 * Logger utility
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define) {
    "use strict";

    define(['utils/logger/LogEnhancer'], function (enhanceLoggerFn)
    {
        /**
         * Decorate the $log to use inject the LogEnhancer features.
         *
         * @param {object} $provide The log console.
         * @returns {object} promise.
         * @private
         */
        var LogDecorator = function ($provide) {
            // Register our $log decorator with AngularJS $provider

            $provide.decorator('$log', ["$delegate",
                function ($delegate) {
                    // NOTE: the LogEnhancer module returns a FUNCTION that we named `enhanceLoggerFn`
                    //       All the details of how the `enchancement` works is encapsulated in LogEnhancer!

                    enhanceLoggerFn($delegate);

                    return $delegate;
                }
            ]);
        };

        return [ "$provide", LogDecorator ];
    });

})(define);