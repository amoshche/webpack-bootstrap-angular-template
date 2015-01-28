//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('err.err-ctrl',[
        'err.err-svc'
    ])
    .controller('ErrCtrl', function(
        fatalErrSvc,
        tickSvc,
        $state,
        $stickyState,
        $deepStateRedirect) {
            var self = this;
            self.fatalErrSvc = fatalErrSvc;
            self.retry = function() {
                try {
                    // The following shpuld not be required
                    // as the very first part of state path changes
                    // _($stickyState.getInactiveStates()).
                    //     each(function(state) {
                    //         $deepStateRedirect.reset(state.self.name);
                    //         $stickyState.reset(state.self.name);
                    // });
                    tickSvc.tick();
                    $state.go(self.fatalErrSvc.toState,
                            angular.extend({ tick: tickSvc.currentTick() },
                                             self.fatalErrSvc.toParams));
                } catch (error) {
                    fatalErrSvc.setError(error,
                        self.fatalErrSvc.toState,
                        angular.extend({ tick: tickSvc.currentTick() },
                                         self.fatalErrSvc.toParams));
                }
            };
            self.getError = function() {
                return self.fatalErrSvc.error;
            };
            self.getErrorName = function() {
                return self.fatalErrSvc.error.name || 'Unknown error';
            };
            self.getErrorMsg = function() {
                return self.fatalErrSvc.error.message || 'No error message available';
            };
            self.getErrorTrace = function() {
                return self.fatalErrSvc.error.stack || 'No error stack trace available';
            };
            self.getAttemptedUrl = function() {
                return self.fatalErrSvc.attemptedUrl;
            };
        }
    )
  ;
//})(window, window.angular, window.app);
