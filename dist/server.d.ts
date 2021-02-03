import * as express from "express";
export declare class Server {
    app: express.Application;
    constructor();
    setConfiguration(): void;
    connectMongoDB(): void;
    configBodyParser(): void;
    setRoutes(): void;
    error404Handler(): void;
    handleError(): void;
}
