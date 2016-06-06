/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',
    freezeTableName: true
  });
};
