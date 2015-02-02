//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('app.app-rt',[
        'app.app-svc',
        'app.app-dir',
        'app.app-ctrl',
        'stickyB.stickyB-rt'
    ])
    .config(function ($stateProvider) {
        $stateProvider
        .state('app', {
            onEnter: function(appErrSvc){
                appErrSvc.reset();
            },
            resolve:{
                tick: function($stateParams, tickSvc) {
                    tickSvc.setTick($stateParams.tick);
                    return true;
                },
                urlEncoder: function(urlParamEncodingSvc) {
                    return urlParamEncodingSvc;
                }
            },
            url: '/:tick',
            views: {
                '@': {
                  template: require('./app-tpl.html'),
                  controller: 'AppCtrl as app'
                }
            }
        });
    })
  ;
//})(window, window.angular, window.app);
