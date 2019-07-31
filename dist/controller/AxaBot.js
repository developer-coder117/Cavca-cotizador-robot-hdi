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
class AxaBot {
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
                slowMo: 30
            });
            const page = yield browser.newPage();
            yield page.goto(config_json_1.default.AXA.url);
            yield page.setViewport({
                width: 1080,
                height: 720
            });
            const pendingXHR = new PendingXHR(page);
            try {
                console.log("AXA scraper : buscando input usuario");
                yield page.waitForSelector(config_json_1.default.AXA.login.user);
                console.log("AXA scraper : introduciendo numero de cedula de usuario");
                yield page.type(config_json_1.default.AXA.login.user, config_json_1.default.AXA.credentials.user);
                console.log("AXA scraper : buscando input password");
                yield page.waitForSelector(config_json_1.default.AXA.login.pass);
                console.log("AXA scraper : introduciendo password de usuario");
                yield page.type(config_json_1.default.AXA.login.pass, config_json_1.default.AXA.credentials.pass);
                console.log("AXA scraper : seleccionando boton");
                yield page.waitForSelector(config_json_1.default.AXA.login.btn);
                yield page.click(config_json_1.default.AXA.login.btn);
                console.log("AXA scraper :  iniciando sesion espere...");
                yield page.waitForNavigation();
                console.log("AXA scraper :  buscando formulario");
                yield page.goto(config_json_1.default.AXA.redirect.form);
                console.log("AXA scraper :  redireccionando espere...");
                console.log("AXA scraper :  seleccionando tipo de documento espere...");
                yield page.waitForSelector(config_json_1.default.AXA.menu.cmbIdDocument);
                console.log("AXA scraper :  click boton de seleccion");
                yield page.click(config_json_1.default.AXA.menu.cmbIdDocument);
                console.log("AXA scraper :  escribiendo espere...");
                yield page.type(config_json_1.default.AXA.menu.cmbIdDocument, config_json_1.default.AXA.menu.cmbIdDocumentIn);
            }
            catch (error) {
                yield browser.close();
                console.log(error);
                throw new Error('Error scrap HDI');
            }
        });
    }
}
exports.AxaBot = AxaBot;
