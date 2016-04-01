'use strict';


module.exports = function(sequelize, DataTypes) {
	var Resultat = sequelize.define("resultat", {
		resultat_id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		booking_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}, 
		proeve_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}	
	}, {
		tableName: 'resultat',
		timestamps: false,
		freezeTableName: true

	});

	return Resultat;
};
