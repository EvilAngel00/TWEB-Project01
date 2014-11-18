/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var PageNumber = require('./pageNumber.model');

exports.register = function(socket) {
  PageNumber.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  PageNumber.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('pageNumber:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('pageNumber:remove', doc);
}