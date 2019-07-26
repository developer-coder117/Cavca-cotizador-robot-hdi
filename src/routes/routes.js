"use strict";
exports.__esModule = true;
var ControladorUnitario_1 = require("../controller/ControladorUnitario");
var Routes = /** @class */ (function () {
    function Routes(app_) {
        this.app = app_;
    }
    Routes.prototype.appRoutes = function () {
        this.app.post("/aseguradora", function (req, res) {
            var body = req.body;
            var nombreAseguradora = body.nombre;
            new ControladorUnitario_1.ScrapUnitario().onScrapper(nombreAseguradora);
            res.send('OK');
        });
    };
    return Routes;
}());
exports.Routes = Routes;
