'use strict';


module.exports = function(sequelize, DataTypes) {
	var Taxon = sequelize.define("taxon", {
		taxon_id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		}	
	}, {
		tableName: 'taxon',
		timestamps: false,
		freezeTableName: true

	});

	return Taxon;
};
