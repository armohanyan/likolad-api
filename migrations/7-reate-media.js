'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('media', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM('image', 'video'),
                allowNull: false,
            },
            path: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id',
                },
                onDelete: 'CASCADE', // Delete media if the product is deleted
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('media');
    }
};
