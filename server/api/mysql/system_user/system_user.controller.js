'use strict';
var models = require('../');
var qp = require('../nestedQueryParser');

// Get list of system_users, use query if specified
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
  models.System_user.findAll(query).then(function(system_user){
  	return res.json(200, system_user);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single system_user
exports.show = function(req, res) {
  models.System_user.find(req.params.id).then(function(system_user){
  	return res.json(200, system_user);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new system_user in the DB.
exports.create = function(req, res) {
  models.System_user.create(req.body).then(function(system_user) {
    return res.json(201, system_user);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing system_user in the DB.
exports.update = function(req, res) {
  models.System_user.find({ where : { user_id: req.params.id }} ).then(function(system_user){
    if (!system_user) { 
			return res.send(404); 
		}  
	  return system_user.updateAttributes(req.body);	  	
  }).then(function(system_user){
  	return res.json(200, system_user);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Deletes a system_user from the DB.
exports.destroy = function(req, res) {
  models.System_user.destroy({ where : { system_user_id: req.params.id }} ).then(function(system_user){
	}).then(function(){
  	return res.json(200);
	}).catch(function(err){
	  handleError(res, err);
  });
};

// Describe system_user
exports.describe = function(req, res) {
  models.System_user.describe().then(function(system_user){
  	return res.json(200, system_user);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
