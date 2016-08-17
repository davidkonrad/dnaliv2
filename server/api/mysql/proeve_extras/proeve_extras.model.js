'use strict';

module.exports = function(sequelize, DataTypes) {
	var Proeve_extras = sequelize.define("proeve_extras", {
    extras_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: true
    },
    caption_export: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    }

	}, {
		tableName: 'proeve_extras',
		timestamps: false,
		freezeTableName: true

	});

	return Proeve_extras;
};
