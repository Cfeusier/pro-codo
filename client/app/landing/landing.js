angular.module('Procodo.landing', [])

.controller('LandingCtrl', function ($scope, $location, $window, Users, LsKeys) {
  $scope.welcome = '... Making sure everything is perfect for you -- hang tight ...';
  $scope.errorMessage = 'not found, yo';

  $scope.directUser = function () {
    Users.getUser(function(user) {
      var type = user.uType;
      LsKeys.lsSet('io.procodo.userId', user._id);
      LsKeys.lsSet('io.procodo.username', user.username);
      LsKeys.lsSet('io.procodo.uType', user.uType);
      LsKeys.lsSet('io.procodo.profileId', user.profileId);
      if (type == 1) {
        $location.path('/devs/dashboard');
      } else if (type == 2) {
        $location.path('/nps/dashboard');
      } else {
        $location.path('/login');
      }
    });
  };

  $scope.name = 'LandingCtrl';
});