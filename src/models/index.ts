import { Sequelize } from 'sequelize';
import UserFactory from './user';
import ProductFactory from './product';
import MediaFactory from './media';
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
const Media = MediaFactory(sequelize);
const Category = CategoryFactory(sequelize);
const ProductCategory = ProductCategoryFactory(sequelize);
const Testimonial = TestimonialFactory(sequelize);
const Contact = ContactFactory(sequelize);


const defineAssociations = () => {
  Product.belongsToMany(Category, { through: ProductCategory });
  Category.belongsToMany(Product, { through: ProductCategory });

  Product.hasMany(Media, { foreignKey: 'productId', as: 'media' });
  Media.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
};

defineAssociations();


export { sequelize, User, Product, Category, ProductCategory, Testimonial, Contact, Media };