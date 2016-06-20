/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var System_user = require('./system_user.model');

exports.register = function(socket) {
  System_user.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  System_user.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('system_user:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('system_user:remove', doc);
}
