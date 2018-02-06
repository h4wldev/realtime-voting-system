/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 26..
 */
/// <reference path="../../typings/_all.d.ts" />

import logger from "../logger";


export default async (context, next) => {
    const start: number = +new Date();

    await next();

    const elapsed: number = +new Date() - start;
    const { method, url, status } = context;

    logger[status >= 500 ? "error" : "info"](`${method} ${url} - ${status}, ${elapsed}ms`);
};
