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
const { PendingXHR } = require('pending-xhr-puppeteer');
class HdiBot {
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
            yield page.goto(config_json_1.default.HDI.url);
            yield page.setViewport({
                width: 1080,
                height: 720
            });
            const pendingXHR = new PendingXHR(page);
            try {
                //Login
                console.log("Scraper HDI : ingresando a login");
                yield page.type(config_json_1.default.HDI.login.input.user, config_json_1.default.HDI.credentials.user);
                yield page.type(config_json_1.default.HDI.login.input.password, config_json_1.default.HDI.credentials.pass);
                yield page.click(config_json_1.default.HDI.login.input.btn);
                console.log("Scraper HDI : fin Login");
                //menu
                yield console.log("Scraper HDI : entrando a menu");
                yield page.waitForSelector(config_json_1.default.HDI.menus.intermediario.cmb);
                yield page.click(config_json_1.default.HDI.menus.intermediario.cmb);
                yield console.log("Scraper HDI : Seleccionando intermediario");
                yield page.select(config_json_1.default.HDI.menus.intermediario.cmb, config_json_1.default.HDI.menus.intermediario.cmbSelect);
                yield console.log("Scraper HDI : Seleccionando intermediario");
                yield page.waitForSelector(config_json_1.default.HDI.menus.intermediario.cmb);
                yield page.click(config_json_1.default.HDI.menus.intermediario.cmb);
                yield console.log("Scraper HDI : Intermediario seleccionado");
                yield page.waitForSelector(config_json_1.default.HDI.menus.intermediario.btn);
                yield page.click(config_json_1.default.HDI.menus.intermediario.btn);
                yield console.log("Scraper HDI : Submit exitoso en intermediario");
                yield page.waitForSelector(config_json_1.default.HDI.menus.polizaElec);
                yield page.click(config_json_1.default.HDI.menus.polizaElec);
                yield console.log("Scraper HDI : Confirmando datos...");
                yield page.waitForSelector(config_json_1.default.HDI.menus.opSol);
                yield page.click(config_json_1.default.HDI.menus.opSol);
                console.log("Scraper HDI : Accediendo al Cexped");
                yield page.waitForSelector(config_json_1.default.HDI.menus.cexped);
                yield page.click(config_json_1.default.HDI.menus.cexped);
                console.log("Scraper HDI : Accediendo a cotizacion");
                yield page.waitForSelector(config_json_1.default.HDI.menus.cotizacion);
                yield page.click(config_json_1.default.HDI.menus.cotizacion);
                yield console.log("Scraper HDI : Accediendo al nuevo cexped");
                yield page.waitForSelector(config_json_1.default.HDI.menus.nuevoCexped);
                yield page.click(config_json_1.default.HDI.menus.nuevoCexped);
                yield console.log("Scraper HDI : Saliendo menu");
                //cotizacion
                //encabezado
                yield console.log("Scraper HDI : Ingreando Formulario");
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.encabezadoBtn);
                yield page.click(config_json_1.default.HDI.cotizacion.encabezadoBtn);
                yield console.log("Scraper HDI : Confirmando");
                //intermediario
                yield console.log("Scraper HDI : Comision del intermediario -> 18.5");
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.Intermediario.txtComision);
                yield page.type(config_json_1.default.HDI.cotizacion.Intermediario.txtComision, config_json_1.default.HDI.cotizacion.Intermediario.valorCot);
                //await page.waitFor(2000)
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield console.log("Scraper HDI : Intermediario seleccionando comision");
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.Intermediario.btnCont);
                yield page.click(config_json_1.default.HDI.cotizacion.Intermediario.btnCont);
                //transicion de dos segundos en el menu desplegable
                yield page.waitFor(500);
                //asegurado
                yield console.log("Scraper HDI : Esperando...");
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield console.log("Scraper HDI : Seleccionando tipo de documento");
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.asegurado.lblAsegurado);
                yield page.click(config_json_1.default.HDI.cotizacion.asegurado.lblAsegurado);
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield console.log("Scraper HDI : Tipo de documento...");
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.asegurado.cmbTipoDoc);
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield console.log("Scraper HDI : Evaluando campos");
                yield page.click(config_json_1.default.HDI.cotizacion.asegurado.cmbTipoDoc);
                yield page.select(config_json_1.default.HDI.cotizacion.asegurado.cmbTipoDoc, config_json_1.default.HDI.cotizacion.asegurado.cmbSelect);
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.asegurado.cmbTipoDoc);
                yield console.log("Scraper HDI : Tipo de documento seleccionando");
                yield page.click(config_json_1.default.HDI.cotizacion.asegurado.cmbTipoDoc);
                yield console.log("Scraper HDI : Confirmando eleccion");
                yield console.log("Scraper HDI : espere...");
                yield console.log("Scraper HDI : Ingreando numero de documento");
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.asegurado.txtNumDoc);
                yield console.log("Scraper HDI : Escribiendo");
                yield page.type(config_json_1.default.HDI.cotizacion.asegurado.txtNumDoc, config_json_1.default.HDI.cotizacion.asegurado.nDocumentoIn);
                yield console.log("Scraper HDI : Campo completo espere...");
                yield console.log("Scraper HDI : Seleccionando estrato");
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.asegurado.estrato);
                yield page.click(config_json_1.default.HDI.cotizacion.asegurado.estrato);
                yield console.log("Scraper HDI : Estrato seleccionado");
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.asegurado.estrato);
                yield page.evaluate((conf) => {
                    document.querySelector(conf.cotizacion.asegurado.estrato).value = conf.cotizacion.asegurado.estratoSelect;
                }, config_json_1.default.HDI);
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.asegurado.nivelEduc);
                yield page.evaluate((conf) => {
                    document.querySelector(conf.cotizacion.asegurado.nivelEduc).value = conf.cotizacion.asegurado.nivelEducSelect;
                }, config_json_1.default.HDI);
                if (scraperUtils_1.Comparacion(config_json_1.default.HDI.cotizacion.asegurado.rbMasculino, "Masculino") == true) {
                    yield page.waitForSelector(config_json_1.default.HDI.cotizacion.asegurado.rbMasculino);
                    yield page.evaluate((data) => {
                        document.querySelector(data.HDI.cotizacion.asegurado.rbMasculino).checked = true;
                    }, config_json_1.default);
                }
                else {
                    yield page.waitForSelector(config_json_1.default.HDI.cotizacion.asegurado.rbFemenino);
                    yield page.evaluate((data) => {
                        document.querySelector(data.HDI.cotizacion.asegurado.rbFemenino).checked = true;
                    }, config_json_1.default);
                }
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.asegurado.txtFechaNac);
                yield page.evaluate((data) => {
                    document.querySelector(data.HDI.cotizacion.asegurado.txtFechaNac).value = "17/07/2000";
                }, config_json_1.default);
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.asegurado.btn);
                yield page.click(config_json_1.default.HDI.cotizacion.asegurado.btn);
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.txtPlaca);
                yield page.type(config_json_1.default.HDI.cotizacion.autos.txtPlaca, config_json_1.default.HDI.cotizacion.autos.txtPlacaIn); //placa: 'EJY025'
                console.log('Placa : ', config_json_1.default.HDI.cotizacion.autos.txtPlacaIn);
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbModelo);
                yield page.evaluate((conf) => {
                    document.querySelector(conf.cotizacion.autos.cmbModelo).value = conf.cotizacion.autos.ModeloIn;
                }, config_json_1.default.HDI);
                console.log('Modelo : ', config_json_1.default.HDI.cotizacion.autos.ModeloIn);
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.txtFasecolda);
                yield page.type(config_json_1.default.HDI.cotizacion.autos.txtFasecolda, config_json_1.default.HDI.cotizacion.autos.txtFasecoldaIn);
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbMarca);
                yield page.evaluate((conf) => {
                    document.querySelector(conf.cotizacion.autos.cmbMarca).value = conf.cotizacion.autos.MarcaCmb;
                }, config_json_1.default.HDI);
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbDptoCirculacion);
                yield page.click(config_json_1.default.HDI.cotizacion.autos.cmbDptoCirculacion);
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbDptoCirculacion);
                yield page.click(config_json_1.default.HDI.cotizacion.autos.cmbDptoCirculacion);
                yield page.select(config_json_1.default.HDI.cotizacion.autos.cmbDptoCirculacion, config_json_1.default.HDI.cotizacion.autos.dptoCirculacionSelect);
                //wait for xhr request to be finished... 
                yield pendingXHR.waitForAllXhrFinished();
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbClase);
                yield page.evaluate((conf) => {
                    document.querySelector(conf.cotizacion.autos.cmbClase).value = conf.cotizacion.autos.claseCmb;
                }, config_json_1.default.HDI);
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbTipo);
                yield page.evaluate((conf) => {
                    document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
                }, config_json_1.default.HDI);
                console.log("Scraper HDI : Timeout espere...");
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbTipo);
                yield page.evaluate((conf) => {
                    document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
                }, config_json_1.default.HDI);
                console.log("Scraper HDI : Timeout finalizado...");
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.btnCargar);
                yield page.click(config_json_1.default.HDI.cotizacion.autos.btnCargar);
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbAnios);
                yield page.click(config_json_1.default.HDI.cotizacion.autos.cmbAnios);
                yield page.select(config_json_1.default.HDI.cotizacion.autos.cmbAnios, config_json_1.default.HDI.cotizacion.autos.aniosSelect);
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbAnios);
                yield page.click(config_json_1.default.HDI.cotizacion.autos.cmbAnios);
                yield console.log("Scraper HDI : Terminando Formulario");
                yield console.log("Scraper HDI : Generando PDF");
                console.log("Scraper HDI : cargando tipo de vehiculo");
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbTipo);
                yield page.evaluate((conf) => {
                    document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
                }, config_json_1.default.HDI);
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbTipo);
                yield page.click(config_json_1.default.HDI.cotizacion.autos.cmbTipo);
                yield page.select(config_json_1.default.HDI.cotizacion.autos.cmbTipo, config_json_1.default.HDI.cotizacion.autos.tipoCmbIn);
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbTipo);
                yield page.click(config_json_1.default.HDI.cotizacion.autos.cmbTipo);
                console.log("Scraper HDI : cargando tipo de vehiculo seleccionado");
                console.log("Scraper HDI : Seleccionando HDI");
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.btnCargar);
                yield page.click(config_json_1.default.HDI.cotizacion.autos.btnCargar);
                console.log("HDI seleccionado");
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbAnios);
                yield page.click(config_json_1.default.HDI.cotizacion.autos.cmbAnios);
                yield page.select(config_json_1.default.HDI.cotizacion.autos.cmbAnios, config_json_1.default.HDI.cotizacion.autos.aniosSelect);
                yield page.waitForSelector(config_json_1.default.HDI.cotizacion.autos.cmbAnios);
                yield page.click(config_json_1.default.HDI.cotizacion.autos.cmbAnios);
                console.log("finalizando : HDI");
                //Crear Cotizacion
                console.log("Scraper HDI : Cotizando valor del auto");
                yield page.waitForSelector("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_btnCotizar");
                yield page.click("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_btnCotizar");
                //Continuar
                yield page.waitForSelector("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_Btn_ContinuarAutorizaciones.TextoSolicitud");
                yield page.click("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_Btn_ContinuarAutorizaciones.TextoSolicitud");
                const element = yield page.$("#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_txtVlrTotal");
                const elValue = yield page.evaluate(element => element.textContent, element);
                console.log("Valor total => ", elValue);
            }
            catch (error) {
                yield browser.close();
                console.log(error);
                throw new Error('Error scrap HDI');
            }
        });
    }
}
exports.HdiBot = HdiBot;
