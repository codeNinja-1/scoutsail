import { App } from "../../src/app.js";
import express from 'express';
import url from 'url';

export class Home extends App {
    router() {
        return express.static(url.fileURLToPath(new URL('public', import.meta.url)));
    }

    info() {
        this.name("home");
        this.route("/");
    }
}