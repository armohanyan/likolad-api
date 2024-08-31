import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {IMedia} from "../types/media";


type MediaCreationAttributes = Optional<IMedia, 'id'>;

export default (sequelize: Sequelize) => {
    class Media extends Model<IMedia, MediaCreationAttributes> implements IMedia {
        declare id: number;
        declare type: 'image' | 'video';
        declare path: string;
        declare productId: number;
    }

    Media.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.ENUM('image', 'video'),
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id',
            },
        },
    }, {
        sequelize,
        tableName: 'media',
        timestamps: false
    });

    return Media;
};
