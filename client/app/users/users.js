angular.module('Procodo.users', [])

.controller('UsersCtrl', function ($scope, $window, $location, User) {
  $scope.user = {};

  $scope.login = function () {
    User.login($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('io.procodo', token);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    User.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('io.procodo', token);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.uTypes = [
    { label: 'Developer/Engineer', value: 1 },
    { label: 'Non-Profit Organization', value: 2 }
  ];

  $scope.user.uType = $scope.uTypes[0];

});