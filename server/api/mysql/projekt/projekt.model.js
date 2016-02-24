'use strict';


module.exports = function(sequelize, DataTypes) {
	var Projekt = sequelize.define("projekt", {
    projekt_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    projekt_code: {
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

	return Projekt;
};
