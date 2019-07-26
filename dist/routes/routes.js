"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BolivarBot_1 = require("../controller/BolivarBot");
class Routes {
    constructor(app_) {
        this.app = app_;
    }
    appRoutes() {
        this.app.post("/hdi", (req, res) => {
            new BolivarBot_1.BolivarBot().cotizar();
            res.send('OK');
        });
    }
}
exports.Routes = Routes;
