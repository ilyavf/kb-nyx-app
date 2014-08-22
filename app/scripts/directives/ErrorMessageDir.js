/**
 * Error message directive
 *
 * @memberof nyxWebApp
 * @member   ErrorMessageDir
 * @object
 *
 * @author  IlyaVF
 * @date    August 22, 2014
 * @param   error {title, message}
 */

(function (define) {
    'use strict';

    define([], function () {

        var ErrorMessageDir = function () {
            return {
                restrict: 'E',
                template:
                    '<p ng-if="error" class="alert alert-danger">' +
                    '   <strong>{{error.title || error}}</strong>' +
                    '   <br />{{error.message}}' +
                    '</p>',
                scope: {
                    'error': '='
                },
                link: function (scope) {
                    //TODO: tell server about the error displayed for user.
                }
            }
        };

        return ErrorMessageDir;
    });


}(define));