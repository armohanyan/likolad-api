import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ProductAttributes {
  id: number;
  title: string;
  description: string;
  images: string;
  video: string;
  price: number;
  favorite: boolean;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

export default (sequelize: Sequelize) => {
  class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public images!: string;
    public video!: string;
    public price!: number;
    public favorite!: boolean;
  }

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    tableName: 'products',
  });

  return Product;
};
