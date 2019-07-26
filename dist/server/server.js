"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyparser = require("body-parser");
const routes_1 = require("../routes/routes");
const BolivarBot_1 = require("../controller/BolivarBot");
class Server {
    constructor(puerto) {
        this.port = puerto;
        this.app = express();
    }
    static init(port) {
        return new Server(port);
    }
    //zona de middlewares
    appConfig() {
        this.app.use(bodyparser.urlencoded({ extended: false }));
        this.app.use(bodyparser.json());
    }
    //Incluimos archivos para rutas
    includeRoutes() {
        new routes_1.Routes(this.app).appRoutes();
    }
    start(callback) {
        this.app.listen(this.port, callback());
        new BolivarBot_1.BolivarBot().cotizar();
        this.appConfig();
        this.includeRoutes();
    }
}
exports.default = Server;
