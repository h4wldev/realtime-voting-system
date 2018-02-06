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


export default class StageReset {
    private async post(ctx: object): Cottage.Response {
        try {
            const token = JWT.verify(ctx.request, "STUDENT");
            const id = ctx.request.params.id;

            const stage = await StageModel.get({ _id: id });

            stage.participants = stage.participants.map((participant) => {
                return { nick: participant.nick, votes: [] };
            });

            await redis.client.set(stage._id.toString(), JSON.stringify({}));

            await stage.save();

            app.io.emit("stage update", id);

            return new Cottage.Response(200);
        } catch (error) {
            error = getErrorMessage(error);

            return new Cottage.Response(error.status, error.response);
        }
    }
}

export const path: string = "/stages/:id/reset";
