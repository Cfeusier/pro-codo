angular.module('Procodo.landing', [])

.controller('LandingCtrl', function ($scope, $location, $window, Users) {
  $scope.welcome = '... loading ...';

  $scope.directUser = function () {
    var type;
    var userId = $window.localStorage.getItem('io.procodo.userId');
    // var userId = null;
    if (userId) {
      // type = $window.localStorage.getItem('io.procodo.uType');
      // if (type == 1) {
      //   $location.path('/devs/dashboard');
      // } else if (type == 2) {
      //   $location.path('/nps/dashboard');
      // } else {
      //   $location.path('/login');
      // }
    } else {
      Users.getUser(function(user) {
        type = user.uType;
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
    }
  };

  $scope.name = 'LandingCtrl';
});