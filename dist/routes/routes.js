"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HdiBot_1 = require("../controller/HdiBot");
class Routes {
    constructor(app_) {
        this.app = app_;
    }
    appRoutes() {
        this.app.post("/hdi", (req, res) => {
            new HdiBot_1.HdiBot().cotizar();
            res.send('OK');
        });
    }
}
exports.Routes = Routes;
