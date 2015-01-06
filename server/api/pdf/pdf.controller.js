'use strict';

var _ = require('lodash');
var Pdf = require('./pdf.model');

// Get list of pdfs
exports.index = function(req, res) {
  Pdf.find(function (err, pdfs) {
    if(err) { return handleError(res, err); }
    return res.json(200, pdfs);
  });
};

// Get a single pdf
exports.show = function(req, res) {
  Pdf.findById(req.params.id, function (err, pdf) {
    if(err) { return handleError(res, err); }
    if(!pdf) { return res.send(404); }
    return res.json(pdf);
  });
};

// Creates a new pdf in the DB.
exports.create = function(req, res) {
  Pdf.create(req.body, function(err, pdf) {
    if(err) { return handleError(res, err); }
    return res.json(201, pdf);
  });
};

// Updates an existing pdf in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Pdf.findById(req.params.id, function (err, pdf) {
    if (err) { return handleError(res, err); }
    if(!pdf) { return res.send(404); }
    var updated = _.merge(pdf, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, pdf);
    });
  });
};

// Deletes a pdf from the DB.
exports.destroy = function(req, res) {
  Pdf.findById(req.params.id, function (err, pdf) {
    if(err) { return handleError(res, err); }
    if(!pdf) { return res.send(404); }
    pdf.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}