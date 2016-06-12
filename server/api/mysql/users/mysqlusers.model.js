'use strict';


module.exports = function(sequelize, DataTypes) {
	var MysqlUser = sequelize.define("users", {
		email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
		},
    name: {
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
		tableName: 'users',
		timestamps: false,
		freezeTableName: true

	});

	return MysqlUser;
};
