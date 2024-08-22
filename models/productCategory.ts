import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ProductCategoryAttributes {
    productId: number;
    categoryId: number;
    // Additional attributes can be added here, e.g., timestamps
    createdAt?: Date;
    updatedAt?: Date;
}

type ProductCategoryCreationAttributes = Optional<ProductCategoryAttributes, 'createdAt' | 'updatedAt'>;

export default (sequelize: Sequelize) => {
    class ProductCategory extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes> implements ProductCategoryAttributes {
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
        timestamps: true, // This ensures `createdAt` and `updatedAt` are managed
    });

    return ProductCategory;
};
