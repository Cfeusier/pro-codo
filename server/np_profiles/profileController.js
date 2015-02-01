var Profile = require('./profileModel.js');
var User = require('../users/userModel.js');
var Q = require('q');

module.exports = {

  create: function (req, res, next) {
    var organizationName = req.body.organizationName;
    var accountHolder = req.body.accountHolder;
    Profile.findOne({ _id: req.body._id }, function (err, profile) {
      if (profile) {
        var saveProfile = Q.nbind(profile.save, profile);
        profile.organizationName = organizationName;
        profile.accountHolder = accountHolder;
        saveProfile().then(function (newProfile) {
          res.send(newProfile[0]);
        }).fail(function (err) {
          console.error(err);
        });
      }
    })
  },

  getProfile: function (req, res, next, id) {
    var findProfile = Q.nbind(Profile.findOne, Profile);
    findProfile({ _id: id }).then(function (profile) {
      if (profile) {
        req.profile = profile[0];
        var findUser = Q.nbind(User.findOne, User);
        findUser({ _id: profile.userId }).then(function (user) {
          if (!user) {
            next(new Error('User does not exist'));
          } else {
            req.user = user;
            var saveUser = Q.bind(user.save, user);
            saveUser().then(function (updatedUser) {
              req.user = {
                user: {
                  email: updatedUser.email,
                  uType: updatedUser.uType,
                  _id: updatedUser._id,
                  profileId: updatedUser.profileId
                }
              };
              next();
            }).fail(function (err) {
              next(err);
            });
          }
        }).fail(function (err) {
          console.error(err);
        });
      }
    }).fail(function (err) {
      console.error(err);
    });
  },

  sendProfile: function (req, res, next) {
    res.json({ profile: req.profile, user: req.user });
  },

  newProfile: function (req, res, next, userId) {
    var findUser = Q.nbind(User.findOne, User);
    var findOrCreate = Q.nbind(Profile.findOrCreate, Profile);
    findUser({ _id: userId }).then(function (user) {
      if (!user) {
        next(new Error('User does not exist'));
      } else {
        findOrCreate({ userId: userId }).then(function (profile, created) {
          if (profile) {
            req.profile = profile[0];
            user.profileId = profile[0]._id;
            var saveUser = Q.bind(user.save, user);
            saveUser().then(function (updatedUser) {
              req.user = {
                user: {
                  email: updatedUser.email,
                  uType: updatedUser.uType,
                  _id: updatedUser._id,
                  profileId: updatedUser.profileId
                }
              };
              next();
            }).fail(function (err) {
              next(err);
            });
          }
        }).fail(function (err) {
          next(err);
        });
      }
    }).fail(function (error) {
      next(error);
    });
  },

  sendEmptyProfile: function (req, res, next) {
    res.json({ profile: req.profile, user: req.user });
  }

};