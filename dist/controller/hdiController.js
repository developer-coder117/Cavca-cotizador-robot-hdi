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
const scraperUtils_2 = require("../utils/scraperUtils");
function hdi(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({
            headless: false,
            slowMo: 30
        });
        const page = yield browser.newPage();
        yield page.goto(data.HDI.url);
        yield page.setViewport({
            width: 1080,
            height: 720
        });
        //Login
        try {
            yield page.type(data.HDI.login.input.user, data.HDI.credentials.user);
            yield page.type(data.HDI.login.input.password, data.HDI.credentials.pass);
            yield page.click(data.HDI.login.input.btn);
            console.log("Scraper HDI : fin Login");
            //menu
            yield console.log("Scraper HDI : entrando a menu");
            yield page.waitFor(500 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.menus.intermediario.cmb);
            yield page.click(data.HDI.menus.intermediario.cmb);
            yield console.log("Scraper HDI : Seleccionando intermediario");
            yield page.select(data.HDI.menus.intermediario.cmb, data.HDI.menus.intermediario.cmbSelect);
            yield page.waitForSelector(data.HDI.menus.intermediario.cmb);
            yield page.click(data.HDI.menus.intermediario.cmb);
            yield console.log("Scraper HDI : Intermediario seleccionado");
            yield page.waitFor(500 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.menus.intermediario.btn);
            yield page.click(data.HDI.menus.intermediario.btn);
            yield console.log("Scraper HDI : Submit exitoso en intermediario");
            yield page.waitFor(500 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.menus.polizaElec);
            yield page.click(data.HDI.menus.polizaElec);
            yield page.waitForSelector(data.HDI.menus.opSol);
            yield page.click(data.HDI.menus.opSol);
            yield page.waitFor(500 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.menus.cexped);
            yield page.click(data.HDI.menus.cexped);
            yield page.waitForSelector(data.HDI.menus.cotizacion);
            yield page.click(data.HDI.menus.cotizacion);
            yield page.waitFor(800 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.menus.nuevoCexped);
            yield page.click(data.HDI.menus.nuevoCexped);
            yield console.log("Scraper HDI : Saliendo menu");
            //cotizacion
            //encabezado
            yield console.log("Scraper HDI : Ingreando Formulario");
            yield page.waitFor(800 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.encabezadoBtn);
            yield page.click(data.HDI.cotizacion.encabezadoBtn);
            //intermediario
            yield page.waitFor(800 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.Intermediario.txtComision);
            yield page.type(data.HDI.cotizacion.Intermediario.txtComision, data.HDI.cotizacion.Intermediario.valorCot);
            yield console.log("Scraper HDI : Intermediario seleccionando comision");
            yield page.waitFor(800 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.Intermediario.btnCont);
            yield page.click(data.HDI.cotizacion.Intermediario.btnCont);
            //asegurado
            yield page.waitFor(3000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.asegurado.lblAsegurado);
            yield page.click(data.HDI.cotizacion.asegurado.lblAsegurado);
            yield page.waitFor(1000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.asegurado.cmbTipoDoc);
            yield page.click(data.HDI.cotizacion.asegurado.cmbTipoDoc);
            yield page.select(data.HDI.cotizacion.asegurado.cmbTipoDoc, data.HDI.cotizacion.asegurado.cmbSelect);
            yield page.waitForSelector(data.HDI.cotizacion.asegurado.cmbTipoDoc);
            yield page.click(data.HDI.cotizacion.asegurado.cmbTipoDoc);
            yield page.waitFor(1200 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.asegurado.txtNumDoc);
            yield page.type(data.HDI.cotizacion.asegurado.txtNumDoc, data.HDI.cotizacion.asegurado.nDocumentoIn);
            yield page.waitFor(500 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.asegurado.estrato);
            yield page.click(data.HDI.cotizacion.asegurado.estrato);
            yield page.waitFor(3000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.asegurado.estrato);
            yield page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.asegurado.estrato).value = conf.cotizacion.asegurado.estratoSelect;
            }, data.HDI);
            yield page.waitFor(1000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.asegurado.nivelEduc);
            yield page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.asegurado.nivelEduc).value = conf.cotizacion.asegurado.nivelEducSelect;
            }, data.HDI);
            if (scraperUtils_2.Comparacion(data.HDI.cotizacion.asegurado.rbMasculino, "Masculino") == true) {
                yield page.waitFor(3000 + scraperUtils_1.RandomizeWaits());
                yield page.waitForSelector(data.HDI.cotizacion.asegurado.rbMasculino);
                yield page.evaluate((data) => {
                    document.querySelector(data.HDI.cotizacion.asegurado.rbMasculino).checked = true;
                }, data);
            }
            else {
                yield page.waitFor(3000 + scraperUtils_1.RandomizeWaits());
                yield page.waitForSelector(data.HDI.cotizacion.asegurado.rbFemenino);
                yield page.evaluate((data) => {
                    document.querySelector(data.HDI.cotizacion.asegurado.rbFemenino).checked = true;
                }, data);
            }
            yield page.waitFor(5000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.asegurado.txtFechaNac);
            yield page.evaluate((data) => {
                document.querySelector(data.HDI.cotizacion.asegurado.txtFechaNac).value = "17/07/2000";
            }, data);
            //        await page.waitFor(1000 + RandomizeWaits())
            //        await page.waitForSelector(data.HDI.cotizacion.asegurado.txtEdad)
            //        await page.evaluate((data.HDI, datosCrm) => {
            //            document.querySelector(data.HDI.cotizacion.asegurado.txtEdad).value = datosCrm.cliente.edad;
            //        }, data.HDI, datosCrm)
            yield page.waitFor(500 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.asegurado.btn);
            yield page.click(data.HDI.cotizacion.asegurado.btn);
            yield page.waitFor(800 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.txtPlaca);
            yield page.type(data.HDI.cotizacion.autos.txtPlaca, data.HDI.cotizacion.autos.txtPlacaIn); //placa: 'EJY025'
            console.log('Placa : ', data.HDI.cotizacion.autos.txtPlacaIn);
            // let anio = String(data.HDI.cotizacion.autos.txtAnioDefault)
            // anio = anio.substr(0, 4)
            yield page.waitFor(1000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbModelo);
            yield page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbModelo).value = conf.cotizacion.autos.ModeloIn;
            }, data.HDI);
            console.log('Modelo : ', data.HDI.cotizacion.autos.ModeloIn);
            yield page.waitFor(1000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.txtFasecolda);
            yield page.type(data.HDI.cotizacion.autos.txtFasecolda, data.HDI.cotizacion.autos.txtFasecoldaIn);
            yield page.waitFor(1000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbMarca);
            yield page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbMarca).value = conf.cotizacion.autos.MarcaCmb;
            }, data.HDI);
            yield page.waitFor(3000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbDptoCirculacion);
            yield page.click(data.HDI.cotizacion.autos.cmbDptoCirculacion);
            yield page.waitFor(1000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbDptoCirculacion);
            yield page.click(data.HDI.cotizacion.autos.cmbDptoCirculacion);
            yield page.select(data.HDI.cotizacion.autos.cmbDptoCirculacion, data.HDI.cotizacion.autos.dptoCirculacionSelect);
            yield page.waitFor(1000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbClase);
            yield page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbClase).value = conf.cotizacion.autos.claseCmb;
            }, data.HDI);
            yield page.waitFor(10000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo);
            yield page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
            }, data.HDI);
            console.log("Scraper HDI : Timeout espere...");
            yield page.waitFor(4000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo);
            yield page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
            }, data.HDI);
            console.log("Scraper HDI : Timeout finalizado...");
            yield page.waitFor(2000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.btnCargar);
            yield page.click(data.HDI.cotizacion.autos.btnCargar);
            yield page.waitFor(2000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios);
            yield page.click(data.HDI.cotizacion.autos.cmbAnios);
            yield page.select(data.HDI.cotizacion.autos.cmbAnios, data.HDI.cotizacion.autos.aniosSelect);
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios);
            yield page.click(data.HDI.cotizacion.autos.cmbAnios);
            yield console.log("Scraper HDI : Terminando Formulario");
            yield console.log("Scraper HDI : Generando PDF");
            console.log("Scraper HDI : cargando tipo de vehiculo");
            yield page.waitFor(1000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo);
            yield page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
            }, data.HDI);
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo);
            yield page.click(data.HDI.cotizacion.autos.cmbTipo);
            yield page.select(data.HDI.cotizacion.autos.cmbTipo, data.HDI.cotizacion.autos.tipoCmbIn);
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo);
            yield page.click(data.HDI.cotizacion.autos.cmbTipo);
            console.log("Scraper HDI : cargando tipo de vehiculo seleccionado");
            yield page.waitFor(12000 + scraperUtils_1.RandomizeWaits());
            console.log("Scraper HDI :Seleccionando HDI");
            yield page.waitForSelector(data.HDI.cotizacion.autos.btnCargar);
            yield page.click(data.HDI.cotizacion.autos.btnCargar);
            console.log("HDI seleccionado");
            yield page.waitFor(2000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios);
            yield page.click(data.HDI.cotizacion.autos.cmbAnios);
            yield page.select(data.HDI.cotizacion.autos.cmbAnios, data.HDI.cotizacion.autos.aniosSelect);
            yield page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios);
            yield page.click(data.HDI.cotizacion.autos.cmbAnios);
            console.log("finalizando : HDI");
            //Crear Cotizacion
            yield page.waitFor(2000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_btnCotizar");
            yield page.click("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_btnCotizar");
            //Continuar
            yield page.waitFor(2000 + scraperUtils_1.RandomizeWaits());
            yield page.waitForSelector("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_Btn_ContinuarAutorizaciones.TextoSolicitud");
            yield page.click("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_Btn_ContinuarAutorizaciones.TextoSolicitud");
            return "Scrapper";
        }
        catch (error) {
            yield browser.close();
            console.log(error);
            throw new Error('Error scrap HDI');
        }
    });
}
exports.hdi = hdi;
