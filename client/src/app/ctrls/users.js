angular.module('Procodo.users', [])

.controller('UsersCtrl', function ($scope, $window, $location, Users, LsKeys) {

  $scope.user = {};

  $scope.login = function () {
    Users.login($scope.user).then(function (token) {
      LsKeys.lsSet('io.procodo', token);
      $location.path('/');
    }).catch(function (error) { console.error(error); });
  };

  $scope.signup = function () {
    Users.signup($scope.user).then(function (token) {
      LsKeys.lsSet('io.procodo', token);
      $location.path('/');
    }).catch(function (error) { console.error(error); });
  };

  $scope.uTypes = [
    { label: 'Developer/Engineer', value: 1 },
    { label: 'Non-Profit Organization', value: 2 }
  ];

  $scope.user.uType = $scope.uTypes[0];

});
