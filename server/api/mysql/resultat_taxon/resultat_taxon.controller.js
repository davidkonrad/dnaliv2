'use strict';
var models = require('../');


// Get list of resultat_taxons
exports.index = function(req, res) {

  models.Resultat_taxon.findAll().then(function(resultat_taxon){
  	return res.json(200, resultat_taxon);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single resultat_taxon
exports.show = function(req, res) {
  models.Resultat_taxon.find(req.params.id).then(function(resultat_taxon){
  	return res.json(200, resultat_taxon);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new resultat_taxon in the DB.
exports.create = function(req, res) {
  models.Resultat_taxon.create(req.body).then(function(resultat_taxon) {
    return res.json(201, resultat_taxon);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing resultat_taxon in the DB.
exports.update = function(req, res) {
  models.Resultat_taxon.find(req.params.id).then(function(resultat_taxon){
      if(!resultat_taxon) { return res.send(404); }  
	  return resultat_taxon.updateAttributes(req.body);	  	
  }).then(function(resultat_taxon){
  	return res.json(200, resultat_taxon);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a resultat_taxon from the DB.
exports.destroy = function(req, res) {
	
	models.Resultat_taxon.find(req.params.id).then(function(resultat_taxon){
		if(!resultat_taxon) { return res.send(404); }
		return resultat_taxon.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe resultat_taxon
exports.describe = function(req, res) {
  models.Resultat_taxon.describe().then(function(resultat_taxon){
	  console.log(resultat_taxon);
  	return res.json(200, resultat_taxon);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
