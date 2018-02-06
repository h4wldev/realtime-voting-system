/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 27..
 */
/// <reference path="../../../typings/_all.d.ts" />

import * as Cottage from "cottage";

import { app } from "../../server";
import getErrorMessage from "../../errors";

import StageModel from "../../models/stages";

import JWT from "../../modules/jwt";


export default class StageActive {
    private async post(ctx: object): Cottage.Response {
        try {
            const token = JWT.verify(ctx.request, "ADMIN");
            const id = ctx.request.params.id;

            await StageModel.update({}, { active: false }, { multi: true });

            const stage = await StageModel.get({ _id: id });
            stage.active = true;
            await stage.save();

            app.io.emit("stage update", id);

            return new Cottage.Response(200);
        } catch (error) {
            error = getErrorMessage(error);

            return new Cottage.Response(error.status, error.response);
        }
    }
}

export const path: string = "/stages/:id/active";
