
define(['app'], function (app) {
    var moduleId = 'testService';
    app.register.factory(moduleId, [testService]);

    function testService() {
        var services={
            add: add
        };

        return services;

        /**
         * add service
         *
         * @param {string|Object} obj .
         *
         * @returns {Object} .
         */
        function add(obj){

        }
    }

    return testService;
});