import { Server } from "./server";

let server = new Server().app;

export let port = 3000;

server.listen(port, () => {
    console.log('Serever is running on port : http://localhost:3000');
});