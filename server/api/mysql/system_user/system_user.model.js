'use strict';


module.exports = function(sequelize, DataTypes) {
	var System_user = sequelize.define("system_user", {
		user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
      allowNull: false
		},
		email: {
			type: DataTypes.STRING,
      allowNull: false
		},
		password: {
			type: DataTypes.STRING,
      allowNull: false
		},
		role: {
			type: DataTypes.STRING,
      allowNull: false
		}

	}, {
		tableName: 'system_user',
		timestamps: false,
		freezeTableName: true

	});

	return System_user;

};


