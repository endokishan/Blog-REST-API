import * as express from "express";
import * as mongoose from "mongoose";
import CommentRouter from "./routers/CommentRouter";
import PostRouter from "./routers/PostRouter";
import UserRouter from "./routers/UserRouter";
require('dotenv').config()


export class Server {
    public app: express.Application = express();

    constructor() {

        this.setConfiguration();

        this.setRoutes();

        this.error404Handler();

        this.handleError();
    };

    setConfiguration() {
        this.connectMongoDB();

        this.configBodyParser();
    };

    connectMongoDB() {
        mongoose.connect(process.env.db_url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).then(() => {
            console.log("mongodb database is connected");
        });
    };

    configBodyParser() {
        this.app.use(express.urlencoded({ extended: true }));
    };

    setRoutes() {
        this.app.use('/uploads', express.static('uploads'));
        this.app.use('/api/user', UserRouter);
        this.app.use('/api/post', PostRouter);
        this.app.use('/api/comment', CommentRouter);
    };

    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: "Not found",
                status_code: 404
            });
        });
    };

    handleError() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                messege: error.message || 'Something Went Wrong, Please try Again',
                status_code: errorStatus
            });
        });
    };
};
