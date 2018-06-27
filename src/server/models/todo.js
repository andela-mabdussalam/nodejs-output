'use strict';

export default (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.ENUM('in progress', 'done', 'not started'),
      defaultValue: 'not started'
    }
  }, {});
  Todo.associate = (models) => {
    // associations can be defined here
  };
  return Todo;
};
