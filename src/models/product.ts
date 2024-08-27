import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {IProduct} from "../types/product";
import {ICategory} from "../types/category";

type ProductCreationAttributes = Optional<IProduct, 'id'>;

export default (sequelize: Sequelize) => {
  class Product extends Model<IProduct, ProductCreationAttributes> implements IProduct {
    public id!: number;
    public title!: string;
    public description!: string;
    public price!: number;
    public favorite!: boolean;

    // Association Methods
    public getCategories!: () => Promise<ICategory[]>;
    public setCategories!: (categories: ICategory[] | number[]) => Promise<void>;
    public addCategory!: (category: ICategory | number) => Promise<void>;
    public addCategories!: (categories: ICategory[] | number[]) => Promise<void>;
    public removeCategory!: (category: ICategory | number) => Promise<void>;

    // public static associations: {
    //   categories: Association<Product, ICategory>;
    // };
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
