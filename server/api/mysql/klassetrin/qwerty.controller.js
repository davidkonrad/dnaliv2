'use strict';
var models = require('../');


// Get list of qwertys
exports.index = function(req, res) {

  models.Qwerty.findAll().then(function(qwerty){
  	return res.json(200, qwerty);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single qwerty
exports.show = function(req, res) {
  models.Qwerty.find(req.params.id).then(function(qwerty){
  	return res.json(200, qwerty);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new qwerty in the DB.
exports.create = function(req, res) {
  models.Qwerty.create(req.body).then(function(qwerty) {
    return res.json(201, qwerty);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing qwerty in the DB.
exports.update = function(req, res) {
  models.Qwerty.find(req.params.id).then(function(qwerty){
      if(!qwerty) { return res.send(404); }  
	  return qwerty.updateAttributes(req.body);	  	
  }).then(function(qwerty){
  	return res.json(200, qwerty);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a qwerty from the DB.
exports.destroy = function(req, res) {
	
	models.Qwerty.find(req.params.id).then(function(qwerty){
		if(!qwerty) { return res.send(404); }
		return qwerty.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe qwerty
exports.describe = function(req, res) {
  models.Qwerty.describe().then(function(qwerty){
	  console.log(qwerty);
  	return res.json(200, qwerty);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
