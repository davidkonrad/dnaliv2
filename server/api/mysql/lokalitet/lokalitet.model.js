'use strict';


module.exports = function(sequelize, DataTypes) {
	var Lokalitet = sequelize.define("lokalitet", {
		lokalitet_id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
    navn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    X_GPS: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Y_GPS: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true
    },
    locked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    geometryWkt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    subtype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    presentationString: {
      type: DataTypes.STRING,
      allowNull: true
    }	
	}, {
		tableName: 'lokalitet',
		timestamps: false,
		freezeTableName: true

	});

	return Lokalitet;
};
