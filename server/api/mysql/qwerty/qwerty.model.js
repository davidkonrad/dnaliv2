'use strict';


module.exports = function(sequelize, DataTypes) {
	var Qwerty = sequelize.define("qwerty", {
		project_id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		}	
	}, {
		tableName: 'projekt',
		timestamps: false,
		freezeTableName: true

	});

	return Qwerty;
};
