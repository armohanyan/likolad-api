const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('products-categories', {
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products', // Reference to the 'products' table
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories', // Reference to the 'categories' table
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('ProductCategories');
  }
};