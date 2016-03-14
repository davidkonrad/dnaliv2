/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('booking_klasse', {
    klasse_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    booking_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    institutionsnavn: {
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
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    klassetrin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    laerer_navn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    laerer_tlf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    laerer_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    antal_elever: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    antal_laerer: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    KuvertProeverAfsendt: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Proevermodtaget: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    DatoForBesoeg: {
      type: DataTypes.DATE,
      allowNull: false
    },
    DatoForBooking: {
      type: DataTypes.DATE,
      allowNull: false
    },
    DatoForEkst: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'booking_klasse',
    freezeTableName: true
  });
};
