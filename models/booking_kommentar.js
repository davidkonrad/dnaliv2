/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('booking_kommentar', {
    kommentar_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    booking_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    kommentar: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'booking_kommentar',
    freezeTableName: true
  });
};
