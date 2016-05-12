/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kommentar', {
    kommentar_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    relation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    kommentar: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    created_userName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'kommentar',
    freezeTableName: true
  });
};
