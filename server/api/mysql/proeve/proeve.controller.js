'use strict';
var models = require('../');

// Get list of proever
exports.index = function(req, res) {
  models.Proeve.findAll({ 
		include: [{ 
			model: models.Lokalitet,
			as: 'Lokalitet'
		}, {
			model: models.Resultat,
			as: 'Resultat'
		}, {
			model: models.Kommentar,
			as: 'Kommentar'
		}
	]
	}).then(function(proeve){
  	return res.json(200, proeve);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

//
exports.withExtras = function(req, res) {
/*
	var sql = ''
		+'select '
		+'data.data_id, '
		+'data.eksperiment_id, '
		+'data.madding, '
		+'data.madding_stjaalet, '
		+'data.myrer_indsamlet, '
		+'data.myrer_frysning, '
		+'date_format(data.proeve_modtaget, "%d/%m/%Y") as proeve_modtaget, '
		+'data.proeve_analyseret, '

		+'eksperiment.myrejagt_id, '
		+'eksperiment.user_id, '
		+'date_format(eksperiment.dato, "%d/%m/%Y") as "eksperiment_dato", '

		+'resultat.resultat_id, '
		+'resultat.antal '

		+'from data '
		+'left join eksperiment on data.eksperiment_id = eksperiment.eksperiment_id '
		+'left join resultat on data.data_id = resultat.data_id '
		+'group by data.data_id ';
	
	models.sequelize.query(sql,	{ bind: ['active'], type: models.sequelize.QueryTypes.SELECT }).then(function(data) {
		return res.json(200, data);
	}).catch(function(err){
	  handleError(res, err);
  });
*/
};


// Get a single proeve
exports.show = function(req, res) {
  //models.Proeve.find(req.params.id).then(function(proeve){
	//models.Proeve.findById(req.params.id).then(function(proeve){
	models.Proeve.findById(req.params.id, {
		include: { 
			model: models.Lokalitet,
			as: 'Lokalitet'
		}
	}).then(function(proeve){
	  	return res.json(200, proeve);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new proeve in the DB.
exports.create = function(req, res) {
  models.Proeve.create(req.body).then(function(proeve) {
    return res.json(201, proeve);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing proeve in the DB.
exports.update = function(req, res) {
  models.Proeve.find({ where : { proeve_id: req.params.id }} ).then(function(proeve){
    if(!proeve) { return res.send(404); }  
	  return proeve.updateAttributes(req.body);	  	
  }).then(function(proeve){
  	return res.json(200, proeve);
  }).catch(function(err){
	  handleError(res, err);
  });
 
};

// Deletes a proeve from the DB.
exports.destroy = function(req, res) {
  models.Proeve.destroy({ where : { proeve_id: req.params.id }} ).then(function(proeve){
	}).then(function(){
  	return res.json(200);
	}).catch(function(err){
	  handleError(res, err);
  });
};

// Describe proeve
exports.describe = function(req, res) {
  models.Proeve.describe().then(function(proeve){
  	return res.json(200, proeve);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

