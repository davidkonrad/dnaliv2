/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resultat', {
    resultat_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    booking_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    proeve_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    taxon_ids: {
      type: DataTypes.STRING,
      allowNull: true
    },
    datoForAnalyse: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    created_userName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'resultat',
    freezeTableName: true
  });
};
