/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 25..
 */
/// <reference path="../../typings/_all.d.ts" />

import * as jwt from "jsonwebtoken";

import config from "../config";
import { AuthenticationFailError } from "../errors";


class JWT {
    /**
     * @description Create JWT Access, Refresh Tokens
     * @param {string} type
     * @param {Object} student
     * @returns {string}
     */
    public create(type: string, student: object): string {
        let expiresIn = null;
        let payload = {};

        switch (type) {
            case "access":
                payload = {
                    hash: student._id,
                    student_id: student.studentId,
                    name: student.name,
                    permission: student.permission,
                };
                expiresIn = config.expires_in.access_token;
                break;
            case "refresh":
                // payload = {
                //     type: "refresh"
                // };
                // expiresIn = config.expires_in.refresh_token;
                break;
        }

        return jwt.sign(payload, config.secret.secret_key, { expiresIn });
    }

    /**
     * @description Decode JWT Access Token
     * @param {stirng} token
     * @returns {Object}
     */
    public decode(token: string): object {
        return jwt.decode(token);
    }

    /**
     * @description Verify Access Token
     * @param {object} request
     * @param {string} permission
     */
    public verify(request, permission: string = null): object {
        try {
            let token = (request.header as any).authorization;

            if (!token) {
                throw new AuthenticationFailError();
            }

            token = token.substring(7);

            jwt.verify(token, config.secret.secret_key);

            if (permission) {
                const my = config.permissions.indexOf((this.decode(token) as any).permission);
                const target = config.permissions.indexOf(permission);

                if (my < target) {
                    throw new AuthenticationFailError();
                }

                return this.decode(token);
            }
        } catch (error) {
            throw new AuthenticationFailError();
        }
    }
}

export default new JWT();
