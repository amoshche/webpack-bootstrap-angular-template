//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('error.error-services',[
    ])
    .factory('fatalErrorSvc', function() {
        function FatalErrorSvc() {
            var self = this;
            self.error = undefined;
            self.errorState = undefined;
            self.errorParams = undefined;
            self.toState = undefined;
            self.toParams = undefined;
            self.attemptedUrl = undefined;
            self.setError = function(error, toState, toParams, attemptedUrl) {
                self.error =  error;
                self.toState = toState;
                self.toParams = toParams;
                self.attemptedUrl = attemptedUrl;
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
