
define(['angular'], function (angular) {
    'use strict';
    var appModule = angular.module('routeResolverModule', []);

    var moduleId = 'routeResolver';
    //Must be a provider since it will be injected into module.config()
    appModule.provider(moduleId, routeResolver);

    function routeResolver() {
        this.$get = $get;
        this.routeConfig = routeConfig();
        this.route = route(this.routeConfig);

        function $get() {
            return this;
        }

        function routeConfig() {
            var viewsDirectory = 'dist/templates/';
            var controllersDirectory = 'dist/templates/';

            var setBaseDirectories = function (viewsDir, controllersDir) {
                viewsDirectory = viewsDir;
                controllersDirectory = controllersDir;
            };

            var getViewsDirectory = function () {
                return viewsDirectory;
            };

            var getControllersDirectory = function () {
                return controllersDirectory;
            };

            return {
                setBaseDirectories: setBaseDirectories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory
            };
        }

        function route(routeConfig) {
            var resolveDependencies = function ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply()
                });

                return defer.promise;
            };

            return {
                resolve: resolve
            };

            function resolve(options) {
                var setting = {
                    baseName: null,
                    path: null,
                    controllerAs: null,
                    secure: false
                };
                angular.extend(setting, options);

                if (!setting.path)
                    setting.path = '';

                var routeDef = {};
                var baseFileName = setting.baseName.charAt(0).toLowerCase() + setting.baseName.substr(1);
                routeDef.caseInsensitiveMatch = true;
                routeDef.templateUrl = routeConfig.getViewsDirectory() + setting.path + baseFileName + '/' + baseFileName + '.html';
                routeDef.controller = setting.baseName + 'Controller';
                if (setting.controllerAs)
                    routeDef.controllerAs = setting.controllerAs;
                routeDef.secure = setting.secure ? secure : false;
                routeDef.resolve = {
                    load: ['$q', '$rootScope', function ($q, $rootScope) {
                        var dependencies = [routeConfig.getControllersDirectory() + setting.path + baseFileName + '/' + baseFileName + 'Controller.js'];
                        return resolveDependencies($q, $rootScope, dependencies);
                    }]
                };

                return routeDef;
            }
        }
    }
});