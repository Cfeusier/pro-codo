angular.module('Procodo.lsKeysServices', [])

.factory('LsKeys', function ($http, $location, $window) {

  var L_S_KEYS = [
  'io.procodo', 'io.procodo.userId', 'io.procodo.username',
  'io.procodo.uType', 'io.procodo.profileId', 'io.procodo.user',
  'io.procodo.dev.profileId', 'io.procodo.profileSet'
  ];

  var removeAllKeys = function () {
    angular.forEach(L_S_KEYS, function (key) { unset(key); });
  };

  var unset = function (key) {
    $window.localStorage.removeItem(key);
  };

  var lsGet = function (key) {
    return $window.localStorage.getItem(key);
  };

  var lsSet = function (key, value) {
    $window.localStorage.setItem(key, value);
  };

  var lsSetUser = function () {
    return {
      username: lsGet('io.procodo.username'),
      _id: lsGet('io.procodo.userId'),
      uType: lsGet('io.procodo.uType')
    };
  };

  return {
    removeAllKeys: removeAllKeys,
    lsGet: lsGet,
    lsSetUser: lsSetUser,
    lsUnSet: unset
  };

});
