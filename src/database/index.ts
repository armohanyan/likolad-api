import { sequelize } from "../models";
import {LoggerUtil} from "../utils";

export default class Database {
    private async authenticate(): Promise<void> {
        try {
            await sequelize.authenticate()

            LoggerUtil.info(`Connection has been established successfully`);
        } catch (error) {
            LoggerUtil.error("Unable to connect to the database:", error);
        }
    }

    public initialize(): void {
        this.authenticate()
    }
}
