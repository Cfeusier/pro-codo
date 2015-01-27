angular.module('Procodo', [
  'Procodo.userServices',
  'Procodo.devServices',
  'Procodo.npServices',
  'Procodo.projectsServices',
  'Procodo.projectServices',
  'Procodo.users',
  'Procodo.nav',
  'Procodo.projects',
  'Procodo.landing',
  'Procodo.devs',
  'Procodo.nps',
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
    .when('/devs/dashboard', {
      templateUrl: 'app/devs/dashboard.html',
      controller: 'DevsCtrl'
    })
    .when('/nps/dashboard', {
      templateUrl: 'app/nps/dashboard.html',
      controller: 'NpsCtrl'
    })
    .when('/devs/new', {
      templateUrl: 'app/devs/new-profile.html',
      controller: 'ProfilesCtrl'
    })
    .when('/nps/new', {
      templateUrl: 'app/nps/new-profile.html',
      controller: 'NpsProfilesCtrl'
    })
    .when('/projects/new', {
      templateUrl: 'app/projects/new-project.html',
      controller: 'ProjectsCtrl'
    })
    .when('/projects', {
      templateUrl: 'app/projects/index.html',
      controller: 'ProjectsCtrl'
    })
    .when('/projects/:projId', {
      templateUrl: 'app/projects/project.html',
      controller: 'ProjectsCtrl'
    })
    .when('/not-found', {
      templateUrl: 'app/landing/not-found.html',
      controller: 'LandingCtrl'
    })
    .when('/', {
      templateUrl: 'app/landing/home.html',
      controller: 'LandingCtrl'
    })
    .otherwise({
      redirectTo: '/not-found'
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
