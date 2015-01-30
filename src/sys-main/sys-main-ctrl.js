//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('sys-main.sys-main-ctrl',[
        'sys-main.sys-main-svc'
    ])
    .controller('SysNavTabsCtrl', function($scope, sysManager) {
        var self = this;
        self.mgr = sysManager;
        self.setActiveTab = function(id) {
            self.mgr.updateParams('active', id);
        };
        $scope.$on('app::sys.params', function(event, sysParams) {
            if(self.mgr.sys == sysParams.sys) {
                self.mgr.setParams(sysParams.params);
            }
        });
    })
    .controller('SysNavCtrl', function($scope, sys) {
        var self = this;
        self.sys = sys;
    })
    .controller('SysMainCtrl', function($scope, sys, sysDecorator, sysDecorated) {
        var self = this;
        self.sys = sys;
        self.sysDecorator = sysDecorator;
        self.sysDecorated = sysDecorated;
    })
  ;
//})(window, window.angular, window.app);
