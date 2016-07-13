/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Proeve = require('./proeve_extras.model');

exports.register = function(socket) {
  Proeve.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Proeve.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('proeve_extras:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('proeve_extras:remove', doc);
}