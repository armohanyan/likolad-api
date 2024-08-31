'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('orders', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            phone1: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone2: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            region: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            apartment: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            floor: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            entry: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            deliveryDate: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'canceled'),
                allowNull: false,
                defaultValue: 'pending',
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('orders');
    },
};
