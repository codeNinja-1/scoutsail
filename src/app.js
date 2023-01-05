import chalk from 'chalk';

export class App {
    #appName;
    #routeTarget;
    #rootServer;
    #appLogger;

    constructor() {
        this.#appName = "App";
        this.#routeTarget = "";
        this.#rootServer = null;
        this.#appLogger = {
            info: (text) => {
                console.log(`[@${this.name()}] ${text}`);
            },

            warn: (text) => {
                console.log(chalk.yellow(`[@${this.name()}] Warning: ${text}`));
            },

            error: (text) => {
                console.log(chalk.red(`[@${this.name()}] Error: ${text}`));
            }
        };
    }

    name(value) {
        if (value) this.#appName = value;
        return this.#appName;
    }

    route(value) {
        if (value) this.#routeTarget = value;
        return this.#routeTarget;
    }

    server(value, settable = false) {
        if (value) {
            if (settable) {
                this.#rootServer = value;
            } else {
                this.logger().warn(`app.server() should not be set`);
            }
        }

        return this.#rootServer;
    }

    valid() {
        return this.#appName;
    }

    logger() {
        return this.#appLogger;
    }

    async install(parent) {
        if (this.router) {
            if (this.#routeTarget) {
                if (this.#routeTarget == "/") {
                    parent.app.use(await this.router());
                } else {
                    parent.app.use(this.#routeTarget, await this.router());
                }
            } else {
                this.logger().warn(`Application router cannot be used - no route target`);
            }
        }
    }

    // router(), install(parent), init(), info()
}