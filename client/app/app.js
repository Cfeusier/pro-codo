angular.module('Procodo', [
  'Procodo.services',
  'Procodo.users',
  'Procodo.nav',
  'Procodo.landing',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/users/login.html',
      controller: 'UsersCtrl'
    })
    .when('/signup', {
      templateUrl: 'app/users/signup.html',
      controller: 'UsersCtrl'
    })
    .when('/', {
      templateUrl: 'app/landing/home.html',
      controller: 'LandingCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $httpProvider.interceptors.push('Tokenize');
})
.factory('Tokenize', function ($window) {
  var tokenize = {
    request: function(req) {
      var jwt = $window.localStorage.getItem('io.procodo');
      if (jwt) {
        // user is authed, send token with request
        req.headers['x-access-token'] = jwt;
      }
      req.headers['Allow-Control-Allow-Origin'] = '*';
      return req;
    }
  };
  return tokenize;
})
.run(function ($rootScope, $location, Users) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route.originalPath !== '/login') {
      if (next.$$route && !Users.isUser()) {
        $location.path('/signup');
      }
    }
  });
});