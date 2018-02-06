/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 27..
 */
/// <reference path="../../typings/_all.d.ts" />

import * as moment from "moment";
import * as mongoose from "mongoose";

import config from "../config";


const Schema: mongoose.Schema = new mongoose.Schema({
    title: { type: String, trim: true },
    song: { type: String, trim: true },
    active: { type: Boolean, default: false, required: true },
    participants: [
        {
            nick: { type: String, required: true, trim: true },
            votes: [
                { type: mongoose.Schema.Types.ObjectId, ref: "students", required: true, },
            ]
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

/**
 * @description Dump to string
 * @returns {object} stage
 */
Schema.methods.dumps = function(hidden: boolean = true): object {
    const stage = this.toObject();

    stage.participants = stage.participants.map((participant) => {
        return {
            hash: participant._id,
            nick: participant.nick,
            votes: hidden ? participant.votes.length : participant.votes
        };
    });
    stage.createdAt = moment(stage.createdAt).tz(config.timezone).format("x");
    stage.updatedAt = moment(stage.updatedAt).tz(config.timezone).format("x");

    return stage;
};

/**
 * @description Get Stages with params
 * @param {number} page
 * @param {number} size
 * @param {Object} find
 * @param {Object} sort
 * @returns {Object}
 */
Schema.statics.getList = function(page: number = 0, size: number = 25, find?: object, sort?: object): object {
    return this.find(find).skip(size * page).limit(size as number).sort(sort);
};

/**
 * @description Get Stage
 * @param {Object} find
 * @returns {Object}
 */
Schema.statics.get = function(find: object): object {
    return this.findOne(find);
};

export default mongoose.model("stages", Schema);
