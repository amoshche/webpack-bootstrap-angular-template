(function(window, angular, app, undefined) {
    'use strict';

    angular.module('app', [
        'ngSanitize',
        'ngAnimate',
        'ngAria',
        'ngResource',
        'ui.router',
        'ct.ui.router.extras',
        'app.app-router',
        'error.error-router'
    ])
    .config(function ($urlRouterProvider) {
      $urlRouterProvider
          // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
          // Here we are just setting up some convenience urls.
          .when('/', '/0')
          .when('/', '/0')
          .otherwise('/error');
    })
    .run(function ($rootScope,
                   $state,
                   $stateParams,
                   $stickyState,
                   $timeout,
                   $location,
                   urlParamEncodingSvc,
                   fatalErrorSvc,
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
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its descendants is active.
        $rootScope.$state = $state;
        $rootScope.$stickyState = $stickyState;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$location = $location;

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            event.preventDefault();
            //TODO check for cycling error when fatalErrorSvc.errorState fail several times in a row
            //remeber the toState, and initial error, increment counter, fail when counter limit reached
            //try to redirect to app.err with remebered error
            //and again follow the rule to check if there are several times app.error hit
            //if so call app.fatalError with remebered initial error
            fatalErrorSvc.setError(error,
                    transitionMemoSvc.tData.to.state,
                    transitionMemoSvc.tData.to.params,
                    $location.protocol() + '://' + $location.host() + ':' + $location.port() +'/' +
                    $state.href(transitionMemoSvc.tData.to.state,
                                transitionMemoSvc.tData.to.params));
            $timeout(function() { $state.go(fatalErrorSvc.errorState || 'app.error',
                                            fatalErrorSvc.errorParams || toParams); });
        });

        $rootScope.$on('$transitionStart', function(event, tData) {
            transitionMemoSvc.tData = tData;
        });
    })
  ;
})(window, window.angular, window.app);
