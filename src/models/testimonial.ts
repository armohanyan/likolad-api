  import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
  import {ITestimonial} from "../types/testimonial";


type TestimonialCreationAttributes = Optional<ITestimonial, 'id'>;

export default (sequelize: Sequelize) => {
  class Testimonial extends Model<ITestimonial, TestimonialCreationAttributes> implements ITestimonial {
    declare id: number;
    declare content_am: string;
    declare content_en: string;
    declare author_am: string;
    declare author_en: string;
  }

  Testimonial.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content_am: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content_en: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author_am: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'testimonials',
  });

  return Testimonial;
};