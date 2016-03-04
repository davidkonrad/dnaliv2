'use strict';


module.exports = function(sequelize, DataTypes) {

	var Projekt_taxon = sequelize.define("projekt_taxon", {
		projekt_taxon_id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
    projekt_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    taxon_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
		is_included: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }

	}, {
		tableName: 'projekt_taxon',
		timestamps: false,
		freezeTableName: true
	});
	return Projekt_taxon;
};
