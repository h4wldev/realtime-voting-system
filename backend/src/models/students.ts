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
    studentId: { type: String, required: true, trim: true, maxlength: 4, minlength: 4 },
    name: { type: String, required: true, trim: true },
    permission: { type: String, required: true, enum: config.permissions, default: "STUDENT" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

/**
 * @description Dump to string
 * @returns {object} student
 */
Schema.methods.dumps = function(): object {
    const student = this.toObject();

    student.createdAt = moment(student.createdAt).tz(config.timezone).format("x");

    return student;
};

/**
 * @description Get Students with params
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
 * @description Get Student
 * @param {Object} find
 * @returns {Object}
 */
Schema.statics.get = function(find: object): object {
    return this.findOne(find);
};

export default mongoose.model("students", Schema);
