/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 25..
 */
/// <reference path="../typings/_all.d.ts" />

export class NotFoundError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, NotFoundError);

        this.name = "NotFoundError";
    }
}

export class WrongParamError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, WrongParamError);

        this.name = "WrongParamError";
    }
}

export class MissingParamError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, MissingParamError);

        this.name = "MissingParamError";
    }
}

export class AuthenticationFailError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, AuthenticationFailError);

        this.name = "AuthenticationFailError";
    }
}

export class WaitForVoteError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, WaitForVoteError);

        this.name = "WaitForVoteError";
    }
}

export class DuplicatedError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, DuplicatedError);

        this.name = "DuplicatedError";
    }
}

export class PermissionDeniedError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, PermissionDeniedError);

        this.name = "PermissionDeniedError";
    }
}


export default (error: Error): object => {
    let status: number = 500;
    const response: object = { error: error.name || "UnknownError" };

    if (error.message) {
        (response as any).message = error.message;
    }

    switch (error.name) {
        case "MissingParamError":
        case "ValidationError":
        case "WrongParamError":
        case "DuplicatedError":
        case "WaitForVoteError":
            status = 400; break;
        case "AuthenticationFailError":
            status = 401; break;
        case "NotFoundError":
            status = 404; break;
        case "PermissionDeniedError":
            status = 403; break;
    }

    return { status, response };
};
