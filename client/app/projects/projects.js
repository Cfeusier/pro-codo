angular.module('Procodo.projects', [])

.controller('ProjectsCtrl', function ($scope, $window, Projects, Users, Nps, $location, Project) {
  $scope.data = {};
  $scope.np = {};
  $scope.np.account = {};
  $scope.np.profile = {};
  $scope.project = {};
  $scope.newProj = $scope.newProj || {};

  $scope.getProjects = function () {
    Projects.getProjects().then(function (projects) {
      $scope.data.projects = projects;
    })
  };

  $scope.getProfile = function() {
    $scope.np.account = JSON.parse($window.localStorage.getItem('io.procodo.user'));
    $scope.np.profile.userId = $window.localStorage.getItem('io.procodo.userId');
  };

  $scope.setProjectUser = function () {
    Users.getUser(function (user) {
      $scope.np.account = user;
      $window.localStorage.setItem('io.procodo.user', JSON.stringify(user));
      $scope.getProfile();
      Nps.getProfile($scope.np.account._id, function (profile) {
        $scope.np.profile = profile;
        $window.localStorage.setItem('io.procodo.profileId', profile._id);
        $scope.project.npId = $scope.np.account._id;
      });
    });
  };

  $scope.createProject = function () {
    Projects.createProject($scope.project, function (proj) {
      $location.path('/nps/dashboard');
    });
  };

  $scope.getProject = function() {
    var id = $location.path().split("/")[2];
    Project.getProject(id, function (project) {
      $scope.project = project;
    });
  };

  $scope.name = 'ProjectsCtrl';
});
