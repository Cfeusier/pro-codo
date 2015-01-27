var profileController = require('./profileController.js');

module.exports = function (app) {
  // app === profileRouter from middleware.js
  app.param('devId', profileController.newProfile);
  app.param('id', profileController.getProfile);

  app.route('/')
    .post(profileController.create);

  app.get('/new/:devId', profileController.sendEmptyProfile);
  app.get('/dev/:devId', profileController.sendProfile);
  app.get('/:id', profileController.sendProfile);
  app.post('/apply', profileController.applyForProject);

};