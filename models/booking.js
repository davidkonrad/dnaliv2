/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('booking', {
    booking_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    klassetrin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postnr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kommune: {
      type: DataTypes.STRING,
      allowNull: false
    },
    laerer_navn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    laerer_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    learer_tlf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    elever_antal: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    laerer_antal: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    kommentar: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'booking',
    freezeTableName: true
  });
};
