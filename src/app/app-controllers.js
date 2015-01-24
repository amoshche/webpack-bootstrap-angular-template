//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('app.app-controllers',[
        'app.app-services'
    ])
    .controller('ApplicationController', function(
        $scope,
        $modal,
        criticalErrorSvc,
        tickSvc,
        $state,
        $stickyState,
        $deepStateRedirect) {
            var self = this;
            $scope.criticalErrorSvc = criticalErrorSvc;
            $scope.$watchCollection('criticalErrorSvc.errors', function() {
                if(criticalErrorSvc.hasErrors) {
                    self.hasCriticalErrors = true;
                } else {
                    self.hasCriticalErrors = false;
                }
            });

            self.reload = function() {
                //TODO
                //Reset deepStateRedirect
                //Reset all sticky states
                tickSvc.tick();
                $state.go($state.current, { tick: tickSvc.currentTick() });
            };

        }
    )
  ;
//})(window, window.angular, window.app);
