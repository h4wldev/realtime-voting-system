/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 25..
 */
/// <reference path="../typings/_all.d.ts" />

import * as redis from "async-redis";
import * as mongoose from "mongoose";

import config from "./config";
import logger from "./logger";


export default class Database {
    private database: mongoose;

    constructor() {
        this.database = mongoose;
    }

    public connect(): void {
        try {
            this.database.Promise = global.Promise;
            this.database.connect(config.database_uri, { useMongoClient: true });

            this.database.connection.on("error", (error) => logger.critical(error.message));
            this.database.connection.on("connected", () => logger.info(`Successfully connected to mongodb.`));
        } catch (error) {
            logger.critical(`Invalid mongodb uri.`);
            process.exit(0);
        }
    }

    public close(terminate: boolean = false): void {
        this.database.connection.close(() => {
            logger.log(`Mongoose default connection disconnected through app termination.`);

            if (terminate) {
                process.exit(0);
            }
        });
    }
}

export class Redis {
    private client: any;

    public connect(): void {
        this.client = redis.createClient();

        this.client.on("error", (error) => logger.critical(error.message));
        this.client.on("connect", () => logger.info(`Successfully connected to redis.`));
    }

    public close(terminate: boolean = false): void {
        this.client.quit();
        logger.log(`Redis client disconnected through app termination.`);

        if (terminate) {
            process.exit(0);
        }
    }
}
