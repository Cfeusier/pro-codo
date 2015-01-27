angular.module('Procodo.npServices', [])

.factory('Nps', function ($http, $location, $window) {
  var getProfile = function (userId, cb) {
    return $http({
      method: 'GET',
      url: '/api/nps/profiles/np/' + userId,
    }).then(function (resp) { cb(resp.data.profile); });
  };

  var newProfile = function (npId, cb) {
    return $http({
      method: 'GET',
      url: '/api/nps/profiles/new/' + npId
    }).then(function(resp) {
      $window.localStorage.setItem('io.procodo.np.profileId', resp.data.profile[0]._id);
      $window.localStorage.setItem('io.procodo.profileId', resp.data.profile[0]._id);
      cb(resp.data.profile[0]);
      $location.path('/nps/new');
    })
  };

  var makeProfile = function (profile, cb) {
    return $http({
      method: 'POST',
      url: '/api/nps/profiles',
      data: profile
    }).then(function (resp) { cb(resp.data); })
  };

  return {
    getProfile: getProfile,
    newProfile: newProfile,
    makeProfile: makeProfile
  };

});
