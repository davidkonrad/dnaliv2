/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('klasse', {
    klasse_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: '',
        key: ''
      }
    },
    projekt_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postnr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kommune: {
      type: DataTypes.STRING,
      allowNull: false
    },
    klassetrin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    laerer_navn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    laerer_tlf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    laerer_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    antal_elever: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    antal_laerer: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'klasse',
    freezeTableName: true
  });
};
