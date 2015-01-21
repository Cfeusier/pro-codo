var profileController = require('./profileController.js');

module.exports = function (app) {
  // app === profileRouter from middleware.js
  app.param('npId', profileController.newProfile);
  app.param('id', profileController.getProfile);

  app.route('/')
    .post(profileController.create);

  app.get('/new/:npId', profileController.sendEmptyProfile);
  app.get('/np/:npId', profileController.sendProfile);
  app.get('/:id', profileController.sendProfile);

};