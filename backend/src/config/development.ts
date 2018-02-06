/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 25..
 */
/// <reference path="../../typings/_all.d.ts" />

export default {
    debug: false,
    database_uri: "mongodb://localhost:27017/voting",
    expires_in: {
        access_token: '30d',
        refresh_token: '30d',
    },
};
