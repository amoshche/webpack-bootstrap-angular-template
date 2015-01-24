//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('error.error-controllers',[
        'error.error-services'
    ])
    .controller('ErrorController', function(fatalErrorSvc, $state, tickSvc) {
        var self = this;
        self.fatalErrorSvc = fatalErrorSvc;
        self.retry = function() {
            try {
              //TODO
              //Reset deepStateRedirect
              //Reset all sticky states
              tickSvc.tick();
              $state.go(self.fatalErrorSvc.toState,
                        angular.extend({ tick: tickSvc.currentTick() },
                                       self.fatalErrorSvc.toParams));
            } catch (error) {
                fatalErrorSvc.setError(error,
                    self.fatalErrorSvc.toState,
                    angular.extend({ tick: tickSvc.currentTick() },
                                     self.fatalErrorSvc.toParams));
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
