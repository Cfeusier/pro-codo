angular.module('Procodo', [
  'Procodo.lsKeysServices',
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

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/templates/login.html',
      controller: 'UsersCtrl'
    })
    .when('/signup', {
      templateUrl: 'app/templates/signup.html',
      controller: 'UsersCtrl'
    })
    .when('/devs/dashboard', {
      templateUrl: 'app/templates/dev-dashboard.html',
      controller: 'DevsCtrl'
    })
    .when('/nps/dashboard', {
      templateUrl: 'app/templates/np-dashboard.html',
      controller: 'NpsCtrl'
    })
    .when('/devs/new', {
      templateUrl: 'app/templates/new-dev-profile.html',
      controller: 'ProfilesCtrl'
    })
    .when('/nps/new', {
      templateUrl: 'app/templates/new-np-profile.html',
      controller: 'NpsProfilesCtrl'
    })
    .when('/projects/new', {
      templateUrl: 'app/templates/new-project.html',
      controller: 'ProjectsCtrl'
    })
    .when('/projects', {
      templateUrl: 'app/templates/projects.html',
      controller: 'ProjectsCtrl'
    })
    .when('/projects/:projId', {
      templateUrl: 'app/templates/project.html',
      controller: 'ProjectsCtrl'
    })
    .when('/about', {
      templateUrl: 'app/templates/about.html',
      controller: 'LandingCtrl'
    })
    .when('/project-guidelines', {
      templateUrl: 'app/templates/project-guidelines.html',
      controller: 'LandingCtrl'
    })
    .when('/not-found', {
      templateUrl: 'app/templates/not-found.html',
      controller: 'LandingCtrl'
    })
    .when('/', {
      templateUrl: 'app/templates/home.html',
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
    if (next.$$route.originalPath !== '/login' && next.$$route.originalPath !== '/about') {
      if (next.$$route && !Users.isUser()) {
        $location.path('/signup');
      }
    }
  });
});
