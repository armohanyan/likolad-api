import { Sequelize } from 'sequelize';
import UserFactory from './user';
import ProductFactory from './product';
import CategoryFactory from './category';
import ProductCategoryFactory from './productCategory';
import TestimonialFactory from './testimonial';
import ContactFactory from './contact';

const sequelize = new Sequelize({
  "username": "root",
    "password": "HyHJWmhIA0wWN8Y",
    "database": "likolad",
    "host": "127.0.0.1",
    "dialect": "mysql"
});

const User = UserFactory(sequelize);
const Product = ProductFactory(sequelize);
const Category = CategoryFactory(sequelize);
const ProductCategory = ProductCategoryFactory(sequelize);
const Testimonial = TestimonialFactory(sequelize);
const Contact = ContactFactory(sequelize);

Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

export { sequelize, User, Product, Category, ProductCategory, Testimonial, Contact };