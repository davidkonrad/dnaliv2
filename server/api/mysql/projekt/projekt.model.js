'use strict';


module.exports = function(sequelize, DataTypes) {
/*
	var Projekt = sequelize.define("projekt", {
    projekt_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    projekt_kode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timestamp_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    }
  }, {
    tableName: 'projekt',
    freezeTableName: true
  });
*/

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
    }
	}, {
		tableName: 'projekt',
		timestamps: false,
		freezeTableName: true
	});
	return Projekt;
};
