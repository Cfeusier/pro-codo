angular.module('Procodo.services', [])

.factory('User', function ($http, $location, $window) {
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

  return {
    login: login,
    signup: signup,
    isUser: isUser,
    logout: logout
  };
});