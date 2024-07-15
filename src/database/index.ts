import {LoggerUtil} from "../utils";
import db from '../../models'

export default class Database {
    private async authenticate(): Promise<void> {
        try {
            await db.sequelize.authenticate()

            LoggerUtil.info(`Connection has been established successfully`);
        } catch (error) {
            LoggerUtil.error("Unable to connect to the database:", error);
        }
    }

    public initialize(): void {
        this.authenticate()
    }
}
