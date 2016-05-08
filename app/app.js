
define(['angular', 'routeResolver'], function (angular) {
    var app = angular.module('app', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngAnimate',
        'ngTouch',
        'routeResolverModule']);

    app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', appConfig]);

    function appConfig($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.register =
        {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
    }

    return app;
});