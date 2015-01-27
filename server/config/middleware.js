var morgan = require('morgan');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // custom middleware

module.exports = function (app, express) {
  var userRouter = express.Router();
  var devProfileRouter = express.Router();
  var npProfileRouter = express.Router();
  var projectsRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/users', userRouter);
  app.use('/api/devs/profiles', devProfileRouter);
  app.use('/api/nps/profiles', npProfileRouter);
  app.use('/api/projects', projectsRouter);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject routers into respective route files
  require('../users/userRoutes.js')(userRouter);
  require('../dev_profiles/profileRoutes.js')(devProfileRouter);
  require('../np_profiles/profileRoutes.js')(npProfileRouter);
  require('../projects/projectRoutes.js')(projectsRouter);

  // redirect back to client-app router
  app.get('/*', function(req, res) { res.redirect('/'); });
};