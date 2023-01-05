import express from 'express';

export class Server {
    constructor() {
        this.apps = new Set();
        this.app = express();
        this.state = 0;
    }

    async install(app) {
        await app.info();

        const info = {
            name: app.name()
        };

        console.log(`[server] Installing ${info.name}`);
        this.apps.add({
            app, info
        });
    }
    
    async setup() {
        for (const app of this.apps) {
            console.log(`[server] Setting up ${app.info.name}`);

            await app.app.install(this);
        }
    }

    async init() {
        for (const app of this.apps) {
            console.log(`[server] Initializing ${app.info.name}`);

            if (app.app.init) await app.app.init();
        }
    }

    start(port) {
        return new Promise(res => {
            this.init()
                .then(() => {
                    console.log(`[server] Starting on port ${port}`);
                    this.app.listen(port, res);
                });
        });
    }
}