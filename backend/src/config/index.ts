/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 25..
 */
/// <reference path="../../typings/_all.d.ts" />

export const ENVIRONMENT = process.env.NODE_ENV;

export default Object.assign({
        port: process.env.PORT || 9999,
        io_port: process.env.IO_PORT || 9998,
        timezone: "Asia/Seoul",
        permissions: ["STUDENT", "ADMIN"],
        path: require(`./path`).default,
        secret: require(`./secret`).default,
    },
    // Load Configuration by environment
    require(`./${ENVIRONMENT}`).default,
);
