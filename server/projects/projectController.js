var Project = require('./projectModel.js');
var Profile = require('../np_profiles/profileModel.js');
var User = require('../users/userModel.js');
var Q = require('q');

module.exports = {

  index: function (req, res, next) {
    var findAll = Q.nbind(Project.find, Project);
    findAll({}).then(function (projects) {
      res.json(projects)
    }).fail(function (err) {
      next(err);
    })
  },

  create: function (req, res, next) {
    var projectTitle = req.body.title;
    var requirements = req.body.requirements;
    var weeks = req.body.weeks;
    var hrsWeek = req.body.hrsWeek;
    var npId = req.body.npId;
    var findOne = Q.nbind(Project.findOne, Project);
    findOne({ _id: npId }).then(function (err, project) {
      if (!project) {
        var createProject = Q.nbind(Project.create, Project);
        var newProj = {
          title: projectTitle,
          requirements: requirements,
          weeks: weeks,
          hrsWeek: hrsWeek,
          npId: npId
        };
        return createProject(newProj);
      }
    }).then(function (newProject) {
      var findUser = Q.nbind(Profile.findOne, Profile);
      findUser({ userId: npId }).then(function (profile) {
        profile.projects.push(newProject);
        profile.save(function (err) {
          err ? res.status(500).send() : res.send(newProject);
        });
      });
    }).fail(function (err) { console.error(err); });
  },

  getProject: function(req, res, next, projectId) {
    var findProj = Q.nbind(Project.findOne, Project);
    findProj({ _id: projectId }).then(function (proj) {
      req.project = proj;
      next();
    });
  },

  sendProject: function (req, res, next) {
    var proj = req.project;
    proj ? res.send(proj) : res.status(404).send();
  }

};
