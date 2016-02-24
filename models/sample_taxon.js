/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sample_taxon', {
    sample_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'sample',
        key: '_id'
      }
    },
    taxon_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'taxon',
        key: '_id'
      }
    },
    present: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'sample_taxon',
    freezeTableName: true
  });
};
