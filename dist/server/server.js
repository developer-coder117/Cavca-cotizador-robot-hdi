"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyparser = require("body-parser");
const routes_1 = require("../routes/routes");
const SegurosEstado_1 = require("../controller/SegurosEstado");
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
        //new HdiBot().cotizar();
        //new MapfreBot().cotizar();
        //new SbsBot().cotizar();
        //new AxaBot().cotizar();
        new SegurosEstado_1.SEBot().cotizar();
        this.appConfig();
        this.includeRoutes();
    }
}
exports.default = Server;
