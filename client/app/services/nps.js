angular.module('Procodo.npServices', [])

.factory('Nps', function ($http, $location, $window, LsKeys) {

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
      var npProfile = resp.data.profile[0];
      var npProfileId = npProfile._id;
      LsKeys.lsSet('io.procodo.np.profileId', npProfileId);
      LsKeys.lsSet('io.procodo.profileId', npProfileId);
      cb(npProfile);
      $location.path('/nps/new');
    });
  };

  var makeProfile = function (profile, cb) {
    return $http({
      method: 'POST',
      url: '/api/nps/profiles',
      data: profile
    }).then(function (resp) { cb(resp.data); });
  };

  return {
    getProfile: getProfile,
    newProfile: newProfile,
    makeProfile: makeProfile
  };

});
