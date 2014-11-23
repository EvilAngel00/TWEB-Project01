'use strict';

var _ = require('lodash');
var PageNumber = require('./pageNumber.model');

// Get list of pageNumbers
exports.index = function(req, res) {
  PageNumber.find(function (err, pageNumbers) {
    if(err) { return handleError(res, err); }
    return res.json(200, pageNumbers);
  });
};

// Get a list of page numbers, based on the classroomId
exports.show = function(req, res) {
  PageNumber.find({ classroomId: req.params.id}, function (err, pageNumber) {
    if(err) { return handleError(res, err); }
    if(!pageNumber) { return res.send(404); }
    return res.json(pageNumber);
  });
};

// Creates a new pageNumber in the DB.
exports.create = function(req, res) {
  PageNumber.create(req.body, function(err, pageNumber) {
    if(err) { return handleError(res, err); }
    return res.json(201, pageNumber);
  });
};

// Updates an existing pageNumber in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PageNumber.findById(req.params.id, function (err, pageNumber) {
    if (err) { return handleError(res, err); }
    if(!pageNumber) { return res.send(404); }
    var updated = _.merge(pageNumber, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, pageNumber);
    });
  });
};

// Deletes a pageNumber from the DB.
exports.destroy = function(req, res) {
  PageNumber.findById(req.params.id, function (err, pageNumber) {
    if(err) { return handleError(res, err); }
    if(!pageNumber) { return res.send(404); }
    pageNumber.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}