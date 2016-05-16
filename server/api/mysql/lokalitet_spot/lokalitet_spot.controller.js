'use strict';
var models = require('../');
var qp = require('../nestedQueryParser');

// Get list of lokalitet_spots, use query if specified
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
  models.Lokalitet_spot.findAll(query).then(function(lokalitet_spot){
  	return res.json(200, lokalitet_spot);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single lokalitet_spot
exports.show = function(req, res) {
  models.Lokalitet_spot.find(req.params.id).then(function(lokalitet_spot){
  	return res.json(200, lokalitet_spot);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new lokalitet_spot in the DB.
exports.create = function(req, res) {
  models.Lokalitet_spot.create(req.body).then(function(lokalitet_spot) {
    return res.json(201, lokalitet_spot);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing lokalitet_spot in the DB.
exports.update = function(req, res) {
  models.Lokalitet_spot.find({ where : { lokalitet_spot_id: req.params.id }} ).then(function(lokalitet_spot){
    if (!lokalitet_spot) { 
			return res.send(404); 
		}  
	  return lokalitet_spot.updateAttributes(req.body);	  	
  }).then(function(lokalitet_spot){
  	return res.json(200, lokalitet_spot);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Deletes a lokalitet_spot from the DB.
exports.destroy = function(req, res) {
  models.Lokalitet_spot.destroy({ where : { lokalitet_spot_id: req.params.id }} ).then(function(lokalitet_spot){
	}).then(function(){
  	return res.json(200);
	}).catch(function(err){
	  handleError(res, err);
  });
};

// Describe lokalitet_spot
exports.describe = function(req, res) {
  models.Lokalitet_spot.describe().then(function(lokalitet_spot){
  	return res.json(200, lokalitet_spot);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
