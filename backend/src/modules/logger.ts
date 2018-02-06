/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 25..
 */
/// <reference path="../../typings/_all.d.ts" />

import * as moment from "moment";
import * as colors from "colors/safe";


export enum Level { LOG, INFO, VERBOSE, WARN, ERROR, CRITICAL, DEBUG }

export default class Logger {
    private outputLevel: Level;

    constructor(level: Level = Level.DEBUG) {
        this.outputLevel = level;
    }

    public log(message: any): void {
        this.logging(Level.LOG, colors.white, message);
    }

    public info(message: any): void {
        this.logging(Level.INFO, colors.white, message);
    }

    public verbose(message: any): void {
        this.logging(Level.VERBOSE, colors.blue, message);
    }

    public warn(message: any): void {
        this.logging(Level.WARN, colors.yellow, message);
    }

    public error(message: any): void {
        this.logging(Level.ERROR, colors.red, message);
    }

    public critical(message: any): void {
        this.logging(Level.CRITICAL, colors.bgRed, message);
    }

    public debug(message: any): void {
        this.logging(Level.DEBUG, colors.green, message);
    }

    public setLevel(level: Level): void {
        this.outputLevel = level;
    }

    private logging(level: Level, color: any, message: any): void {
        if (message instanceof Object) {
            message = JSON.stringify(message);
        }

        if (level <= this.outputLevel) {
            const prefix = color(colors.bold(`[${this.getTime()}][${Level[level]}]`));

            console.log(`${prefix} ${message}`);
        }
    }

    private getTime(): string {
        return moment().format("YYYY/MM/DD hh:mm:ss A");
    }
}
