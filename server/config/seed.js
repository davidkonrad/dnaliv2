/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/mongo/user/user.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'guest',
    email: 'guest@snm.ku.dk',
    password: 'guest',
		role: 'Guest' 
	}, {
    provider: 'local',
    name: '-- test --',
    email: 'david@ku.dk',
    password: 'david',
		role: 'Admin'
  }, {
    provider: 'local',
    name: 'Andreas Kelager',
    email: 'akelager@snm.ku.dk',
    password: 'kelager',
		role: 'Admin' 
  }, {
    provider: 'local',
    name: 'Mette Grøn',
    email: 'mette.groen@snm.ku.dk',
    password: 'wuVb5tA3Sw',
		role: 'User' 
	}, {
    provider: 'local',
    name: 'Maja Elling',
    email: 'maja.elling@snm.ku.dk',
    password: 'sVq48mYhpk',
		role: 'User' 
	}, {
    provider: 'local',
    name: 'Marie Lillemark',
    email: 'marie.lillemark@snm.ku.dk',
    password: 'KPDt0p6AfG',
		role: 'User' 
	}, {
    provider: 'local',
    name: 'Pernille Selmer Olsen',
    email: 'pvsolsen@snm.ku.dk',
    password: 'eyHskF3gXY',
		role: 'User' 
	}, function() {
      console.log('finished populating users');
    }
  )
})

/*
Andreas Kelager				akelager@snm.ku.dk				kelager
Mette Grøn						mette.groen@snm.ku.dk			wuVb5tA3Sw
Maja Elling						maja.elling@snm.ku.dk			sVq48mYhpk
Marie Lillemark				marie.lillemark@snm.ku.dk	KPDt0p6AfG
Pernille Selmer Olsen	pvsolsen@snm.ku.dk				eyHskF3gXY
*/

