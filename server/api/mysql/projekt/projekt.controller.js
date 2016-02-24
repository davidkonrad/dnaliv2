'use strict';
var models = require('../');

// Get list of projekts
exports.index = function(req, res) {
  models.Projekt.findAll().then(function(projekt){
  	return res.json(200, projekt);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single projekt
exports.show = function(req, res) {
  models.Projekt.find(req.params.id).then(function(projekt){
  	return res.json(200, projekt);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new projekt in the DB.
exports.create = function(req, res) {
  models.Projekt.create(req.body).then(function(projekt) {
    return res.json(201, projekt);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing projekt in the DB.
exports.update = function(req, res) {
  models.Projekt.find(req.params.id).then(function(projekt){
      if(!projekt) { return res.send(404); }  
	  return projekt.updateAttributes(req.body);	  	
  }).then(function(projekt){
  	return res.json(200, projekt);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a projekt from the DB.
exports.destroy = function(req, res) {
	
	models.Projekt.find(req.params.id).then(function(projekt){
		if(!projekt) { return res.send(404); }
		return projekt.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe projekt
exports.describe = function(req, res) {
  models.Projekt.describe().then(function(projekt){
	  console.log(projekt);
  	return res.json(200, projekt);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
