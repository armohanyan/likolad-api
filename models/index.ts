import { Sequelize } from 'sequelize';
import UserFactory from './user';
import ProductFactory from './product';
import CategoryFactory from './category';
import ProductCategoryFactory from './productCategory';
import TestimonialFactory from './testimonial';
import ContactFactory from './contact';

// Initialize Sequelize
const sequelize = new Sequelize({
  "username": "root",
  "password": "HyHJWmhIA0wWN8Y",
  "database": "likolad",
  "host": "127.0.0.1",
  "dialect": "mysql"
});

// Initialize models
const User = UserFactory(sequelize);
const Product = ProductFactory(sequelize);
const Category = CategoryFactory(sequelize);
const ProductCategory = ProductCategoryFactory(sequelize);
const Testimonial = TestimonialFactory(sequelize);
const Contact = ContactFactory(sequelize);

// Define associations
User.hasMany(Product, { foreignKey: 'userId' });
Product.belongsTo(User, { foreignKey: 'userId' });

Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

// Export models and Sequelize instance
export { sequelize, User, Product, Category, ProductCategory, Testimonial, Contact };