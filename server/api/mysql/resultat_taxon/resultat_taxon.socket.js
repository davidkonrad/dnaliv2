/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Resultat_taxon = require('./resultat_taxon.model');

exports.register = function(socket) {
  Resultat_taxon.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Resultat_taxon.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('resultat_taxon:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('resultat_taxon:remove', doc);
}