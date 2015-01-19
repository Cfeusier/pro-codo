var landingController = require('./landingController.js');

module.exports = function (app) {
  app.route('/')
    .get(landingController.serveIndex);
};