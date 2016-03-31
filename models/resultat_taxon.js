/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resultat_taxon', {
    resultat_taxon_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    resultat_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    taxon_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    positiv: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    negativ: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    eDNA: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'resultat_taxon',
    freezeTableName: true
  });
};
