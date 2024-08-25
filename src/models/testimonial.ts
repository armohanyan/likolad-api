  import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
  import {ITestimonial} from "../types/testimonial";


type TestimonialCreationAttributes = Optional<ITestimonial, 'id'>;

export default (sequelize: Sequelize) => {
  class Testimonial extends Model<ITestimonial, TestimonialCreationAttributes> implements ITestimonial {
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