import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {IProduct} from "../types/product";

type ProductCreationAttributes = Optional<IProduct, 'id'>;

export default (sequelize: Sequelize) => {
  class Product extends Model<IProduct, ProductCreationAttributes> implements IProduct {
    declare id: number;
    declare title_am: string;
    declare title_en: string;
    declare description_am: string;
    declare description_en: string;
    declare price: number;
  }

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title_am: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_am: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description_en: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'products',
  });

  return Product;
};
