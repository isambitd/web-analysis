angular.module('www', ['ui.bootstrap','ui.router','ngAnimate']);

angular.module('www').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('advanced', {
        url: '/advanced',
        templateUrl: 'partial/advanced/advanced.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');
    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial/home/home.html'
        })


});

angular.module('www').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
