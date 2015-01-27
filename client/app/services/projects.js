angular.module('Procodo.projectsServices', [])

.factory('Projects', function ($http, $location, $window) {

  var getProjects = function () {
    return $http({
      method: 'GET',
      url: '/api/projects'
    }).then(function (resp) { return resp.data; })
  };

  var createProject = function (project, cb) {
    return $http({
      method: 'POST',
      url: '/api/projects',
      data: project
    }).then(function (resp) { cb(resp.data); })
  };

  return {
    getProjects: getProjects,
    createProject: createProject
  };

});
