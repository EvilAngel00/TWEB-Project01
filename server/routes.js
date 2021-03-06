/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/attendedLectures', require('./api/attendedLecture'));
  app.use('/api/pdfs', require('./api/pdf'));
  app.use('/api/feedbacks', require('./api/feedback'));
  app.use('/api/pageNumbers', require('./api/pageNumber'));
  app.use('/api/classrooms', require('./api/classroom'));
  app.use('/api/messages', require('./api/message'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
