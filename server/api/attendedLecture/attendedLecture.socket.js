/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Attendedlecture = require('./attendedLecture.model');

exports.register = function(socket) {
  Attendedlecture.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Attendedlecture.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('attendedLecture:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('attendedLecture:remove', doc);
}