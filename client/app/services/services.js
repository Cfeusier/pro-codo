angular.module('Procodo.services', [])

.factory('Users', function ($http, $location, $window) {
  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isUser = function () {
    return !!$window.localStorage.getItem('io.procodo');
  };

  var logout = function () {
    $window.localStorage.removeItem('io.procodo');
    $window.localStorage.removeItem('io.procodo.userId');
    $window.localStorage.removeItem('io.procodo.username');
    $window.localStorage.removeItem('io.procodo.uType');
    $window.localStorage.removeItem('io.procodo.profileId');
    $window.localStorage.removeItem('io.procodo.user');
    $window.localStorage.removeItem('io.procodo.dev.profileId');
    $window.localStorage.removeItem('io.procodo.profileSet');
    $location.path('/');
  };

  var getUser = function (cb) {
    var userId = $window.localStorage.getItem('io.procodo.userId');
    if (userId) {
      var user = {
        username: $window.localStorage.getItem('io.procodo.username'),
        _id: $window.localStorage.getItem('io.procodo.userId'),
        uType: $window.localStorage.getItem('io.procodo.uType')
      };
      cb(user);
    } else {
      return $http({
        method: 'GET',
        url: '/api/users/'
      }).then(function(resp) {
        cb(resp.data.user);
      });
    }
  };

  var findUser = function (id) {
    return $http({
      method: 'GET',
      url: '/api/users/' + id
    }).then(function(resp) {
      return resp.data;
    });
  };

  return {
    login: login,
    signup: signup,
    isUser: isUser,
    logout: logout,
    getUser: getUser,
    findUser: findUser
  };
})

.factory('Devs', function ($http, $location, $window) {
  var getProfile = function (userId, cb) {
    return $http({
      method: 'GET',
      url: '/api/devs/profiles/dev/' + userId,
    }).then(function (resp) {
      cb(resp.data.profile);
    });
  };

  var newProfile = function (devId, cb) {
    return $http({
      method: 'GET',
      url: '/api/devs/profiles/new/' + devId
    }).then(function(resp) {
      $window.localStorage.setItem('io.procodo.dev.profileId', resp.data.profile[0]._id);
      $window.localStorage.setItem('io.procodo.profileId', resp.data.profile[0]._id);
      cb(resp.data.profile[0]);
      $location.path('/devs/new');
    })
  };

  var createProfile = function (profile, cb) {
    return $http({
      method: 'POST',
      url: '/api/devs/profiles/',
      data: profile
    }).then(function (resp) {
      cb(resp.data);
    })
  };

  return {
    getProfile: getProfile,
    newProfile: newProfile,
    createProfile: createProfile
  };
})

.factory('Nps', function ($http, $location, $window) {
  var getProfile = function (userId, cb) {
    return $http({
      method: 'GET',
      url: '/api/nps/profiles/np/' + userId,
    }).then(function (resp) {
      cb(resp.data.profile);
    });
  };

  var newProfile = function (npId, cb) {
    return $http({
      method: 'GET',
      url: '/api/nps/profiles/new/' + npId
    }).then(function(resp) {
      $window.localStorage.setItem('io.procodo.np.profileId', resp.data.profile[0]._id);
      $window.localStorage.setItem('io.procodo.profileId', resp.data.profile[0]._id);
      cb(resp.data.profile[0]);
      $location.path('/nps/new');
    })
  };

  var makeProfile = function (profile, cb) {
    return $http({
      method: 'POST',
      url: '/api/nps/profiles/',
      data: profile
    }).then(function (resp) {
      cb(resp.data);
    })
  };

  return {
    getProfile: getProfile,
    newProfile: newProfile,
    makeProfile: makeProfile
  };
})

.factory('Projects', function ($http, $location, $window) {
  var getProjects = function () {
    return $http({
      method: 'GET',
      url: '/api/projects/'
    }).then(function (resp) {
      return resp.data;
    })
  };

  var createProject = function (project, cb) {
    return $http({
      method: 'POST',
      url: '/api/projects/',
      data: project
    }).then(function (resp) {
      cb(resp.data);
    })
  };

  return {
    getProjects: getProjects,
    createProject: createProject
  };
})

.factory('Project', function ($http, $location, $window) {
  var getProject = function (projId, cb) {
    return $http({
      method: 'GET',
      url: '/api/projects/' + projId,
    }).then(function (resp) {
      cb(resp.data);
    }).catch(function(err) {
      console.log(err);
      $location.path('/not-found');
    });
  };

  return { getProject: getProject };
});


