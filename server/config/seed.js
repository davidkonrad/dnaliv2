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
		role: 'Admin' 
	}, {
    provider: 'local',
    name: 'Maja Elling',
    email: 'maja.elling@snm.ku.dk',
    password: 'sVq48mYhpk',
		role: 'Admin' 
	}, {
    provider: 'local',
    name: 'Marie Lillemark',
    email: 'marie.lillemark@snm.ku.dk',
    password: 'KPDt0p6AfG',
		role: 'Admin' 
	}, {
    provider: 'local',
    name: 'Pernille Selmer Olsen',
    email: 'pvsolsen@snm.ku.dk',
    password: 'eyHskF3gXY',
		role: 'Admin' 
	}, {
    provider: 'local',
    name: 'Pernille Hjort',
    email: 'phjort@snm.ku.dk',
    password: 'mpz457',
		role: 'Admin' 
	}, 
	//new, 02.03.2017
	{
    provider: 'local',
    name: 'bruger1',
    email: 'dnalab@snm.ku.dk',
    password: 'Dyndsmerling1234',
	  role: 'Admin'
	},
	{
    provider: 'local',
    name: 'Steen Knudsen',
    email: 'swknudsen@snm.ku.dk',
    password: 'swknudsen1234',
    role: 'Admin'
	},
	{
    provider: 'local',
    name: 'Karsten Elmose Vad',
    email: 'kevad@snm.ku.dk',
    password: 'kevad1234',
    role: 'Admin'
	},
	{
    provider: 'local',
    name: 'Sara Tougaard',
    email: 'saratougaard@snm.ku.dk',
    password: 'stougaard1234',
    role: 'Admin'
	},
	function() {
      console.log('finished populating users');
	})
})


