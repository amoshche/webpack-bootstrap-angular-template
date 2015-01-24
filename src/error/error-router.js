//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('error.error-router',[
        'error.error-controllers'
    ])
    .config(function($stateProvider) {
        $stateProvider.state('app.error', {
            url: '/error',
            views: {
                '@': {
                    template: require('./error-template.html'),
                    controller: 'ErrorController as error'
                }
            }
        });
    })
  ;
//})(window, window.angular, window.app);
