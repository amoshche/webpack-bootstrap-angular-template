//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('appBoot',[
        'boot',
        'ngMockE2E'
    ])
    .run(function($httpBackend) {
        $httpBackend.whenGET(/\.(html'|html|json|css|swf|png|gif|cur|svg|ttf|eot|woff)$/).passThrough();
        $httpBackend.whenGET(/\.(svg\?(v=[0-9]\.[0-9]\.[0-9])?|ttf\?(v=[0-9]\.[0-9]\.[0-9])?|eot\?(v=[0-9]\.[0-9]\.[0-9])?|woff\?(v=[0-9]\.[0-9]\.[0-9])?)$/).passThrough();
    })
  ;
//})(window, window.angular, window.app);
