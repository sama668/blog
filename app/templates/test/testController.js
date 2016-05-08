
define(['app', 'angular','templates/test/testService'], function (app, angular) {
    var moduleId = 'TestController';
    app.register.controller(moduleId, ['testService', controller]);

    /**
     *  controller for test view
     *
     * @returns {void} .
     */
    function controller(testService) {
        var viewModel = this;
        var userModel = {
            firstName: 'lifeweb',
            lastName: 'Co.'
        };

        angular.extend(viewModel, userModel);
    }
});