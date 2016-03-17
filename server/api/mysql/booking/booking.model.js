'use strict';


module.exports = function(sequelize, DataTypes) {

	/*
	var Projekt = sequelize.define("projekt", {
		projekt_id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
    projekt_kode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projekt_dato: {
      type: DataTypes.DATE,
      allowNull: true
    },
    projekt_tidspunkt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '10:00'
    }

	}, {
		tableName: 'projekt',
		timestamps: false,
		freezeTableName: true
	});
	return Projekt;
	*/


	var Booking = sequelize.define('booking', {	
    booking_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sagsNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DatoForBooking: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DatoForBesoeg: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    timestamp_created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    periode: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    aar_periode: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'booking',
		timestamps: false,
    freezeTableName: true
	})	

	return Booking

};
