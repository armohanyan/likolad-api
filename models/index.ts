'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import config from '../src/config';
import User from './user'; // Import the User model

interface IDB {
    [key: string]: any;
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
}

const dbConfigs = config.MYSQL;
const db: IDB = { sequelize: {} as Sequelize, Sequelize: Sequelize };

let sequelize: Sequelize = new Sequelize(dbConfigs.DATABASE, dbConfigs.USER, dbConfigs.PASSWORD, {
    host: dbConfigs.HOST,
    dialect: "mysql"
});

User.initialize(sequelize);

db.User = User;

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
