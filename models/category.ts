import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface CategoryAttributes {
  id: number;
  title: string;
  description: string;
  parentId?: number; // Optional for nested categories
}

type CategoryCreationAttributes = Optional<CategoryAttributes, 'id'>;

export default (sequelize: Sequelize) => {
  class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
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
