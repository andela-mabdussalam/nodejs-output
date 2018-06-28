'use strict';

import bcrypt from 'bcrypt'
import { hashPassword } from '../tools'

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
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: (userEntity) => {
        const user = userEntity
        user.password = hashPassword(user.password)
      }
    },
    instanceMethods: {
      validPassword(password) {
        return bcrypt.compareSync(password, this.password)
      }
    }
  });
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Todo, {
      foreignKey: 'userId',
      as: 'todos'
    })
  };
  return User;
};
