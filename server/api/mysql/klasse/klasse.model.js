'use strict';


module.exports = function(sequelize, DataTypes) {
	var Klasse = sequelize.define("klasse", {
		klasse_id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
    projekt_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: true,
			defaultValue: '< ikke udfyldt >'
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    postnr: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kommune: {
      type: DataTypes.STRING,
      allowNull: true
    },
    klassetrin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fag: {
      type: DataTypes.STRING,
      allowNull: true
    },
    laerer_navn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    laerer_tlf: {
      type: DataTypes.STRING,
      allowNull: true
    },
    laerer_email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    antal_elever: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    antal_laerer: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
	},
  {
		tableName: 'klasse',
		timestamps: false,
		freezeTableName: true

	});

	return Klasse;
};


