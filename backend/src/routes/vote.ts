/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 26..
 */
/// <reference path="../../typings/_all.d.ts" />

import * as _ from "lodash";
import * as Cottage from "cottage";

import { app, redis } from "../server";
import getErrorMessage, { WaitForVoteError, MissingParamError, NotFoundError } from "../errors";

import StageModel from "../models/stages";

import JWT from "../modules/jwt";


export default class Vote {
    private async get(ctx: object): Cottage.Response {
        try {
            const token = JWT.verify(ctx.request, "STUDENT");
            const stage = await StageModel.get({ active: true });

            if (!stage) {
                throw new WaitForVoteError();
            }

            const votes = JSON.parse(await redis.client.get(stage._id.toString())) || {};

            return new Cottage.Response(200, { stage: stage.dumps(), voteTo: votes[token.hash] });
        } catch (error) {
            error = getErrorMessage(error);

            return new Cottage.Response(error.status, error.response);
        }
    }

    private async post(ctx: object): Cottage.Response {
        try {
            const { hash } = ctx.request.body;

            const token = JWT.verify(ctx.request, "STUDENT");
            const stage = await StageModel.get({ active: true });

            if (!stage) {
                throw new WaitForVoteError("지금은 투표하실 수 없습니다.");
            }

            if (!hash) {
                throw new MissingParamError("해시값은 필수로 입력돼야 합니다.");
            }

            const target = _.find(stage.participants, (o) => hash === o._id.toString());

            if (!target) {
                throw new NotFoundError("해당 참가자를 찾을 수 없습니다.");
            }

            let votes = JSON.parse(await redis.client.get(stage._id.toString())) || {};
            votes[token.hash] = hash;

            app.io.emit("vote", { token, target });

            await redis.client.set(stage._id.toString(), JSON.stringify(votes));

            return new Cottage.Response(200);
        } catch (error) {
            error = getErrorMessage(error);

            return new Cottage.Response(error.status, error.response);
        }
    }
}

export const path: string = "/vote";
