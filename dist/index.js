"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
let server = new server_1.Server().app;
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Serever is running on port : http://localhost:3000');
});
