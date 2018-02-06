/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 25..
 */
/// <reference path="../typings/_all.d.ts" />

import Logger, { Level } from "./modules/logger";


const logger: Logger = new Logger();
logger.setLevel(process.env.NODE_ENV === "production" ? Level.ERROR : Level.DEBUG);

export default logger;
