"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
const server_1 = require("./server");
let server = new server_1.Server().app;
exports.port = process.env.PORT || 3000;
server.listen(exports.port, () => {
    console.log('Serever is running on port : http://localhost:3000');
});
