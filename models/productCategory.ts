import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {IProductCategory} from "../src/types/product-category";

type ProductCategoryCreationAttributes = Optional<IProductCategory, 'createdAt' | 'updatedAt'>;

export default (sequelize: Sequelize) => {
    class ProductCategory extends Model<IProductCategory, ProductCategoryCreationAttributes> implements IProductCategory {
        public productId!: number;
        public categoryId!: number;
        public createdAt?: Date;
        public updatedAt?: Date;
    }

    ProductCategory.init({
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'products',
                key: 'id',
            },
            primaryKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'id',
            },
            primaryKey: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'ProductCategories',
        timestamps: true,
    });

    return ProductCategory;
};
