//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('error.error-controllers',[
        'error.error-services'
    ])
    .controller('ErrorController', function(fatalErrorSvc, $state, $location, $timeout) {
        var self = this;
        self.fatalErrorSvc = fatalErrorSvc;
        self.retry = function() {
            try {
                $state.go(self.fatalErrorSvc.toState, self.fatalErrorSvc.toParams);
            } catch (error) {
                fatalErrorSvc.setError(error,
                    self.fatalErrorSvc.toState,
                    self.fatalErrorSvc.toParams,
                    $location.protocol() + '://' + $location.host() + ':' + $location.port() +'/' +
                    $state.href(self.fatalErrorSvc.toState,
                                self.fatalErrorSvc.toParams));
                $timeout(function() { $state.go('app.error'); });
            }
        };
        self.getError = function() {
            return self.fatalErrorSvc.error;
        };
        self.getErrorName = function() {
            return self.fatalErrorSvc.error.name || 'Unknown error';
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
//})(window, window.angular, window.app);
