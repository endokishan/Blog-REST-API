"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const mongoose = require("mongoose");
const env_1 = require("./environments/env");
const CommentRouter_1 = require("./routers/CommentRouter");
const PostRouter_1 = require("./routers/PostRouter");
const UserRouter_1 = require("./routers/UserRouter");
class Server {
    constructor() {
        this.app = express();
        this.setConfiguration();
        this.setRoutes();
        this.error404Handler();
        this.handleError();
    }
    ;
    setConfiguration() {
        this.connectMongoDB();
        this.configBodyParser();
    }
    ;
    connectMongoDB() {
        mongoose.connect(env_1.getEnvironmentVariables().db_url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).then(() => {
            console.log("mongodb database is connected");
        });
    }
    ;
    configBodyParser() {
        this.app.use(express.urlencoded({ extended: true }));
    }
    ;
    setRoutes() {
        this.app.use('/uploads', express.static('uploads'));
        this.app.use('/api/user', UserRouter_1.default);
        this.app.use('/api/post', PostRouter_1.default);
        this.app.use('/api/comment', CommentRouter_1.default);
    }
    ;
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: "Not found",
                status_code: 404
            });
        });
    }
    ;
    handleError() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                messege: error.message || 'Something Went Wrong, Please try Again',
                status_code: errorStatus
            });
        });
    }
    ;
}
exports.Server = Server;
;
