angular.module('Procodo.nav', [])

.controller('NavCtrl', function ($scope, Users) {

  $scope.isValid = function () { return Users.isUser(); };
  $scope.logout = function () { Users.logout(); };
  $scope.isDev = function () { return Users.getUType() == 1 };
  $scope.isNp = function () { return Users.getUType() == 2 };

  $scope.name = 'NavCtrl';
});