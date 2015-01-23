(function(window, angular, app, undefined) {
    'use strict';

    angular.module('error.error-controllers',[])
        .controller('ErrorController', function(fatalErrorSvc, $state) {
            var self = this;
            self.fatalErrorSvc = fatalErrorSvc;
            self.retry = function() {
                $state.go(self.fatalErrorSvc.toState, self.fatalErrorSvc.toParams);
            };
            self.getError = function() {
                return self.fatalErrorSvc.error;
            };
            self.getErrorName = function() {
                return self.fatalErrorSvc.error.name || 'unknown';
            };
            self.getErrorMsg = function() {
                return self.fatalErrorSvc.error.message || 'No error message available';
            };
            self.getErrorTrace = function() {
                return self.fatalErrorSvc.error.stack || 'No error stack trace available';
            };
            self.getAttemptedUrl = function() {
                return self.fatalErrorSvc.attemptedUrl;
            };
        })
    ;
})(window, window.angular, window.app);
