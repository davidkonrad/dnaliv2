'use strict';

module.exports = function(sequelize, DataTypes) {
	var Proeve = sequelize.define("proeve", {
    proeve_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    proeve_nr: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lokalitet_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    indsamlingsDato: {
      type: DataTypes.DATE,
      allowNull: true
    },
		/*
    analyseDato: {
      type: DataTypes.DATE,
      allowNull: true
    },
		*/
    indsamlerNavn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    indsamlerInstitution: {
      type: DataTypes.STRING,
      allowNull: true
    },
    indsamlerEmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    modtagelsesDato: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ekstraktionsDato: {
      type: DataTypes.DATE,
      allowNull: true
    },
    elueringsVolumen: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aliquotVolumen: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ngUl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    filtreringsVolumen: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    AntalKuverter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dataset: {
      type: DataTypes.STRING,
      allowNull: true
    },
		created_timestamp : {
      type: DataTypes.DATE,
      allowNull: true
    }, 
		created_userName : {
      type: DataTypes.STRING,
      allowNull: true
    },
		locked_by : {
      type: DataTypes.STRING,
      allowNull: true
    },
		//extra fields
		extra1 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra2 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra3 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra4 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra5 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra6 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra7 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra8 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra9 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra10 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		//11-20
		extra11 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra12 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra13 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra14 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra15 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra16 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra17 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra18 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra19 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra20 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		//21-30
		extra21 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra22 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra23 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra24 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra25 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra26 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra27 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra28 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra29 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra30 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		//31-40
		extra31 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra32 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra33 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra34 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra35 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra36 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra37 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra38 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra39 : {
      type: DataTypes.STRING,
      allowNull: true
    },
		extra40 : {
      type: DataTypes.STRING,
      allowNull: true
    }

	}, {
		tableName: 'proeve',
		timestamps: false,
		freezeTableName: true,
		classMethods: {
      associate: function(models) {
        models.Proeve.belongsTo(models.Lokalitet, { foreignKey : 'lokalitet_id', as : 'Lokalitet' })
        models.Proeve.hasMany(models.Resultat, { foreignKey : 'proeve_id', as : 'Resultat' })
        models.Proeve.hasMany(models.Kommentar, { foreignKey : 'relation_id', type_id: 3 , as : 'Kommentar' })
			}
		}

	});

	return Proeve;
};
