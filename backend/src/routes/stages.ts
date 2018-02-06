/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 27..
 */
/// <reference path="../../typings/_all.d.ts" />

import * as Cottage from "cottage";

import getErrorMessage, { MissingParamError } from "../errors";

import StageModel from "../models/stages";

import JWT from "../modules/jwt";


export default class Stages {
    private async get(ctx: object): Cottage.Response {
        try {
            const token = JWT.verify(ctx.request, "ADMIN");

            const stages = await StageModel.getList(0, 100);

            return new Cottage.Response(200, stages.map((stage) => stage.dumps(false)));
        } catch (error) {
            error = getErrorMessage(error);

            return new Cottage.Response(error.status, error.response);
        }
    }

    private async post(ctx: object): Cottage.Response {
        try {
            const token = JWT.verify(ctx.request, "ADMIN");

            const { title, song, active, participants } = ctx.request.body;

            if (!participants || participants.length < 1) {
                throw new MissingParamError();
            }

            const stage = new StageModel({ title, song, active, participants });
            await stage.save();

            return new Cottage.Response(201);
        } catch (error) {
            error = getErrorMessage(error);

            return new Cottage.Response(error.status, error.response);
        }
    }
}

export const path: string = "/stages";
