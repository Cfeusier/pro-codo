angular.module('Procodo.projectServices', [])

.factory('Project', function ($http, $location, $window) {

  var getProject = function (projId, cb) {
    return $http({
      method: 'GET',
      url: '/api/projects/' + projId,
    }).then(function (resp) {
      cb(resp.data);
    }).catch(function(err) { $location.path('/not-found'); });
  };

  return { getProject: getProject };

});
