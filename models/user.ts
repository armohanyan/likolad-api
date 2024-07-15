import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import {IUser} from "../src/types/user";

export default class User extends Model<IUser> implements IUser {
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

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    // Define association types here
  };

  public static initialize(sequelize: Sequelize) {
    User.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
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
        allowNull: false,
        unique: true,
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
        allowNull: false,
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
    }, {
      sequelize,
      modelName: 'User',
    });
  }
}
