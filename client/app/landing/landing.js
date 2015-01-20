angular.module('Procodo.landing', [])

.controller('LandingCtrl', function ($scope, Users) {
  $scope.data = {};
  $scope.data.welcome = '... loading ...';

  $scope.getUser = function () {
    Users.getUser().then(function(user) {
      $scope.data.user = user;
      // if ()
      $scope.data.welcome = "Clark";
    }).catch(function(err) {
      console.error(err);
    });

  };

  $scope.name = 'LandingCtrl';
});