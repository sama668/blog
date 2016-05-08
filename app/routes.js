
define(['app'], function (app) {
    app.config(['$routeProvider', 'routeResolverProvider', config]);

    function config($routeProvider, routeResolverProvider) {
        //todo: Change default views and controllers directory using the following:
        //routeResolverProvider.routeConfig.setBaseDirectories('app/templates/', 'app/templates/');

        //Define routes - controllers will be loaded dynamically
        var route = routeResolverProvider.route;
        $routeProvider
            //route.resolve() accepts the convention to use (name of controller & view) as well as the
            //path where the controller or view lives in the controllers or views folder if it's in a sub folder.
            //For example, the controllers for customers live in controllers/customers and the views are in views/customers.
            //The controllers for orders live in controllers/orders and the views are in views/orders
            //The second parameter allows for putting related controllers/views into subfolders to better organize large projects
            .when('/test', route.resolve({baseName: 'Test', controllerAs: 'viewModel'}))
            .when('/about', route.resolve({baseName: 'About', controllerAs: 'viewModel'}))
            .otherwise({redirectTo: '/'});
    }
});