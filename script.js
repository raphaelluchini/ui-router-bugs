// Code goes here

var myApp = angular.module('myApp', ['ui.router', 'ct.ui.router.extras']);

myApp.config(function ($stateProvider, $urlRouterProvider, $futureStateProvider, $locationProvider, $urlMatcherFactoryProvider) {
  var states = [
      {
        'stateName': 'root',
        'urlPrefix': '/root',
        'abstract': true,
        'type': 'async',
        'views': {
          '@': {
            template: '<ui-view/>'
          }
        }
      },
      {
        'stateName': 'root.home',
        'urlPrefix': '/',
        'type': 'async',
        'views': {
          '@': {
            'templateUrl': 'home.html',
          }
        }
      },
      {
        'stateName': 'about',
        'urlPrefix': '/about',
        'type': 'async',
        'views': {
          '@': {
            'templateUrl': 'root.html'
          }
        }
      },
      {
        'stateName': 'root.other',
        'urlPrefix': '/:slug',
        'type': 'async',
        'views': {
          '@': {
            'templateUrl': 'other.html'
          }
        }
      }
    ];
  $urlMatcherFactoryProvider.strictMode(false);
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  function requireCtrlStateFactory ($q, futureState) {
    var d = $q.defer(); // make a deferred
    var loads = 0;

    var resolveFutureState = {
      name: futureState.stateName,
      url: futureState.urlPrefix,
      views: {}
    };
    
    angular.forEach(futureState.views, function (view, key) {
        resolveFutureState.views[key] = {};
        
        setTimeout(function () {
          resolveFutureState.views[key].templateUrl = view.templateUrl;
          finish(futureState);
        }, 1000);
    });

    function finish (f) {
      loads++;
      if (loads === Object.keys(f.views).length) {
        d.resolve(f);
      }
    }

    return d.promise;
  }

  angular.forEach(states, function (state) {
      $futureStateProvider.futureState(state);
    });


  $futureStateProvider.stateFactory('async', requireCtrlStateFactory);
});