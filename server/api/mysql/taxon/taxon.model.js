'use strict';


module.exports = function(sequelize, DataTypes) {
	var Taxon = sequelize.define("taxon", {
		taxon_id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		taxon_navn: {
			type: DataTypes.STRING,
      allowNull: false
    },
		taxon_navn_dk: {
			type: DataTypes.STRING,
      allowNull: true
    },
    taxon_artsgruppe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taxon_basisliste: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
		taxon_prioritet: {
			type: DataTypes.INTEGER(3),
			allowNull: true
		}

	}, {
		tableName: 'taxon',
		timestamps: false,
		freezeTableName: true

	});

	return Taxon;
};
