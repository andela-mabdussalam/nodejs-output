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
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    }
  }, {});
  Todo.associate = (models) => {
    // associations can be defined here
    Todo.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Todo;
};
