angular.module('Procodo.landing', [])

.controller('LandingCtrl', function ($scope, $location, Users) {
  $scope.welcome = '... loading ...';

  $scope.directUser = function () {
    Users.getUser(function(user) {
      var type = user.uType;
      if (type == 1) {
        $location.path('/devs/dashboard');
      } else if (type == 2) {
        $location.path('/nps/dashboard');
      } else {
        $location.path('/login');
      }
    }).catch(function(err) {
      console.error(err);
    });
  };

  $scope.name = 'LandingCtrl';
});