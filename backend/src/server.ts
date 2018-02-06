/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 25..
 */
/// <reference path="../typings/_all.d.ts" />

require('moment-timezone');


import config from "./config";
import logger from "./logger";

import App, { Socket } from "./app";
import Database, { Redis } from "./database";


// Initialize Server Application
export const app: App = new App();

app.listen(config.port);


// Initialize SocketIO Server
export const io: Socket = new Socket();
io.listen(config.io_port);
io.attach(app);


// Initialize mongodb Database
export const database: Database = new Database();
database.connect();

export const redis: Redis = new Redis();
redis.connect();

// define Process Kill listener
const killListener = () => {
    redis.close();
    database.close(true);
};

process.on("SIGINT", killListener)
    .on("SIGTERM", killListener);
