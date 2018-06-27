'use strict';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        nonEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        nonEmpty: true
      }
    }
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Todo, {
      foreignKey: 'userId',
      as: 'todos'
    })
  };
  return User;
};
