//(function(window, angular, app, undefined) {
    'use strict';

    angular.module('stickyB.stickyB-svc',[
    ])
    .factory('stateManagerFactory', /*@ngInject*/function($templateCache) {
        function StateManagerFactory() {
            function StateManager(stickyB, tabs, updateParamsF) {
                var mgr = this;
                mgr.stickyB = stickyB;
                mgr.tabs=[];
                mgr.actives={};
                mgr.params={};
                mgr.subTabControllers={};
                _.each(tabs,
                    function(t) {
                        $templateCache.put(t.url, t.tmpl);
                        if(!mgr.actives[t.id])
                            mgr.actives[t.id] = false;
                        if(!mgr.params[t.id])
                            mgr.params[t.id] = {};
                        mgr.tabs.push({
                            id: t.id,
                            name: t.name,
                            url: t.url,
                            controller: /*@ngInject*/function TabController($scope) {
                                var tab = this;
                                $scope.tab = tab;
                                tab.id = t.id;
                                tab.registerSubTabCtrl = function(subTab, subTabCtrl) {
                                    if(!mgr.subTabControllers[t.id]) {
                                        mgr.subTabControllers[t.id] = {};
                                    }
                                    mgr.subTabControllers[t.id][subTab] = subTabCtrl;
                                };
                                tab.active = function() { return mgr.active; };
                                tab.params = function() { return mgr.params[t.id]; };
//                                 mgr.tabParamsToApply[t]={};
//                                 tab.paramsToApply = function() { return mgr.tabParamsToApply[t]; };
                                tab.updateParams = function(params) {
                                    mgr.updateParams(t.id, params);
                                };
//                                 report.paramsToApplyUpdated = function() {
//                                     mgr.recalculateApplyState(r);
//                                 };
//                                 report.getData = function(subReport, subParams, querycb) {
//                                     return getDataF(r, mgr.reportParams[r], subReport, subParams, mgr.dynFilters[r], querycb);
//                                 };
                            }
                        });
                    }
                );

                mgr.setParams = function(params) {
                    _.each(_(mgr.params).keys(), function(x) { mgr.params[x] = {}; });
                    angular.extend(mgr.params, params);
                    mgr.active = mgr.params.active;
                    _.each(_(mgr.actives).keys(), function(x) { mgr.actives[x] = (mgr.active == x); });
                };

                mgr.updateParams = function(key, params) {
                    if(angular.isObject(mgr.params[key]) || angular.isArray(mgr.params[key])) {
                        angular.extend(mgr.params[key], params);
                    } else {
                        mgr.params[key] = params;
                    }
                    updateParamsF(mgr.params);
                };

            }

            var self = this;
            self.manager = function(stickyB, tabs, updateReportParamsF) {
                return new StateManager(stickyB, tabs, updateReportParamsF);
            };
        }
        return new StateManagerFactory();
    })
  ;
//})(window, window.angular, window.app);
