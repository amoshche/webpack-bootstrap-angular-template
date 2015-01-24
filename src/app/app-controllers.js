//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('app.app-controllers',[
        'app.app-services'
    ])
    .controller('ApplicationController', function($stickyState, $state, $deepStateRedirect, $scope, $modal, criticalErrorSvc, transitionMemoSvc, tickSvc) {
        var self = this;
        $scope.criticalErrorSvc = criticalErrorSvc;
        $scope.$watchCollection('criticalErrorSvc.errors', function() {
            if(criticalErrorSvc.hasErrors) {
                self.hasCriticalErrors = true;
            } else {
                self.hasCriticalErrors = false;
            }
        });

        //force reload
        if(transitionMemoSvc.tData.to.state.$$state().includes['app.error']) {
            //here some condition required to completely reload routing subsystem
            //TODO how to do it properly?
            //tickSvc.tick();
            //$state.go($state.current, { cfgTick: tickSvc.currentTick() });
            //$state.params.endpoint = undefined;
        }

        self.reload = function() {
            //here again some condition required to completely reload routing subsystem
            //$state.params.endpoint = undefined;
            //tickSvc can be used for example as a parameter to the very first state
            tickSvc.tick();
            $state.go($state.current, { cfgTick: tickSvc.currentTick() });
        };

    })
  ;
//})(window, window.angular, window.app);
