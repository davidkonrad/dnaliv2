/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lokalitet_spot', {
    lokalitet_spot_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    lokalitet_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    beskrivelse: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'lokalitet_spot',
    freezeTableName: true
  });
};
