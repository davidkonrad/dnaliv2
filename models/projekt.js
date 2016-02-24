/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projekt', {
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    project_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timestamp_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    }
  }, {
    tableName: 'projekt',
    freezeTableName: true
  });
};
