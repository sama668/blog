'use strict';
require.config({
    //baseUrl: '',
    paths: {
        'jquery-base': '../bower_components/jquery/dist/jquery',
        'jquery-migrate': '../bower_components/jquery-migrate/jquery-migrate',
        'angular': '../bower_components/angular/angular',
        'angular-route': '../bower_components/angular-route/angular-route',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
        'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-animate': '../bower_components/angular-animate/angular-animate',
        'angular-touch': '../bower_components/angular-touch/angular-touch',
        'angular-mocks': '../bower_components/angular-mocks/angular-mocks'
    },
    shim: {
        'jquery-migrate': ['jquery-base'],
        'jquery': ['jquery-migrate'],
        'angular': {
            deps: ['jquery-base'],
            exports: 'angular'
        },
        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-resource': ['angular'],
        'angular-animate': ['angular'],
        'angular-touch': ['angular'],
        'angular-mocks': {
            deps: ['angular'],
            exports: 'angular.mock'
        }
    }
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require([
    'angular',
    'app',
    'appConfig',
    'routes',
    'angular-route',
    'angular-cookies',
    'angular-sanitize',
    'angular-resource',
    'angular-animate',
    'angular-touch'
], function (angular, app) {
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function () {
        angular.resumeBootstrap([app.name]);
    });
});