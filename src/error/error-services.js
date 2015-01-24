//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('error.error-services',[
    ])
    .factory('fatalErrorSvc', function($location, $state, $timeout) {
        function FatalErrorSvc() {
            var self = this;
            self.error = undefined;
            self.errorState = undefined;
            self.errorParams = undefined;
            self.toState = undefined;
            self.toParams = undefined;
            self.attemptedUrl = undefined;
            //TODO check for cycling error when fatalErrorSvc.toState
            //  fail several times in a row.
            //Remeber the toState, and initial error, increment counter.
            //When counter limit reached
            //  if repeating toSate is already app.error then
            //    call app.fatalError with remebered initial error
            //  else try to redirect to app.err with remebered initial error.
            self.setError = function(error, toState, toParams, attemptedUrl) {
                self.error =  error;
                self.toState = toState;
                self.toParams = toParams;
                self.attemptedUrl = $location.protocol() + '://' +
                                    $location.host() + ':' +
                                    $location.port() +'/' +
                                    $state.href(toState, toParams);
                $timeout(function() { $state.go(self.errorState || 'app.error',
                                                self.errorParams || undefined); });
              };
            self.reset = function() {
                self.error = undefined;
                self.errorState = undefined;
                self.errorParams = undefined;
                self.toState = undefined;
                self.toParams = undefined;
                self.attemptedUrl = undefined;
            };
        }
        return new FatalErrorSvc();
    })
  ;
//})(window, window.angular, window.app);
