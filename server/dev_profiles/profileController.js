var Profile = require('./profileModel.js');
var User = require('../users/userModel.js');
var Project = require('../projects/projectModel.js');
var Q = require('q');

module.exports = {

  create: function (req, res, next) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var expertise = req.body.expertise;
    Profile.findOne({ _id: req.body._id }, function (err, profile) {
      if (profile) {
        var saveProfile = Q.nbind(profile.save, profile);
        profile.firstName = firstName;
        profile.lastName = lastName;
        profile.expertise = expertise;
        saveProfile().then(function (newProfile) {
          res.send(newProfile[0]);
        }).fail(function (err) {
          console.error(err);
        });
      }
    })
  },

  sendProfile: function (req, res, next) {
    res.json({ profile: req.profile, user: req.user });
  },

  applyForProject: function (req, res, next) {
    var findProfile = Q.nbind(Profile.findOne, Profile);
    var findProject = Q.nbind(Project.findOne, Project);
    var devId = req.body.devProfileId;
    var projectId = req.body.projectId;
    var created;

    findProfile({ _id: devId }).then(function (devProfile) {
      module.exports.handleDevApplication(created, devProfile, projectId);
      findProject({ _id: projectId }).then(function (project) {
        module.exports.handleProjectApplication(created, res, project, devId);
      }).fail(function (err) { res.status(500).send(err); });
    }).fail(function (err) { res.status(500).send(err); });
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
            module.exports.updateUserProfile(req, user, next);
          }
        }).fail(function (err) { console.error(err); });
      }
    }).fail(function (err) { console.error(err); });
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
            module.exports.updateUserProfile(req, user, next);
          }
        }).fail(function (err) { next(err); });
      }
    }).fail(function (err) { next(err); });
  },

  cleanUser: function (updatedUser) {
    return {
      user: {
        username: updatedUser.username,
        uType: updatedUser.uType,
        _id: updatedUser._id,
        profileId: updatedUser.profileId
      }
    };
  },

  handleDevApplication: function (created, devProfile, projectId) {
    if (devProfile.applied.indexOf(projectId) === -1) {
      devProfile.applied.push(projectId);
      devProfile.save();
    } else {
      created = true;
    }
  },

  handleProjectApplication: function (created, res, project, devId) {
    if (created) {
      res.status(200).send(project);
    } else {
      project.applicants.push(devId);
      project.save(function(err) {
        err ? res.status(500).send(err) : res.status(200).send(project);
      });
    }
  },

  updateUserProfile: function (req, user, next) {
    var saveUser = Q.bind(user.save, user);
    saveUser().then(function (updatedUser) {
      req.user = module.exports.cleanUser(updatedUser);
      next();
    }).fail(function (err) { next(err); });
  }

};
