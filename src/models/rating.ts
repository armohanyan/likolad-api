import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IRating {
    id: number;
    rating: number;
    productId: number;
    userId: number;
}

type RatingCreationAttributes = Optional<IRating, 'id'>;

export default (sequelize: Sequelize) => {
    class Rating extends Model<IRating, RatingCreationAttributes> implements IRating {
        declare id: number;
        declare rating: number;
        declare productId: number;
        declare userId: number;
    }

    Rating.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    }, {
        sequelize,
        tableName: 'ratings',
        timestamps: true
    });

    return Rating;
};
