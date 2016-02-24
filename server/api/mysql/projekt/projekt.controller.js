'use strict';
var models = require('../');

// Get list of projects
exports.index = function(req, res) {
  models.Project.findAll().then(function(project){
  	return res.json(200, project);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single project
exports.show = function(req, res) {
  models.Project.find(req.params.id).then(function(project){
  	return res.json(200, project);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
  models.Project.create(req.body).then(function(project) {
    return res.json(201, project);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
  models.Project.find(req.params.id).then(function(project){
      if(!project) { return res.send(404); }  
	  return project.updateAttributes(req.body);	  	
  }).then(function(project){
  	return res.json(200, project);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
	
	models.Project.find(req.params.id).then(function(project){
		if(!project) { return res.send(404); }
		return project.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe project
exports.describe = function(req, res) {
  models.Project.describe().then(function(project){
	  console.log(project);
  	return res.json(200, project);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
