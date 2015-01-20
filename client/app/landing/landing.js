angular.module('Procodo.landing', [])

.controller('LandingCtrl', function ($scope, Users) {
  $scope.data = {};
  $scope.data.welcome = '... loading ...';

  $scope.getUser = function () {
    Users.getUser().then(function(data) {
      $scope.data.user = data.user;
      console.log($scope.data.user)
      if ($scope.data.user.uType == 1) {
        $scope.data.welcome = 'Welcome Developer!';
      } else if ($scope.data.user.uType === 2) {
        $scope.data.welcome = 'Welcome Non-Profit!';
      } else {
        $scope.data.welcome = "Welcome!";
      }
    }).catch(function(err) {
      console.error(err);
    });

  };

  $scope.name = 'LandingCtrl';
});