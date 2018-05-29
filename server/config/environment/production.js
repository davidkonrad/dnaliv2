'use strict';

//console.log(process.env);
// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: '0.0.0.0',
  // Server port
  port: 80,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/dnaliv',
						database : 'dnaliv'
  },
  mysql: {
	  host: process.env.OPENSHIFT_MYSQL_DB_HOST,
	  port: process.env.OPENSHIFT_MYSQL_DB_PORT,
	  username: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
	  password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || '',
	  database: 'dnaliv'
  }

};
