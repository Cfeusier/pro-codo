angular.module('Procodo.nav', [])
.controller('NavCtrl', function ($scope, User) {
  $scope.isValid = function(){
    return User.isUser();
  };
  $scope.logout = function(){
    User.logout();
  };
  $scope.name = 'NavCtrl';
});