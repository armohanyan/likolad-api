import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {ICategory} from "../src/types/category";

type CategoryCreationAttributes = Optional<ICategory, 'id'>;

export default (sequelize: Sequelize) => {
  class Category extends Model<ICategory, CategoryCreationAttributes> implements ICategory {
    public id!: number;
    public title!: string;
    public description!: string;
    public parentId?: number;
  }

  Category.init({
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
      allowNull: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories', // Self-reference
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'categories',
  });

  return Category;
};
