//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('boot', [
        'ngSanitize',
        'ngAnimate',
        'ngAria',
        'ngResource',
        'ui.router',
        'ct.ui.router.extras',
        'ui.bootstrap',
        'app.app-rt',
        'err.err-rt'
    ])
    .config(function ($urlRouterProvider) {
      $urlRouterProvider
          .when('/:tick/', '/:tick')
          .otherwise('/0');
    })
    .run(function ($rootScope,
                   $state,
                   $stateParams,
                   $stickyState,
                   $timeout,
                   $location,
                   urlParamEncodingSvc,
                   fatalErrSvc,
                   transitionMemoSvc) {

        //shim for expressions in templates
        $rootScope.$stateParamsDecoded = function() {
            return _.object(
                _.map($stateParams, function(value, key) { return [
                    key,
                    urlParamEncodingSvc.decode(value)
                ];})
            );
        };
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.
        $rootScope.$state = $state;
        $rootScope.$stickyState = $stickyState;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$location = $location;

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            event.preventDefault();
            fatalErrSvc.setError(error,
                transitionMemoSvc.tData.to.state,
                transitionMemoSvc.tData.to.params);
        });

        $rootScope.$on('$transitionStart', function(event, tData) {
            transitionMemoSvc.tData = tData;
        });
    })
  ;
//})(window, window.angular, window.app);
