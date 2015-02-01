angular.module('Procodo.userServices', [])

.factory('Users', function ($http, $location, $window, LsKeys) {

  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: user
    })
    .then(function (resp) { return resp.data.token; });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) { return resp.data.token; });
  };

  var isUser = function () {
    return !!LsKeys.lsGet('io.procodo');
  };

  var getUType = function () {
    return LsKeys.lsGet('io.procodo.uType');
  };

  var logout = function () {
    LsKeys.removeAllKeys();
    $location.path('/');
  };

  var getUser = function (cb) {
    if (LsKeys.lsGet('io.procodo.userId')) {
      cb(LsKeys.lsSetUser());
    } else {
      return $http({
        method: 'GET',
        url: '/api/users'
      }).then(function (resp) { cb(resp.data.user); });
    }
  };

  var findUser = function (id) {
    return $http({
      method: 'GET',
      url: '/api/users/' + id
    }).then(function (resp) { return resp.data; });
  };

  return {
    login: login,
    signup: signup,
    isUser: isUser,
    logout: logout,
    getUser: getUser,
    findUser: findUser,
    getUType: getUType
  };

});
