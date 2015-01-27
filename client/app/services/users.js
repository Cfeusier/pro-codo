angular.module('Procodo.userServices', [])

.factory('Users', function ($http, $location, $window) {

  var L_S_KEYS = [
  'io.procodo', 'io.procodo.userId', 'io.procodo.username',
  'io.procodo.uType', 'io.procodo.profileId', 'io.procodo.user',
  'io.procodo.dev.profileId', 'io.procodo.profileSet'
  ];

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
    return !!lsGet('io.procodo');
  };

  var logout = function () {
    angular.forEach(L_S_KEYS, function (key) { unset(key); });
    $location.path('/');
  };

  var unset = function (key) {
    $window.localStorage.removeItem(key);
  };

  var lsGet = function (key) {
    return $window.localStorage.getItem(key);
  };

  var lsSetUser = function () {
    return {
      username: lsGet('io.procodo.username'),
      _id: lsGet('io.procodo.userId'),
      uType: lsGet('io.procodo.uType')
    };
  };

  var getUser = function (cb) {
    if (lsGet('io.procodo.userId')) {
      cb(lsSetUser());
    } else {
      return $http({
        method: 'GET',
        url: '/api/users'
      }).then(function(resp) { cb(resp.data.user); });
    }
  };

  var findUser = function (id) {
    return $http({
      method: 'GET',
      url: '/api/users/' + id
    }).then(function(resp) { return resp.data; });
  };

  return {
    login: login,
    signup: signup,
    isUser: isUser,
    logout: logout,
    getUser: getUser,
    findUser: findUser
  };

});
