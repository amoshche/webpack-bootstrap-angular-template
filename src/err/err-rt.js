//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('err.err-rt',[
        'err.err-svc',
        'err.err-dir',
        'err.err-ctrl'
    ])
    .config(function($stateProvider) {
        $stateProvider.state('app.err', {
            url: '/err',
            views: {
                '@': {
                    template: require('./err-tpl.html'),
                    controller: 'ErrCtrl as err'
                }
            }
        });
    })
  ;
//})(window, window.angular, window.app);
