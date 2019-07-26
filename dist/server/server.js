"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyparser = require("body-parser");
const routes_1 = require("../routes/routes");
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
        /*
        this.app.post('/', (req,res)=>{
            
            let scrap = new ScrapUnitario()
            scrap.onScrapper("SBS")
            res.send('Hola mundo')
        })*/
        this.appConfig();
        this.includeRoutes();
    }
}
exports.default = Server;
