'use strict';


module.exports = function(sequelize, DataTypes) {
	var Institution = sequelize.define("klasse", {
		klasse_id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		}	
	}, {
		tableName: 'klasse',
		timestamps: false,
		freezeTableName: true

	});

	return Institution;
};
