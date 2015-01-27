angular.module('Procodo.nav', [])

.controller('NavCtrl', function ($scope, Users) {

  $scope.isValid = function () { return Users.isUser(); };
  $scope.logout = function(){ Users.logout(); };

  $scope.name = 'NavCtrl';
});