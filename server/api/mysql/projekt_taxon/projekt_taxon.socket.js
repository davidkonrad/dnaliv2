/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Projekt_taxon = require('./projekt_taxon.model');

exports.register = function(socket) {
  Projekt_taxon.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Projekt_taxon.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('projekt_taxon:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('projekt_taxon:remove', doc);
}
