angular.module('Procodo.devs', [])

.controller('DevsCtrl', function ($scope, $window, Users, Devs, LsKeys) {

  $scope.dev = {};
  $scope.dev.account = {};
  $scope.dev.profile = $scope.dev.profile || {};

  $scope.getUser = function() {
    Users.getUser(function (user) {
      $scope.dev.account = user;
      LsKeys.lsSet('io.procodo.user', JSON.stringify(user));
      $scope.getProfile();
      Devs.getProfile($scope.dev.account._id, function (profile) {
        $scope.dev.profile = profile;
        LsKeys.lsSet('io.procodo.profileId', profile._id);
      });
    });
  };

  $scope.getProfile = function() {
    $scope.dev.account = JSON.parse(LsKeys.lsGet('io.procodo.user'));
    $scope.dev.profile.userId = LsKeys.lsGet('io.procodo.userId');
  };

  $scope.hasProfile = function () {
    return !!$scope.dev.profile.expertise;
  };

  $scope.hasProject = function () {
    return !!$scope.dev.profile.currentProject;
  };

  $scope.name = 'DevsCtrl';
})

.controller('ProfilesCtrl', function ($scope, $window, $location, Users, Devs, LsKeys) {

  $scope.dev = {};
  $scope.dev.account = {};
  $scope.dev.profile = {};

  $scope.getProfile = function() {
    $scope.dev.account = JSON.parse(LsKeys.lsGet('io.procodo.user'));
    $scope.dev.profile._id = LsKeys.lsGet('io.procodo.profileId');
    $scope.dev.profile.userId = LsKeys.lsGet('io.procodo.userId');
  };

  $scope.createProfile = function () {
    Devs.createProfile($scope.dev.profile, function (profile) {
      $location.path('/devs/dashboard');
    });
  };

});

