//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('stickyB.stickyB-rt',[
        'stickyB.stickyB-svc',
        'stickyB.stickyB-dir',
        'stickyB.stickyB-ctrl'
    ])
    .provider('stickyBMainConfig', function() {
        var self = this;
        self.config = { ver: 1, name: "Any stickyBtem Main Entry First Config" };
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
    .run(function(stickyBMainConfig) {
        //executed once per app and can be used to apply special configuration setup
    })
    .config((function(state) { return function ($stateProvider) {
        $stateProvider
            .state('app.stickyB_A', angular.extend(angular.copy(state),{
                url: '/stickyB_A',
                data: { //requred for child states which inherit data
                    stickyB:'stickyB_A'
                },
                views: {
                    'stickyB_A-nav-tabs': {
                      template:  require('./stickyB-nav-tabs-tpl.html'),
                      controller: 'stickyBNavTabsCtrl as stickyB'
                    },
                    'stickyB_A-menu': {
                      template:  require('./stickyB-nav-tpl.html'),
                      controller: 'stickyBNavCtrl as stickyB'
                    },
                    'stickyB_A': {
                      template: require('./stickyB-tpl.html'),
                      controller: 'stickyBMainCtrl as stickyB'
                    }
                },
            }))
            .state('app.stickyB_B', angular.extend(angular.copy(state),{
                url: '/stickyB_B',
                data: { //requred for child states which inherit data
                    stickyB:'stickyB_B'
                },
                views: {
                    'stickyB_B-nav-tabs': {
                      template:  require('./stickyB-nav-tabs-tpl.html'),
                      controller: 'stickyBNavTabsCtrl as stickyB'
                    },
                    'stickyB_B-menu': {
                      template:  require('./stickyB-nav-tpl.html'),
                      controller: 'stickyBNavCtrl as stickyB'
                    },
                    'stickyB_B': {
                        template: require('./stickyB-tpl.html'),
                        controller: 'stickyBMainCtrl as stickyB'
                    }
                }
            }));
        };
    })({
        onEnter: function(appErrSvc){
            appErrSvc.clear(this.stickyB);
        },
        resolve:{
            stickyB: function() {
                return this.self.data.stickyB;
            },
            // This is sample how we can pass data through the resolver instance (this.self)
            stickyBDecorated: function($q, stickyB){
                this.self.decorator = ' Decorator'; // can be set from the callback in service call
                return $q.when(stickyB + this.self.decorator).promise;
            },
            stickyBDecorator: function(stickyBDecorated) {
                return this.self.decorator;
            },
            stateManager: function($state, $timeout, transitionMemoSvc, urlEncoder, stateManagerFactory, stickyB) {
                if(transitionMemoSvc.tData.to.state.name == ['app',stickyB].join('.')) {
                    $timeout(function() { $state.go(['app',stickyB,'params'].join('.')); });
                }
                return stateManagerFactory.manager(stickyB,
                    [
                      {id: 't1', name: stickyB + ' Tab 1', url:'tabbable/tabbable-tpl.html', tmpl: require('tabbable/tabbable-tpl.html')},
                      {id: 't2', name: stickyB + ' Tab 2', url:'./tab/stickyB-2-tmpl.html', tmpl: require('./tab/stickyB-2-tmpl.html')},
                      {id: 't3', name: stickyB + ' Tab 3', url:'./tab/stickyB-3-tmpl.html', tmpl: require('./tab/stickyB-3-tmpl.html')}
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
                .state('app.stickyB_A.params', angular.extend(angular.copy(state),{
                }))
                .state('app.stickyB_B.params', angular.extend(angular.copy(state),{
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
            'stickyB.params@app': {
                template: '<div style="display: hidden;"></div>',
                controller: function($timeout, $scope, transitionMemoSvc, stickyB, params) {
                    if('stickyB_B' === transitionMemoSvc.tData.to.state.data.stickyB) {
                        $scope.$emit('app.stickyB.params::params', { stickyB: stickyB, params: params || {active: 't2'}});
                    } else {
                        $scope.$emit('app.stickyB.params::params', { stickyB: stickyB, params: params || {active: 't1'}});
                    }
                }
            }
        }
    }))
  ;
//})(window, window.angular, window.app);
