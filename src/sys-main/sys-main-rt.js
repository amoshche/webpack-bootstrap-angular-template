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
                url: '/sysA',
                data: { //requred for child states which inherit data
                    sys:'sysA'
                },
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
                },
            }))
            .state('app.sysB', angular.extend(angular.copy(state),{
                url: '/sysB',
                data: { //requred for child states which inherit data
                    sys:'sysB'
                },
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
                return this.self.data.sys;
            },
            // This is sample how we can pass data through the resolver instance (this.self)
            sysDecorated: function($q, sys){
                this.self.decorator = ' Decorator'; // can be set from the callback in service call
                return $q.when(sys + this.self.decorator).promise;
            },
            sysDecorator: function(sysDecorated) {
                return this.self.decorator;
            },
            sysManager: function($state, $timeout, transitionMemoSvc, urlEncoder, sysManagerFactory, sys) {
                if(transitionMemoSvc.tData.to.state.name == ['app',sys].join('.')) {
                    $timeout(function() { $state.go(['app',sys,'params'].join('.')); });
                }
                return sysManagerFactory.manager(sys,
                    [
                      {id: 't1', name: sys + ' Tab 1', url:'./tab/stickyB-1-tmpl.html', tmpl: require('./tab/stickyB-1-tmpl.html')},
                      {id: 't2', name: sys + ' Tab 2', url:'./tab/stickyB-2-tmpl.html', tmpl: require('./tab/stickyB-2-tmpl.html')},
                      {id: 't3', name: sys + ' Tab 3', url:'./tab/stickyB-3-tmpl.html', tmpl: require('./tab/stickyB-3-tmpl.html')}
                    ],
                    function(params) {
                        $state.go($state.current,{params: urlEncoder.encode(params)});
                    }
                );
            }
        },
        deepStateRedirect: true,
        sticky: true
    }))
    //this is the final state responsible for parameters resolution and passing them back
    .config((function(state) { return function ($stateProvider) {
            $stateProvider
                .state('app.sysA.params', angular.extend(angular.copy(state),{
                }))
                .state('app.sysB.params', angular.extend(angular.copy(state),{
                }));
        };
    })({
        resolve: {
            params: function($stateParams, $state, urlEncoder) {
                // here the whole set of parameters is reviewed and error can be actioned
                return !!$stateParams.params ?
                            urlEncoder.decode($stateParams.params) :
                            undefined ;
            }
        },
        url: '/:params',
        views: {
            'sys.params@app': {
                template: '<div style="display: hidden;"></div>',
                controller: function($timeout, $scope, transitionMemoSvc, sys, params) {
                    if('sysB' === transitionMemoSvc.tData.to.state.data.sys) {
                        $scope.$emit('app.sys.params::params', { sys: sys, params: params || {active: 't2'}});
                    } else {
                        $scope.$emit('app.sys.params::params', { sys: sys, params: params || {active: 't1'}});
                    }
                }
            }
        }
    }))
  ;
//})(window, window.angular, window.app);
