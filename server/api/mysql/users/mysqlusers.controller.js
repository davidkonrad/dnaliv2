'use strict';
var models = require('../');
var qp = require('../nestedQueryParser');

// Get list of mysqlUsers, use query if specified
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
  models.MysqlUser.findAll(query).then(function(mysqlUser){
  	return res.json(200, mysqlUser);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single mysqlUser
exports.show = function(req, res) {
  models.MysqlUser.find(req.params.id).then(function(mysqlUser){
  	return res.json(200, mysqlUser);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new mysqlUser in the DB.
exports.create = function(req, res) {
  models.MysqlUser.create(req.body).then(function(mysqlUser) {
    return res.json(201, mysqlUser);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing mysqlUser in the DB.
exports.update = function(req, res) {
  models.MysqlUser.find({ where : { mysqlUser_id: req.params.id }} ).then(function(mysqlUser){
    if (!mysqlUser) { 
			return res.send(404); 
		}  
	  return mysqlUser.updateAttributes(req.body);	  	
  }).then(function(mysqlUser){
  	return res.json(200, mysqlUser);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Deletes a mysqlUser from the DB.
exports.destroy = function(req, res) {
  models.MysqlUser.destroy({ where : { mysqlUser_id: req.params.id }} ).then(function(mysqlUser){
	}).then(function(){
  	return res.json(200);
	}).catch(function(err){
	  handleError(res, err);
  });
};

// Describe mysqlUser
exports.describe = function(req, res) {
  models.MysqlUser.describe().then(function(mysqlUser){
  	return res.json(200, mysqlUser);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
