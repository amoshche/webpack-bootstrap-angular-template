//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('app.app-router',[
        'app.app-services',
        'app.app-controllers'
    ])
    .config(function ($stateProvider) {
        $stateProvider
        .state('app', {
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
                '': {
                  template: require('./app-template.html'),
                  controller: 'ApplicationController as app'
                }
            }
        });
    })
  ;
//})(window, window.angular, window.app);
