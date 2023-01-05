import { Home } from './apps/home/index.js';
import { Server } from './src/server.js';

const server = new Server();
const app = new Home();

await server.install(app);
await server.setup();
await server.start(80);