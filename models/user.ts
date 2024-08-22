import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  email: string;
  password: string;
  phone: string;
  isVerified: boolean;
  birthday: Date;
  location: string;
  histories: string;
  pickedProducts: string;
  rating: number;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export default (sequelize: Sequelize) => {
  class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public role!: 'admin' | 'user';
    public email!: string;
    public password!: string;
    public phone!: string;
    public isVerified!: boolean;
    public birthday!: Date;
    public location!: string;
    public histories!: string;
    public pickedProducts!: string;
    public rating!: number;
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    histories: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pickedProducts: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  }, {
    sequelize,
    tableName: 'users',
  });

  return User;
};
