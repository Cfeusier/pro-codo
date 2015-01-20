angular.module('Procodo.services', [])

.factory('Users', function ($http, $location, $window) {
  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isUser = function () {
    return !!$window.localStorage.getItem('io.procodo');
  };

  var logout = function () {
    $window.localStorage.removeItem('io.procodo');
    $location.path('/login');
  };

  var getUser = function () {
    return $http({
      method: 'GET',
      url: '/api/users/',
    }).then(function(resp) {
      return resp.data;
    });
  };

  return {
    login: login,
    signup: signup,
    isUser: isUser,
    logout: logout,
    getUser: getUser
  };
});