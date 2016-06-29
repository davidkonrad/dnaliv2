'use strict';
var models = require('../');
var qp = require('../nestedQueryParser');


// Get list of proeve_extrasr
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
  models.Proeve_extras.findAll(query).then(function(proeve_extras){
  	return res.json(200, proeve_extras);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single proeve_extras
exports.show = function(req, res) {
  models.Proeve_extras.find(req.params.id).then(function(proeve_extras){
  	return res.json(200, proeve_extras);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new proeve_extras in the DB.
exports.create = function(req, res) {
  models.Proeve_extras.create(req.body).then(function(proeve_extras) {
    return res.json(201, proeve_extras);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing proeve_extras in the DB.
exports.update = function(req, res) {
  models.Proeve_extras.find({ where : { extras_id: req.params.id }} ).then(function(proeve_extras){
    if(!proeve_extras) { return res.send(404); }  
	  return proeve_extras.updateAttributes(req.body);	  	
  }).then(function(proeve_extras){
  	return res.json(200, proeve_extras);
  }).catch(function(err){
	  handleError(res, err);
  });
 
};

// Deletes a proeve_extras from the DB.
exports.destroy = function(req, res) {
  models.Proeve_extras.destroy({ where : { proeve_extras_id: req.params.id }} ).then(function(proeve_extras) {
	}).then(function(){
  	return res.json(200);
	}).catch(function(err){
	  handleError(res, err);
  });
};

// Describe proeve_extras
exports.describe = function(req, res) {
  models.Proeve_extras.describe().then(function(proeve_extras) {
  	return res.json(200, proeve_extras);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

