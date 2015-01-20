var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

module.exports = {
  login: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var findUser = Q.nbind(User.findOne, User);

    findUser({ username: username }).then(function (user) {
      if (!user) {
        next(new Error('User does not exist'));
      } else {
        return user.comparePasswords(password).then(function(foundUser) {
          if (foundUser) {
            var token = jwt.encode(user, 'monkeydonkeyeater');
            res.json({ token: token });
          } else {
            return next(new Error('No User'));
          }
        });
      }
    }).fail(function (error) {
      next(error);
    });
  },

  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var uType = req.body.uType.value;
    var create;
    var newUser;
    var findOne = Q.nbind(User.findOne, User);

    findOne({ username: username }).then(function(user) {
      if (user) {
        next(new Error('User already exists!'));
      } else {
        create = Q.nbind(User.create, User);
        newUser = {
          username: username,
          password: password,
          uType: uType
        };
        return create(newUser);
      }
    }).then(function (user) {
      var token = jwt.encode(user, 'monkeydonkeyeater');
      res.json({ token: token });
    }).fail(function (error) {
      next(error);
    });
  },

  checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'monkeydonkeyeater');
      var findUser = Q.nbind(User.findOne, User);
      findUser({ username: user.username }).then(function (foundUser) {
        foundUser ? res.send(200) : res.send(401);
      }).fail(function (error) {
        next(error);
      });
    }
  },

  getUser: function (token, cb) {
    if (token) {
      var user = jwt.decode(token, 'monkeydonkeyeater');
      var findUser = Q.nbind(User.findOne, User);
      findUser({ username: user.username }).then(function(foundUser) {
        var newUser = {
          user: {
            username: foundUser.username,
            uType: foundUser.uType,
            _id: foundUser._id
          }
        };
        foundUser ? cb(newUser) : cb(false);
      }).fail(function (error) {
        next(error);
      });
    }
  },

  dashboard: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user = module.exports.getUser(token, function(foundUser) {
      foundUser ? res.send(foundUser) : next(new Error('No user found!'));
    });
  }
};
