import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {ICategory} from "../types/category";

type CategoryCreationAttributes = Optional<ICategory, 'id'>;

export default (sequelize: Sequelize) => {
  class Category extends Model<ICategory, CategoryCreationAttributes> implements ICategory {
    declare id: number;
    declare title_am: string;
    declare title_en: string;
    declare description_am?: string;
    declare description_en?: string;
    declare parentId?: number;

    // Associations
    public readonly parent?: Category;
    public readonly subcategories?: Category[];
  }

  Category.init({
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
      allowNull: true,
    },
    description_en: {
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
    timestamps: false
  });

  Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });
  Category.hasMany(Category, { as: 'subcategories', foreignKey: 'parentId' });


  return Category;
};
