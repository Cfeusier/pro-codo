angular.module('Procodo.nps', [])

.controller('NpsCtrl', function ($scope, $window, Users, Nps) {
  $scope.np = {};
  $scope.np.account = {};
  $scope.np.profile = $scope.np.profile || {};
  $scope.np.profile.projects = $scope.np.profile.projects || [];

  $scope.getUser = function() {
    Users.getUser(function (user) {
      $scope.np.account = user;
      $window.localStorage.setItem('io.procodo.user', JSON.stringify(user));
      $scope.getProfile();
      Nps.getProfile($scope.np.account._id, function (profile) {
        $scope.np.profile = profile;
        $window.localStorage.setItem('io.procodo.profileId', profile._id);
      });
    });
  };

  $scope.getProfile = function() {
    $scope.np.account = JSON.parse($window.localStorage.getItem('io.procodo.user'));
    $scope.np.profile.userId = $window.localStorage.getItem('io.procodo.userId');
  };

  $scope.hasProject = function () {
    return !!$scope.np.profile.projects.length > 0;
  };

  $scope.hasProfile = function () {
    return !!$scope.np.profile.accountHolder;
  };

  $scope.name = 'NpsCtrl';
})

.controller('NpsProfilesCtrl', function ($scope, $window, $location, Users, Nps) {
  $scope.np = {};
  $scope.np.account = {};
  $scope.np.profile = {};

  $scope.getProfile = function() {
    $scope.np.account = JSON.parse($window.localStorage.getItem('io.procodo.user'));
    $scope.np.profile._id = $window.localStorage.getItem('io.procodo.profileId');
    $scope.np.profile.userId = $window.localStorage.getItem('io.procodo.userId');
  };

  $scope.makeProfile = function () {
    Nps.makeProfile($scope.np.profile, function (profile) {
      $location.path('/nps/dashboard');
    });
  };

});

