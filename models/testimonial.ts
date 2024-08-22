  import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface TestimonialAttributes {
  id: number;
  content: string;
  author: string;
}

type TestimonialCreationAttributes = Optional<TestimonialAttributes, 'id'>;

export default (sequelize: Sequelize) => {
  class Testimonial extends Model<TestimonialAttributes, TestimonialCreationAttributes> implements TestimonialAttributes {
    public id!: number;
    public content!: string;
    public author!: string;
  }

  Testimonial.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'testimonials',
  });

  return Testimonial;
};