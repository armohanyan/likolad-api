const  { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('products', {
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
        allowNull: false,
      },
      description_en: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  }
};
