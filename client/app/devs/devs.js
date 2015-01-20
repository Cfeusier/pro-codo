angular.module('Procodo.devs', [])

.controller('DevsCtrl', function ($scope, Users) {
  $scope.dev = {};

  $scope.getUser = function() {
    Users.getUser(function (user) {
      $scope.dev.account = user;
    });
  };

  $scope.name = 'DevsCtrl';
});