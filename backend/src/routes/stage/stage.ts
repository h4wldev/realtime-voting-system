/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 27..
 */
/// <reference path="../../../typings/_all.d.ts" />

import * as Cottage from "cottage";

import { app, redis } from "../../server";
import getErrorMessage from "../../errors";

import StageModel from "../../models/stages";

import JWT from "../../modules/jwt";


export default class Stage {
    private async get(ctx: object): Cottage.Response {
        try {
            const token = JWT.verify(ctx.request, "ADMIN");
            const id = ctx.request.params.id;

            const stage = await StageModel.get({ _id: id });
            const votes = JSON.parse(await redis.client.get(stage._id.toString())) || {};

            return new Cottage.Response(200, { stage: stage.dumps(), votes });
        } catch (error) {
            error = getErrorMessage(error);

            return new Cottage.Response(error.status, error.response);
        }
    }

    private async put(ctx: object): Cottage.Response {
        try {
            const token = JWT.verify(ctx.request, "ADMIN");
            const id = ctx.request.params.id;

            const { title, song } = ctx.request.body;

            const stage = await StageModel.get({ _id: id });

            stage.title = title;
            stage.song = song;

            await stage.save();

            app.io.emit("stage update", id);

            return new Cottage.Response(200);
        } catch (error) {
            error = getErrorMessage(error);

            return new Cottage.Response(error.status, error.response);
        }
    }

    private async delete(ctx: object): Cottage.Response {
        try {
            const token = JWT.verify(ctx.request, "ADMIN");
            const id = ctx.request.params.id;

            await StageModel.findOneAndRemove({ _id: id });

            return new Cottage.Response(200);
        } catch (error) {
            error = getErrorMessage(error);

            return new Cottage.Response(error.status, error.response);
        }
    }
}

export const path: string = "/stages/:id";
