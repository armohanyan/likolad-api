const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('categories', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title_am: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title_en: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description_am: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description_en: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'categories', // This sets up a self-referencing foreign key
          key: 'id',
        },
        onDelete: 'SET NULL',
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('categories');
  }
};