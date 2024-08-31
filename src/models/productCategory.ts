import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {IProductCategory} from "../types/product-category";

type ProductCategoryCreationAttributes = Optional<IProductCategory, 'createdAt' | 'updatedAt'>;

export default (sequelize: Sequelize) => {
    class ProductCategory extends Model<IProductCategory, ProductCategoryCreationAttributes> implements IProductCategory {
        declare productId: number;
        declare categoryId: number
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
        }
    }, {
        sequelize,
        tableName: 'product_category',
        timestamps: false,
    });

    return ProductCategory;
};
