const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('testimonials', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content_am: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content_en: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      author_am: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author_en: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('testimonials');
  }
};
