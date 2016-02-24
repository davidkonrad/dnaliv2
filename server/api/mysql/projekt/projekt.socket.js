/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Projekt = require('./projekt.model');

exports.register = function(socket) {
  Projekt.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Projekt.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('projekt:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('projekt:remove', doc);
}
