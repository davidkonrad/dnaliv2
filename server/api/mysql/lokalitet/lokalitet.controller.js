'use strict';
var models = require('../');

// Get list of lokalitets
exports.index = function(req, res) {
 // models.Lokalitet.findAll().then(function(lokalitet){
  models.Lokalitet.findAll({ include: [{  
		model: models.Lokalitet_spot,
		as: 'Spot'
	}]}).then(function(lokalitet){
		return res.json(200, lokalitet);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single lokalitet
exports.show = function(req, res) {
  models.Lokalitet.find({ where : { lokalitet_id: req.params.id }, include: [{ 
		model: models.Lokalitet_spot,
		as: 'Spot'
	}]}).then(function(lokalitet){
  	return res.json(200, lokalitet);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new lokalitet in the DB.
exports.create = function(req, res) {
  models.Lokalitet.create(req.body).then(function(lokalitet) {
    return res.json(201, lokalitet);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing lokalitet in the DB.
exports.update = function(req, res) {
  models.Lokalitet.find({ where : { lokalitet_id: req.params.id }} ).then(function(lokalitet){
    if (!lokalitet) { return res.send(404); }  
	  return lokalitet.updateAttributes(req.body);	  	
  }).then(function(lokalitet) {
  	return res.json(200, lokalitet);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Deletes a lokalitet from the DB.
exports.destroy = function(req, res) {
  models.Lokalitet.destroy({ where : { lokalitet_id: req.params.id }} ).then(function(lokalitet){
	}).then(function(){
  	return res.json(200);
	}).catch(function(err){
	  handleError(res, err);
  });
};

// Describe lokalitet
exports.describe = function(req, res) {
  models.Lokalitet.describe().then(function(lokalitet){
  	return res.json(200, lokalitet);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
