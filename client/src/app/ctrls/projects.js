angular.module('Procodo.projects', [])

.controller('ProjectsCtrl', function ($scope, $window, Projects, Users, Nps, $location, Project, Devs, LsKeys) {

  $scope.data = {};
  $scope.np = {};
  $scope.np.account = {};
  $scope.np.profile = {};
  $scope.project = {};
  $scope.newProj = $scope.newProj || {};
  $scope.user = {};

  $scope.getProjects = function () {
    Projects.getProjects().then(function (projects) {
      $scope.data.projects = projects;
    });
  };

  $scope.getProfile = function () {
    $scope.np.account = JSON.parse(LsKeys.lsGet('io.procodo.user'));
    $scope.np.profile.userId = LsKeys.lsGet('io.procodo.userId');
  };

  $scope.setProjectUser = function () {
    Users.getUser(function (user) {
      $scope.np.account = user;
      LsKeys.lsSet('io.procodo.user', JSON.stringify(user));
      $scope.getProfile();
      Nps.getProfile($scope.np.account._id, function (profile) {
        $scope.np.profile = profile;
        LsKeys.lsSet('io.procodo.profileId', profile._id);
        $scope.project.npId = $scope.np.account._id;
      });
    });
  };

  $scope.createProject = function () {
    Projects.createProject($scope.project, function (proj) {
      $location.path('/nps/dashboard');
    });
  };

  $scope.getProject = function () {
    var id = $location.path().split("/")[2];
    Project.getProject(id, function (project) {
      $scope.project = project;
      Nps.getProfile($scope.project.npId, function (profile) {
        $scope.np.profile = profile;
        Users.findUser($scope.project.npId).then(function (npName) {
          $scope.np.organizationName = npName;
        });
        $scope.getUser();
      });
    });
  };

  $scope.projectApply = function () {
    $scope.getUser(function () {
      if ($scope.user.uType == 1) {
        Devs.getProfile($scope.user._id, function (profile) {
          if (!!profile.currentProject) {
            alert('You can only have one active project at a time!');
          } else {
            Devs.applyForProject(profile._id, $scope.project._id);
          }
        });
      } else {
        alert('Only users with a Developer account can apply for projects!');
      }
    });
  };

  $scope.getUser = function (cb) {
    Users.getUser(function (user) {
      $scope.user = user;
      cb ? cb() : null;
    });
  };

  $scope.isDev = function () {
    return $scope.user.uType == 1 ? true : false;
  };

  $scope.isNp = function () {
    return !$scope.isDev();
  };

  $scope.name = 'ProjectsCtrl';
});
