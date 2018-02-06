/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 25..
 */
/// <reference path="../typings/_all.d.ts" />

import * as http from "http";
import * as path from "path";
import * as IO from "socket.io";
import * as walk from "walk-sync";
import * as cors from "koa2-cors";
import * as Cottage from "cottage";
import * as bodyParser from "koa-bodyparser";

import config, { ENVIRONMENT } from "./config";
import logger from "./logger";

import requestLogger from "./modules/request-logger";


export default class App extends Cottage {
    constructor(options?: object) {
        super(options);

        (this as any).use(cors());
        (this as any).use(bodyParser());
        (this as any).use(requestLogger);

        this.loadRoutes();
    }

    public listen(port: number, handler?: () => void): void {
        super.listen(port, () => {
            logger.debug(`You can see a log of debug mode!`);
            logger.info(`API Server running in '${ENVIRONMENT}' mode, listening on ${config.port}!`);

            if (handler) {
                handler();
            }
        });
    }

    private loadRoutes(): void {
        const walker = walk(config.path.routes);

        for (const file of walker) {
            if (file.match(/.*.js/g)) {
                const route = require(path.join(config.path.routes, file));
                const routeMethods = Object.getOwnPropertyNames(route.default.prototype);

                const instance = new route.default();

                for (const method of routeMethods) {
                    if (http.METHODS.indexOf(method.toUpperCase()) > 0) {
                        this[method](route.path, instance[method]);
                    }
                }
            }
        }
    }
}

export class Socket {
    public io: IO;

    constructor(options?: object) {
        this.io = IO(options);

        this.loadEvents();
    }

    public attach(app: App): void {
        app.io = this.io;
    }

    public listen(port: number, handler?: () => void): void {
        this.io.listen(port);
        logger.info(`Socket.io Server listening on ${config.io_port}!`);

        if (handler) {
            handler();
        }
    }

    private loadEvents(): void {
        const walker = walk(config.path.events);

        for (const file of walker) {
            if (file.match(/.*.js/g)) {
                const event = require(path.join(config.path.events, file));

                this.io.on('connection', (socket) => {
                    event.default(socket);
                });
            }
        }
    }
}
