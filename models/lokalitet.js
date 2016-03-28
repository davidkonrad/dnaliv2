/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lokalitet', {
    lokalitet_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    navn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    X_GPS: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Y_GPS: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    locked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    geometryWkt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    subtype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    presentationString: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'lokalitet',
    freezeTableName: true
  });
};
