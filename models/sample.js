/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sample', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sampledate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    decimalLatitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    decimalLongitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    locality_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'locality',
        key: '_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: '_id'
      }
    }
  }, {
    tableName: 'sample',
    freezeTableName: true
  });
};
