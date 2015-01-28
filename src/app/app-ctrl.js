//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('app.app-ctrl',[
        'app.app-svc'
    ])
    .controller('AppCtrl', function(
        $scope,
        $timeout,
        $modal,
        appErrSvc,
        tickSvc,
        $state,
        $stickyState,
        $deepStateRedirect) {
            var self = this;
            $scope.appErrSvc = appErrSvc;
            $scope.$watchCollection('appErrSvc.errors', function() {
                if(appErrSvc.hasErrors) {
                    self.hasErrors = true;
                } else {
                    self.hasErrors = true;
                }
            });

            self.reload = function() {
                tickSvc.tick();
                $state.go($state.current, { tick: tickSvc.currentTick() });
            };

            self.goSys = function(sys) {
                $state.go(['app',sys].join('.'));
            };
        }
    )
  ;
//})(window, window.angular, window.app);
