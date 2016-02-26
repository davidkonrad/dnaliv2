/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projekt', {
    projekt_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    projekt_kode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timestamp_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    projekt_dato: {
      type: DataTypes.DATE,
      allowNull: false
    },
    projekt_tidspunkt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '09:09:00'
    }
  }, {
    tableName: 'projekt',
    freezeTableName: true
  });
};
