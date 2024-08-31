import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {IUser} from "../types/user";

type UserCreationAttributes = Optional<IUser, 'id' | 'createdAt' | 'updatedAt'>;

export default (sequelize: Sequelize) => {
  class User extends Model<IUser, UserCreationAttributes> implements IUser {
    declare id: number;
    declare firstName: string;
    declare lastName: string;
    declare role: 'admin' | 'user';
    declare email: string;
    declare password: string;
    declare phone: string;
    declare isVerified: boolean;
    declare birthday: Date;
    declare location: string;
    declare histories: string;
    declare pickedProducts: string;
    declare rating: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'users',
  });

  return User;
};
