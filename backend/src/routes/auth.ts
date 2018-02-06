/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 27..
 */
/// <reference path="../../typings/_all.d.ts" />

import * as Cottage from "cottage";

import config from "../config";
import getErrorMessage, { MissingParamError, AuthenticationFailError } from "../errors";

import StudentModel from "../models/students";

import JWT from "../modules/jwt";


export default class Auth {
    private async post(ctx: object): Cottage.Response {
        try {
            const { student_id, name } = ctx.request.body;

            if (!student_id || !name) {
                throw new MissingParamError("학번과 이름을 입력해주세요.");
            }

            const student = await StudentModel.get({ studentId: student_id, name });

            if (!student) {
                throw new AuthenticationFailError("재학생 인증에 실패하셨습니다.");
            }

            return new Cottage.Response(200, {
                access_token: JWT.create("access", student),
                expires_in: config.expires_in.access_token
            });
        } catch (error) {
            error = getErrorMessage(error);

            return new Cottage.Response(error.status, error.response);
        }
    }
}

export const path: string = "/auth";
