//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('sys-main.sys-main-rt',[
        'sys-main.sys-main-svc',
        'sys-main.sys-main-dir',
        'sys-main.sys-main-ctrl'
    ])
    .provider('sysMainConfig', function() {
        var self = this;
        self.config = { ver: 1, name: "Any System Main Entry First Config" };
        return {
            config: function(cfg) {
                self.config = cfg;
            },
            $get: function() {
                return {
                    config: self.config
                };
            }
        };
    })
    .run(function(sysMainConfig) {
        //executed once per app and can be used to apply special configuration setup
    })
    .config((function(state) { return function ($stateProvider) {
        $stateProvider
            .state('app.sysA', angular.extend(angular.copy(state),{
                sys:'sysA',
                url: '/sysA',
                views: {
                    'sysA-nav-tabs': {
                      template:  require('./sys-main-nav-tabs-tpl.html'),
                      controller: 'SysNavTabsCtrl as sys'
                    },
                    'sysA-menu': {
                      template:  require('./sys-main-nav-tpl.html'),
                      controller: 'SysNavCtrl as sys'
                    },
                    'sysA': {
                      template: require('./sys-main-tpl.html'),
                      controller: 'SysMainCtrl as sys'
                    }
                }
            }))
            .state('app.sysB', angular.extend(angular.copy(state),{
                sys:'sysB',
                url: '/sysB',
                views: {
                    'sysB-nav-tabs': {
                      template:  require('./sys-main-nav-tabs-tpl.html'),
                      controller: 'SysNavTabsCtrl as sys'
                    },
                    'sysB-menu': {
                      template:  require('./sys-main-nav-tpl.html'),
                      controller: 'SysNavCtrl as sys'
                    },
                    'sysB': {
                        template: require('./sys-main-tpl.html'),
                        controller: 'SysMainCtrl as sys'
                    }
                }
            }));
        };
    })({
        onEnter: function(appErrSvc){
            appErrSvc.clear(this.sys);
        },
        resolve:{
            sys: function() {
                return this.self.sys;
            },
            // This is sample how we can pass data through the resolver instance (this.self)
            sysDecorated: function($q, sys){
                this.self.decorator = " Decorator"; // can be set from the callback in service call
                return $q.when(sys + this.self.decorator).promise;
            },
            sysDecorator: function(sysDecorated) {
                return this.self.decorator;
            }
        },
        deepStateRedirect: true,
        sticky: true
    }))
  ;
//})(window, window.angular, window.app);
