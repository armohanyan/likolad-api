import { Sequelize } from 'sequelize';
import UserFactory from './user';
import ProductFactory from './product';
import MediaFactory from './media';
import CategoryFactory from './category';
import ProductCategoryFactory from './productCategory';
import TestimonialFactory from './testimonial';
import ContactFactory from './contact';
import RatingFactory from './rating';
import OrderFactory from './order';

const sequelize = new Sequelize({
   "username": "root",
    "password": "HyHJWmhIA0wWN8Y",
    "database": "likolad",
    "host": "127.0.0.1",
    "dialect": "mysql",
    logging: console.log
});

const User = UserFactory(sequelize);
const Product = ProductFactory(sequelize);
const Media = MediaFactory(sequelize);
const Category = CategoryFactory(sequelize);
const ProductCategory = ProductCategoryFactory(sequelize);
const Testimonial = TestimonialFactory(sequelize);
const Contact = ContactFactory(sequelize);
const Rating = RatingFactory(sequelize); // Initialize Rating model
const Order = OrderFactory(sequelize); // Initialize Rating model

const defineAssociations = () => {
  Product.belongsToMany(Category, { through: ProductCategory,  as: 'category'});
  Category.belongsToMany(Product, { through: ProductCategory, as: 'product'});

  Product.hasMany(Media, { foreignKey: 'productId', as: 'media' });
  Media.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

  Product.hasMany(Rating, { foreignKey: 'productId', as: 'ratings' });
  Rating.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

  User.hasMany(Rating, { foreignKey: 'userId', as: 'ratings' });
  Rating.belongsTo(User, { foreignKey: 'userId', as: 'user' });
};

defineAssociations();


export { sequelize, User, Product, Category, ProductCategory, Testimonial, Contact, Media, Rating, Order };