"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const config_json_1 = __importDefault(require("../data/config.json"));
const { PendingXHR } = require('pending-xhr-puppeteer');
class SEBot {
    login() {
        throw new Error("Method not implemented.");
    }
    verify() {
        throw new Error("Method not implemented.");
    }
    cotizar() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch({
                headless: false,
                slowMo: 50
            });
            const page = yield browser.newPage();
            yield page.goto(config_json_1.default.SegurosEstado.url);
            yield page.setViewport({
                width: 1080,
                height: 720
            });
            const pendingXHR = new PendingXHR(page);
            try {
                yield pendingXHR.waitForAllXhrFinished();
                yield page.click(config_json_1.default.SegurosEstado.formLogin);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.login.user);
                yield page.type(config_json_1.default.SegurosEstado.login.user, config_json_1.default.SegurosEstado.credentials.user);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.login.password);
                yield page.type(config_json_1.default.SegurosEstado.login.password, config_json_1.default.SegurosEstado.credentials.pass);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.login.btn);
                yield page.click(config_json_1.default.SegurosEstado.login.btn);
            }
            catch (error) {
                console.log("Error");
                yield page.waitFor(100000);
                yield browser.close();
                console.log(error);
                throw new Error('Error scrap Seguros del estado');
            }
        });
    }
}
exports.SEBot = SEBot;
