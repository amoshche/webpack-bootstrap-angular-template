//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('sys-main.sys-main-ctrl',[
        'sys-main.sys-main-svc'
    ])
    .controller('SysMainCtrl', function($scope, sys, sysDecorator, sysDecorated) {
        var self = this;
        self.sys = sys;
        self.sysDecorator = sysDecorator;
        self.sysDecorated = sysDecorated;
        $scope.$on('sys-main::rpt.typ.a.data', function(event, data) {
            $scope.$broadcast('rpt.typ.a::rpt.typ.a.data', data);
        });
        
        $scope.$on('sys-main::rpt.typ.b.data', function(event, data) {
            $scope.$broadcast('rpt.typ.b::rpt.typ.b.data', data);
        });
    })
  ;
//})(window, window.angular, window.app);
