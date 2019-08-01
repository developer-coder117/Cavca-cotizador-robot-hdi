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
const scraperUtils_1 = require("../utils/scraperUtils");
const config_json_1 = __importDefault(require("../data/config.json"));
const { pendingXHR } = require('pending-xhr-puppeteer');
class MapfreBot {
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
                slowMo: 40
            });
            const page = yield browser.newPage();
            yield page.goto(config_json_1.default.MAPFRE.url);
            yield page.setViewport({
                width: 1200,
                height: 900
            });
            //login
            yield console.log("Scraper Mapfre : ingresando a login");
            yield page.waitForSelector(config_json_1.default.MAPFRE.login.user);
            yield page.type(config_json_1.default.MAPFRE.login.user, config_json_1.default.MAPFRE.credentials.user);
            yield page.waitForSelector(config_json_1.default.MAPFRE.login.pass);
            yield page.type(config_json_1.default.MAPFRE.login.pass, config_json_1.default.MAPFRE.credentials.pass);
            yield page.click(config_json_1.default.MAPFRE.login.submitBtn);
            yield console.log("Scraper Mapfre : Termino de login");
            //Elegir seguro        
            //menú principal
            try {
                yield pendingXHR.waitForAllXhrFinished();
                yield console.log("Scraper Mapfre : Ingresando al menu");
                yield console.log("Scraper Mapfre : Buscando selector...");
                yield page.waitForSelector(config_json_1.default.MAPFRE.menuPrincipal.cotizar1);
                yield console.log("Scraper Mapfre : Selector encontrado...");
                yield page.click(config_json_1.default.MAPFRE.menuPrincipal.cotizar1);
                yield console.log("Scraper Mapfre : Desplegando menu...");
                yield console.log("Scraper Mapfre : Buscando selector...");
                yield page.waitForSelector(config_json_1.default.MAPFRE.menuPrincipal.cotizar2);
                yield console.log("Scraper Mapfre : Selector encontrado...");
                yield page.click(config_json_1.default.MAPFRE.menuPrincipal.cotizar2);
                yield console.log("Scraper Mapfre : Accediendo...");
                yield console.log("Scraper Mapfre : Seleccionando tipo de seguro");
                yield page.waitFor(10000);
                yield page.waitForSelector(config_json_1.default.MAPFRE.TipoSeguros.checkSuperTrebol);
                yield page.click(config_json_1.default.MAPFRE.TipoSeguros.checkSuperTrebol);
                yield console.log("Scraper Mapfre : Confirmando tipo de seguro... ");
                yield page.click(config_json_1.default.MAPFRE.TipoSeguros.btnCotizar);
            }
            catch (e) {
                yield page.keyboard.press('Enter');
                console.log(e);
                yield browser.close();
                throw new Error('Error scrap Mapfre');
            }
            //seguros a elegir
            yield page.waitForSelector(config_json_1.default.MAPFRE.TipoSeguros.checkSuperTrebol);
            yield page.click(config_json_1.default.MAPFRE.TipoSeguros.checkSuperTrebol);
            yield page.waitForSelector(config_json_1.default.MAPFRE.TipoSeguros.btnCotizar);
            yield page.click(config_json_1.default.MAPFRE.TipoSeguros.btnCotizar);
            //cotizacion
            //datos del seguro
            yield page.waitFor(2000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datoSeguro.txtPlaca);
            yield page.type(config_json_1.default.MAPFRE.cotizacion.datoSeguro.txtPlaca, config_json_1.default.MAPFRE.cotizacion.datoSeguro.txtPlacaIn);
            yield page.waitForSelector('body');
            yield page.click('body');
            yield page.waitFor(7000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datoSeguro.cmbOficina);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datoSeguro.cmbOficina);
            yield page.select(config_json_1.default.MAPFRE.cotizacion.datoSeguro.cmbOficina, config_json_1.default.MAPFRE.cotizacion.datoSeguro.oficinaSelected);
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datoSeguro.cmbOficina);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datoSeguro.cmbOficina);
            //datos del riesgo
            let fechaNac = config_json_1.default.MAPFRE.cotizacion.datosRiesgo.txtFechaNac;
            fechaNac = fechaNac.replace("/", "");
            fechaNac = fechaNac.replace("/", "");
            yield page.waitFor(6000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.txtFechaNac);
            yield page.type(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.txtFechaNac, config_json_1.default.MAPFRE.cotizacion.datosRiesgo.txtFecNacValue);
            yield page.waitForSelector('body');
            yield page.click('body');
            yield page.waitFor(5000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbGenero);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbGenero);
            //await page.select(data.MAPFRE.cotizacion.datosRiesgo.cmbGenero, genero)
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbGenero);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbGenero);
            yield page.waitFor(5000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbNumHijos);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbNumHijos);
            yield page.select(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbNumHijos, config_json_1.default.MAPFRE.cotizacion.datosRiesgo.numHijos);
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbNumHijos);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbNumHijos);
            yield page.waitForSelector('body');
            yield page.click('body');
            yield page.waitFor(5000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbCiudad);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbCiudad);
            yield page.select(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbCiudad, config_json_1.default.MAPFRE.cotizacion.datosRiesgo.ciudadSelected);
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbCiudad);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbCiudad);
            yield page.waitFor(5000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbRce);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbRce);
            yield page.select(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbRce, config_json_1.default.MAPFRE.cotizacion.datosRiesgo.rceSelected);
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbRce);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbRce);
            yield page.waitFor(5000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbDeducible);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbDeducible);
            yield page.select(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbDeducible, config_json_1.default.MAPFRE.cotizacion.datosRiesgo.deducibleSelected);
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbDeducible);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.cmbDeducible);
            yield page.waitFor(5000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.btnCotizar);
            yield page.click(config_json_1.default.MAPFRE.cotizacion.datosRiesgo.btnCotizar);
            //resultados -- tabla
            yield page.waitFor(20000 + scraperUtils_1.RandomizeWaits());
            let valorCot = "10000"; //await page.$eval(data.MAPFRE.resultados.valorCot, item => item.innerText);
            valorCot = valorCot.replace(".", "");
            valorCot = valorCot.replace(".", "");
            console.log(valorCot);
            yield page.waitFor(1000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(config_json_1.default.MAPFRE.resultados.caratula);
            yield page.click(config_json_1.default.MAPFRE.resultados.caratula);
            yield console.log("Scraper Mapfre : Termino de formulario");
            //pdf
            yield console.log("Scraper Mapfre : Generando FDF");
            yield page.waitFor(10000 + scraperUtils_1.RandomizeWaits());
            let pages = yield browser.pages();
            yield pages[2].waitFor(6000 + scraperUtils_1.RandomizeWaits());
            yield pages[2].waitForSelector(config_json_1.default.MAPFRE.resultados.btnDescargar);
            yield pages[2].click(config_json_1.default.MAPFRE.resultados.btnDescargar);
            yield console.log("Scraper Mapfre : PDF Generado");
            let retorno = {
                "value": `${valorCot}`
            };
            yield pages[2].waitFor(15000 + scraperUtils_1.RandomizeWaits());
            yield browser.close();
        });
    }
}
exports.MapfreBot = MapfreBot;
