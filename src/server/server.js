"use strict";
exports.__esModule = true;
var express = require("express");
var bodyparser = require("body-parser");
var routes_1 = require("../routes/routes");
var Server = /** @class */ (function () {
    function Server(puerto) {
        this.port = puerto;
        this.app = express();
    }
    Server.init = function (port) {
        return new Server(port);
    };
    //zona de middlewares
    Server.prototype.appConfig = function () {
        this.app.use(bodyparser.urlencoded({ extended: false }));
        this.app.use(bodyparser.json());
    };
    //Incluimos archivos para rutas
    Server.prototype.includeRoutes = function () {
        new routes_1.Routes(this.app).appRoutes();
    };
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback());
        /*
        this.app.post('/', (req,res)=>{
            
            let scrap = new ScrapUnitario()
            scrap.onScrapper("SBS")
            res.send('Hola mundo')
        })*/
        this.appConfig();
        this.includeRoutes();
    };
    return Server;
}());
exports["default"] = Server;
