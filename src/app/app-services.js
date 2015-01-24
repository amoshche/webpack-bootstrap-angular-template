//(function(window, angular, app, undefined) {
    'use strict';

    var deparam = require('jquery-deparam');

    angular.module('app.app-services',[
    ])
    .factory('criticalErrorSvc', function() {
        function CriticalErrorSvc() {
            var self = this;
            self.errors = {};
            self.hasErrors = false;
            self.pushError = function(place, error) {
                self.errors[place] = error;
                self.hasErrors = _(self.errors).keys().length>0;
            };
            self.clearError = function(place) {
                delete self.errors[place];
                self.hasErrors = _(self.errors).keys().length>0;
            };
            self.reset = function() {
                self.hasErrors = false;
                self.errors = {};
            };
        }
        return new CriticalErrorSvc();
    })
    .factory('transitionMemoSvc', function() {
        function TransitionMemoSvc() {
            var self = this;
            self.tData = undefined;
        }
        return new TransitionMemoSvc();
    })
    .factory('urlParamEncodingSvc', function($filter) {
        function UrlParamEncodingSvc() {
            var self = this;
            self.encode = function(param) {
                return jQuery.param(param);
            };
            self.decode = function(param) {
                return !!param ? (angular.isString(param) ? deparam(param) : param) : {};
            };
        }
        return new UrlParamEncodingSvc();
    })
    .provider('tickSvc', function() {
        var self = this;
        self.tick = 0;
        self.setTick = function(tick) {
            self.tick = tick;
        };
        self.tick = function() {
            self.tick++;
        };
        self.currentTick = function() {
            return self.tick;
        };
        return {
            $get: function() {
                return {
                    setTick: self.setTick,
                    tick: self.tick,
                    currentTick: self.currentTick
                };
            }
        };
    })
  ;
//})(window, window.angular, window.app);
