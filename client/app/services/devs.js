angular.module('Procodo.devServices', [])

.factory('Devs', function ($http, $location, $window) {
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
      $window.localStorage.setItem('io.procodo.dev.profileId', resp.data.profile[0]._id);
      $window.localStorage.setItem('io.procodo.profileId', resp.data.profile[0]._id);
      cb(resp.data.profile[0]);
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
