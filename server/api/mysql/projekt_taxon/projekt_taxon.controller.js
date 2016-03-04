'use strict';
var models = require('../');

// Get list of projekt_taxons
exports.index = function(req, res) {
  models.Projekt_taxon.findAll().then(function(projekt_taxon){
  	return res.json(200, projekt_taxon);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single projekt_taxon
exports.show = function(req, res) {
  models.Projekt_taxon.find(req.params.id).then(function(projekt_taxon){
  	return res.json(200, projekt_taxon);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new projekt_taxon in the DB.
exports.create = function(req, res) {
  models.Projekt_taxon.create(req.body).then(function(projekt_taxon) {
    return res.json(201, projekt_taxon);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing projekt_taxon in the DB.
exports.update = function(req, res) {
  models.Projekt_taxon.find(req.params.id).then(function(projekt_taxon){
      if(!projekt_taxon) { return res.send(404); }  
	  return projekt_taxon.updateAttributes(req.body);	  	
  }).then(function(projekt_taxon){
  	return res.json(200, projekt_taxon);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a projekt_taxon from the DB.
exports.destroy = function(req, res) {
	
	models.Projekt_taxon.find(req.params.id).then(function(projekt_taxon){
		if(!projekt_taxon) { return res.send(404); }
		return projekt_taxon.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe projekt_taxon
exports.describe = function(req, res) {
  models.Projekt_taxon.describe().then(function(projekt_taxon){
  	return res.json(200, projekt_taxon);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
