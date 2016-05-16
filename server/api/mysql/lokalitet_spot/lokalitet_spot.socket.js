/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Resultat_taxon = require('./lokalitet_spot.model');

exports.register = function(socket) {
  Lokalitet_spot.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lokalitet_spot.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lokalitet_spot:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lokalitet_spot:remove', doc);
}
