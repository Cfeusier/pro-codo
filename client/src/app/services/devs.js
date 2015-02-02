angular.module('Procodo.devServices', [])

.factory('Devs', function ($http, $location, $window, LsKeys) {

  var getProfile = function (userId, cb) {
    return $http({
      method: 'GET',
      url: '/api/devs/profiles/dev/' + userId,
    }).then(function (resp) { cb(resp.data.profile); });
  };

  var newProfile = function (devId, cb) {
    return $http({
      method: 'GET',
      url: '/api/devs/profiles/new/' + devId
    }).then(function(resp) {
      var devProfile = resp.data.profile[0];
      var devProfileId = devProfile._id;
      LsKeys.lsSet('io.procodo.dev.profileId', devProfileId);
      LsKeys.lsSet('io.procodo.profileId', devProfileId);
      cb(devProfile);
      $location.path('/devs/new');
    })
  };

  var createProfile = function (profile, cb) {
    return $http({
      method: 'POST',
      url: '/api/devs/profiles',
      data: profile
    }).then(function (resp) { cb(resp.data); })
  };

  var applyForProject = function (devProfileId, projectId) {
    var data = { devProfileId: devProfileId, projectId: projectId };
    return $http({
      method: 'POST',
      url: '/api/devs/profiles/apply',
      data: data
    }).then(function (resp) {
      console.log(resp); // TODO: DO SOMETHING WITH RESPONSE FROM APPLICATION
    });
  };

  return {
    getProfile: getProfile,
    newProfile: newProfile,
    createProfile: createProfile,
    applyForProject: applyForProject
  };

});
