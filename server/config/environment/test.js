'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
		/*
    uri: 'mongodb://localhost/dinacollections-dev',
		database : 		'dinacollections-dev'
		*/
    uri: 'mongodb://localhost/dnaliv',
		database : 'dnaliv'
  },

  seedDB: true,
  
  mysql: {
	  database: 'specify',
	  username: 'root',
	  password: 'dadk'
  },
  tempuploaddir: '../uploads/'
  
};
