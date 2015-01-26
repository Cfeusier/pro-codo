angular.module('Procodo.landing', [])

.controller('LandingCtrl', function ($scope, $location, $window, Users) {
  $scope.welcome = '... loading ...';

  $scope.directUser = function () {
    Users.getUser(function(user) {
      var type = user.uType;
      $window.localStorage.setItem('io.procodo.userId', user._id);
      $window.localStorage.setItem('io.procodo.username', user.username);
      $window.localStorage.setItem('io.procodo.uType', user.uType);
      $window.localStorage.setItem('io.procodo.profileId', user.profileId);
      if (type == 1) {
        $location.path('/devs/dashboard');
      } else if (type == 2) {
        $location.path('/nps/dashboard');
      } else {
        $location.path('/login');
      }
    });
  };

  $scope.name = 'LandingCtrl';
});