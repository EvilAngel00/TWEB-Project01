/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Pdf = require('./pdf.model');

exports.register = function(socket) {
  Pdf.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Pdf.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('pdf:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('pdf:remove', doc);
}