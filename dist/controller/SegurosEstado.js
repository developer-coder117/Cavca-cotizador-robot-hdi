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
                yield Promise.all([
                    page.goto(config_json_1.default.SegurosEstado.formParams.formOptions),
                    page.waitForNavigation({ waitUntil: 'networkidle0' }),
                ]);
                yield pendingXHR.waitForAllXhrFinished();
                yield Promise.all([
                    page.goto(config_json_1.default.SegurosEstado.formParams.frame),
                    page.waitForNavigation({ waitUntil: 'networkidle0' }),
                ]);
                yield page.click(config_json_1.default.SegurosEstado.formParams.option);
                yield pendingXHR.waitForAllXhrFinished();
                yield Promise.all([
                    yield page.click(config_json_1.default.SegurosEstado.formParams.newForm),
                    page.waitForNavigation({ waitUntil: 'networkidle0' }),
                ]);
                //formulario1
                yield pendingXHR.waitForAllXhrFinished();
                //Parte 1
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario1.selectIdDoc);
                yield page.select(config_json_1.default.SegurosEstado.formulario1.selectIdDoc, config_json_1.default.SegurosEstado.formulario1.idDoc);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario1.fieldNumId);
                yield page.type(config_json_1.default.SegurosEstado.formulario1.fieldNumId, config_json_1.default.SegurosEstado.formulario1.valNumId);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario1.Nom);
                yield page.type(config_json_1.default.SegurosEstado.formulario1.Nom, config_json_1.default.SegurosEstado.formulario1.NomVal);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario1.Apellido);
                yield page.type(config_json_1.default.SegurosEstado.formulario1.Apellido, config_json_1.default.SegurosEstado.formulario1.valApellido);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario1.selectGen);
                yield page.select(config_json_1.default.SegurosEstado.formulario1.selectGen, config_json_1.default.SegurosEstado.formulario1.Genero);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario1.bd);
                yield page.type(config_json_1.default.SegurosEstado.formulario1.bd, config_json_1.default.SegurosEstado.formulario1.bdval);
                yield page.select(config_json_1.default.SegurosEstado.formulario1.estadoCivil, config_json_1.default.SegurosEstado.formulario1.estadoCival);
                yield page.select(config_json_1.default.SegurosEstado.formulario1.trabajo, config_json_1.default.SegurosEstado.formulario1.trabajoIn);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario1.emailField);
                yield page.type(config_json_1.default.SegurosEstado.formulario1.emailField, config_json_1.default.SegurosEstado.formulario1.emailAddress);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario1.tel);
                yield page.type(config_json_1.default.SegurosEstado.formulario1.tel, config_json_1.default.SegurosEstado.formulario1.telNumber);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario1.direccion);
                yield page.type(config_json_1.default.SegurosEstado.formulario1.direccion, config_json_1.default.SegurosEstado.formulario1.direccionNumber);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario1.direccion);
                yield page.type(config_json_1.default.SegurosEstado.formulario1.direccion, config_json_1.default.SegurosEstado.formulario1.direccionNumber);
                //Parte 2 
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario1.secondpart);
                yield page.click(config_json_1.default.SegurosEstado.formulario1.secondpart);
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario2.selectProducto);
                yield page.select(config_json_1.default.SegurosEstado.formulario2.selectProducto, config_json_1.default.SegurosEstado.formulario2.valueProducto);
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario2.zonaCirculacion);
                yield page.evaluate((conf) => {
                    document.querySelector(conf.formulario2.zonaCirculacion).value = conf.formulario2.zonaValue;
                }, config_json_1.default.SegurosEstado);
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario2.marca);
                yield page.type(config_json_1.default.SegurosEstado.formulario2.marca, config_json_1.default.SegurosEstado.formulario2.marcaValue);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario2.clase);
                yield page.type(config_json_1.default.SegurosEstado.formulario2.clase, config_json_1.default.SegurosEstado.formulario2.claseValue);
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario2.placa);
                yield page.type(config_json_1.default.SegurosEstado.formulario2.placa, config_json_1.default.SegurosEstado.formulario2.placaIn);
                yield pendingXHR.waitForAllXhrFinished();
                //Parte 3 
                yield page.waitForSelector(config_json_1.default.SegurosEstado.formulario2.thirdPart);
                yield page.click(config_json_1.default.SegurosEstado.formulario2.thirdPart);
                yield pendingXHR.waitForAllXhrFinished();
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
