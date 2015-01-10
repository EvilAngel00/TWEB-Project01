'use strict';

var _ = require('lodash');
var Attendedlecture = require('./attendedLecture.model');

// Get list of attendedLectures
exports.index = function(req, res) {
  Attendedlecture.find(function (err, attendedLectures) {
    if(err) { return handleError(res, err); }
    return res.json(200, attendedLectures);
  });
};

// Get a single attendedLecture
exports.show = function(req, res) {
  Attendedlecture.findById(req.params.id, function (err, attendedLecture) {
    if(err) { return handleError(res, err); }
    if(!attendedLecture) { return res.send(404); }
    return res.json(attendedLecture);
  });
};

// Creates a new attendedLecture in the DB.
exports.create = function(req, res) {
  Attendedlecture.create(req.body, function(err, attendedLecture) {
    if(err) { return handleError(res, err); }
    return res.json(201, attendedLecture);
  });
};

// Updates an existing attendedLecture in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Attendedlecture.findById(req.params.id, function (err, attendedLecture) {
    if (err) { return handleError(res, err); }
    if(!attendedLecture) { return res.send(404); }
    var updated = _.merge(attendedLecture, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, attendedLecture);
    });
  });
};

// Deletes a attendedLecture from the DB.
exports.destroy = function(req, res) {
  Attendedlecture.findById(req.params.id, function (err, attendedLecture) {
    if(err) { return handleError(res, err); }
    if(!attendedLecture) { return res.send(404); }
    attendedLecture.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}