/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projekt_taxon', {
    projekt_taxon_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    projekt_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    taxon_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'projekt_taxon',
    freezeTableName: true
  });
};
