export class Middleware extends App {
    constructor(middleware) {
        super();

        this.middleware = middleware;
    }

    info() {
        this.name("middleware");
    }

    install(parent) {
        parent.app.use(this.middleware);
    }
}