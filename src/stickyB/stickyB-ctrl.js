//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('stickyB.stickyB-ctrl',[
        'stickyB.stickyB-svc'
    ])
    .controller('stickyBNavTabsCtrl', function($scope, stateManager) {
        var self = this;
        self.mgr = stateManager;
        self.setActiveTab = function(id) {
            self.mgr.updateParams('active', id);
        };
        $scope.$on('app::stickyB.params', function(event, stickyBParams) {
            if(self.mgr.stickyB == stickyBParams.stickyB) {
                self.mgr.setParams(stickyBParams.params);
            }
        });
    })
    .controller('stickyBNavCtrl', function($scope, stickyB) {
        var self = this;
        self.stickyB = stickyB;
    })
    .controller('stickyBMainCtrl', function($scope, stickyB, stickyBDecorator, stickyBDecorated, stateManager) {
        var self = this;
        self.stickyB = stickyB;
        self.stickyBDecorator = stickyBDecorator;
        self.stickyBDecorated = stickyBDecorated;
        self.mgr = stateManager;
    })
  ;
//})(window, window.angular, window.app);
