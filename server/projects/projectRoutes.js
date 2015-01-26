var projectsController = require('./projectController.js');

module.exports = function (app) {
  // app === projectsRouter from middleware.js
  app.param('id', projectsController.getProject);

  app.route('/')
    .get(projectsController.index)
    .post(projectsController.create);

  app.get('/:id', projectsController.sendProject);
};
