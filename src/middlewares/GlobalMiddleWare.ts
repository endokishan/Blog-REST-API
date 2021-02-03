import { validationResult } from "express-validator";
import * as Jwt from 'jsonwebtoken';
require('dotenv').config()

export class GlobalMiddleWare {
    static checkError(req, res, next) {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            next(new Error(error.array()[0].msg));
        } else {
            next();
        };
    };

    static async authenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
        try {
            
            Jwt.verify(token, process.env.jwt_secret, ((err: any, decoded: any) => {
                if (err) {
                    next(err);
                } else if (!decoded) {
                    req.errorStatus = 401;
                    next(new Error('User not Authorised'));
                } else {
                    req.user = decoded;
                    next();
                };
            }));
        } catch (e) {
            req.errorStatus = 401;
            next(e);
        };
    };
};