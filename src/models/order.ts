import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { IOrder } from '../types/order';

type OrderCreationAttributes = Optional<IOrder, 'id'>;

export default (sequelize: Sequelize) => {
    class Order extends Model<IOrder, OrderCreationAttributes> implements IOrder {
        declare id: string;
        declare phone1: string;
        declare phone2?: string;
        declare region?: string;
        declare address?: string;
        declare apartment?: string;
        declare floor?: string;
        declare entry?: string;
        declare deliveryDate: 'asap' | 'within1day' | 'within2day' | string;
        declare status: 'canceled' | 'pending' | 'confirmed' | 'delivered';
    }

    Order.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        phone1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        region: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        apartment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        floor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        entry: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deliveryDate: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isValidDeliveryDate(value: string) {
                    const predefinedValues = ['asap', 'within1day', 'within2day'];
                    const isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(value);
                    if (!predefinedValues.includes(value) && !isValidDate) {
                        throw new Error('Delivery date must be either "asap", "within1day", "within2day", or a valid date in "MM/DD/YYYY" format.');
                    }
                },
            },
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'delivered', 'canceled'),
            allowNull: false,
            defaultValue: 'pending',
        },
    }, {
        sequelize,
        tableName: 'orders',
        timestamps: false
    });

    return Order;
};
