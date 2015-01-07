// Code goes here

var myApp = angular.module('myApp', ['ui.router', 'ct.ui.router.extras']);

myApp.config(function ($stateProvider, $urlRouterProvider, $futureStateProvider, $locationProvider) {
  var state = {
    'stateName': 'home',
    'url': '/home',
    'templateUrl': 'home.html',
    'type': 'async',
    'controller': function () {
      console.log('Hello Home');
    },
  };
  $futureStateProvider.futureState(state);
  var state2 = {
    'stateName': 'other',
    'url': '/other',
    'templateUrl': 'other.html',
    'type': 'async',
    'controller': function () {
      console.log('Hello Other');
    },
  };
  $futureStateProvider.futureState(state2);
  $urlRouterProvider.otherwise('/home');
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $futureStateProvider.stateFactory('async', function requireCtrlStateFactory($q, futureState) {
    var d = $q.defer(); // make a deferred
    setTimeout(function () {
      console.log("Comming Here")
      var fullstate = {
        controller: futureState.controller,
        name: futureState.stateName,
        url: futureState.url,
        templateUrl: futureState.templateUrl,
        controllerAs: futureState.controllerAs
      };
      d.resolve(fullstate);
    }, 1000);
    return d.promise;
  });
});