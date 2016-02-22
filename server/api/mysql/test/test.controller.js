'use strict';
var models = require('../');


// Get list of tests
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
  models.Test.findAll().then(function(test){
  	return res.json(200, test);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single test
exports.show = function(req, res) {
  models.Test.find(req.params.id).then(function(test){
  	return res.json(200, test);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new test in the DB.
exports.create = function(req, res) {
  models.Test.create(req.body).then(function(test) {
    return res.json(201, test);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing test in the DB.
exports.update = function(req, res) {
  models.Test.find(req.params.id).then(function(test){
      if(!test) { return res.send(404); }  
	  return test.updateAttributes(req.body);	  	
  }).then(function(test){
  	return res.json(200, test);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a test from the DB.
exports.destroy = function(req, res) {
	
	models.Test.find(req.params.id).then(function(test){
		if(!test) { return res.send(404); }
		return test.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe test
exports.describe = function(req, res) {
  models.Test.describe().then(function(test){
	  console.log(test);
  	return res.json(200, test);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
