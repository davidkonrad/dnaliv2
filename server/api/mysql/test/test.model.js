'use strict';


module.exports = function(sequelize, DataTypes) {
	var Test = sequelize.define("test", {
		test_id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		message: {
			type: DataTypes.STRING,
		}
}, {
		tableName: '__test',
		timestamps: false,
		freezeTableName: true
		/*
		classMethods: {
			associate: function(models) {
				// Agent.hasMany(models.Workbenchtemplate)
			}

		}
		*/
	});
	return Test;
};
