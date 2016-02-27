'use strict';


module.exports = function(sequelize, DataTypes) {

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
    },
    projekt_dato: {
      type: DataTypes.DATE,
      allowNull: true
    },
    projekt_tidspunkt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '09:09:00'
    }

	}, {
		tableName: 'projekt',
		timestamps: false,
		freezeTableName: true
	});
	return Projekt;
};
