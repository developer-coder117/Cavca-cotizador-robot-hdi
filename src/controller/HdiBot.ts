import puppeteer from 'puppeteer';
import { Comparacion } from '../utils/scraperUtils';
import data from '../data/config.json'
import { GlobalFunction } from './GlobalFunction'

const { PendingXHR } = require('pending-xhr-puppeteer');

export class HdiBot implements GlobalFunction {
    public login(): Promise<void> {
        throw new Error("Method not implemented.");
    } public verify(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async cotizar() {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 30
        });
        const page = await browser.newPage();
        await page.goto(data.HDI.url);
        await page.setViewport({
            width: 1080,
            height: 720
        })
        const pendingXHR = new PendingXHR(page);
        try {
            //Login
            console.log("Scraper HDI : ingresando a login")
            await page.type(data.HDI.login.input.user, data.HDI.credentials.user)
            await page.type(data.HDI.login.input.password, data.HDI.credentials.pass)
            await page.click(data.HDI.login.input.btn)
            console.log("Scraper HDI : fin Login");
            //menu
            await console.log("Scraper HDI : entrando a menu");
            await page.waitForSelector(data.HDI.menus.intermediario.cmb)
            await page.click(data.HDI.menus.intermediario.cmb)
            await console.log("Scraper HDI : Seleccionando intermediario");
            await page.select(data.HDI.menus.intermediario.cmb, data.HDI.menus.intermediario.cmbSelect)
            await console.log("Scraper HDI : Seleccionando intermediario");
            await page.waitForSelector(data.HDI.menus.intermediario.cmb)
            await page.click(data.HDI.menus.intermediario.cmb)
            await console.log("Scraper HDI : Intermediario seleccionado");
            
            await page.waitForSelector(data.HDI.menus.intermediario.btn)
            await page.click(data.HDI.menus.intermediario.btn)
            await console.log("Scraper HDI : Submit exitoso en intermediario");
            await page.waitForSelector(data.HDI.menus.polizaElec)
            await page.click(data.HDI.menus.polizaElec)
            await console.log("Scraper HDI : Confirmando datos...");
            await page.waitForSelector(data.HDI.menus.opSol)
            await page.click(data.HDI.menus.opSol)
            console.log("Scraper HDI : Accediendo al Cexped")
            await page.waitForSelector(data.HDI.menus.cexped)
            await page.click(data.HDI.menus.cexped)
            console.log("Scraper HDI : Accediendo a cotizacion")
            await page.waitForSelector(data.HDI.menus.cotizacion)
            await page.click(data.HDI.menus.cotizacion)

            await console.log("Scraper HDI : Accediendo al nuevo cexped")
            await page.waitForSelector(data.HDI.menus.nuevoCexped)
            await page.click(data.HDI.menus.nuevoCexped)
            await console.log("Scraper HDI : Saliendo menu");

            //cotizacion
            //encabezado
            await console.log("Scraper HDI : Ingreando Formulario");
            await page.waitForSelector(data.HDI.cotizacion.encabezadoBtn)
            await page.click(data.HDI.cotizacion.encabezadoBtn)
            await console.log("Scraper HDI : Confirmando");
            //intermediario
            await console.log("Scraper HDI : Comision del intermediario -> 18.5");
            await page.waitForSelector(data.HDI.cotizacion.Intermediario.txtComision)
            await page.type(data.HDI.cotizacion.Intermediario.txtComision, data.HDI.cotizacion.Intermediario.valorCot)
            //await page.waitFor(2000)
            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await console.log("Scraper HDI : Intermediario seleccionando comision");
            await page.waitForSelector(data.HDI.cotizacion.Intermediario.btnCont)
            await page.click(data.HDI.cotizacion.Intermediario.btnCont)
            //transicion de dos segundos en el menu desplegable
            await page.waitFor(500)
            //asegurado
            await console.log("Scraper HDI : Esperando...");
            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await console.log("Scraper HDI : Seleccionando tipo de documento");
            await page.waitForSelector(data.HDI.cotizacion.asegurado.lblAsegurado)
            await page.click(data.HDI.cotizacion.asegurado.lblAsegurado)
            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await console.log("Scraper HDI : Tipo de documento...");
            await page.waitForSelector(data.HDI.cotizacion.asegurado.cmbTipoDoc)
            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await console.log("Scraper HDI : Evaluando campos");
            await page.click(data.HDI.cotizacion.asegurado.cmbTipoDoc)
            await page.select(data.HDI.cotizacion.asegurado.cmbTipoDoc, data.HDI.cotizacion.asegurado.cmbSelect)
            await page.waitForSelector(data.HDI.cotizacion.asegurado.cmbTipoDoc)
            await console.log("Scraper HDI : Tipo de documento seleccionando");
            await page.click(data.HDI.cotizacion.asegurado.cmbTipoDoc)
            await console.log("Scraper HDI : Confirmando eleccion");
            await console.log("Scraper HDI : espere...");
            await console.log("Scraper HDI : Ingreando numero de documento");
            await page.waitForSelector(data.HDI.cotizacion.asegurado.txtNumDoc)
            await console.log("Scraper HDI : Escribiendo");
            await page.type(data.HDI.cotizacion.asegurado.txtNumDoc, data.HDI.cotizacion.asegurado.nDocumentoIn)
            await console.log("Scraper HDI : Campo completo espere...");
            await console.log("Scraper HDI : Seleccionando estrato");
            await page.waitForSelector(data.HDI.cotizacion.asegurado.estrato)
            await page.click(data.HDI.cotizacion.asegurado.estrato)
            await console.log("Scraper HDI : Estrato seleccionado");
            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await page.waitForSelector(data.HDI.cotizacion.asegurado.estrato)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.asegurado.estrato).value = conf.cotizacion.asegurado.estratoSelect;
            }, data.HDI)

            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await page.waitForSelector(data.HDI.cotizacion.asegurado.nivelEduc)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.asegurado.nivelEduc).value = conf.cotizacion.asegurado.nivelEducSelect;
            }, data.HDI)

            if (Comparacion(data.HDI.cotizacion.asegurado.rbMasculino, "Masculino") == true) {

                await page.waitForSelector(data.HDI.cotizacion.asegurado.rbMasculino)
                await page.evaluate((data) => {
                    document.querySelector(data.HDI.cotizacion.asegurado.rbMasculino).checked = true;
                }, data)
            } else {
                await page.waitForSelector(data.HDI.cotizacion.asegurado.rbFemenino)
                await page.evaluate((data) => {
                    document.querySelector(data.HDI.cotizacion.asegurado.rbFemenino).checked = true;
                }, data)
            }

            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await page.waitForSelector(data.HDI.cotizacion.asegurado.txtFechaNac)
            await page.evaluate((data) => {
                document.querySelector(data.HDI.cotizacion.asegurado.txtFechaNac).value = "17/07/2000";
            }, data)

            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await page.waitForSelector(data.HDI.cotizacion.asegurado.btn)
            await page.click(data.HDI.cotizacion.asegurado.btn)

            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await page.waitForSelector(data.HDI.cotizacion.autos.txtPlaca)
            await page.type(data.HDI.cotizacion.autos.txtPlaca, data.HDI.cotizacion.autos.txtPlacaIn) //placa: 'EJY025'
            console.log('Placa : ', data.HDI.cotizacion.autos.txtPlacaIn);

            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbModelo)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbModelo).value = conf.cotizacion.autos.ModeloIn;
            }, data.HDI)
            console.log('Modelo : ', data.HDI.cotizacion.autos.ModeloIn);
            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await page.waitForSelector(data.HDI.cotizacion.autos.txtFasecolda)
            await page.type(data.HDI.cotizacion.autos.txtFasecolda, data.HDI.cotizacion.autos.txtFasecoldaIn)

            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbMarca)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbMarca).value = conf.cotizacion.autos.MarcaCmb;
            }, data.HDI)

            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbDptoCirculacion)
            await page.click(data.HDI.cotizacion.autos.cmbDptoCirculacion)

            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbDptoCirculacion)
            await page.click(data.HDI.cotizacion.autos.cmbDptoCirculacion)
            await page.select(data.HDI.cotizacion.autos.cmbDptoCirculacion, data.HDI.cotizacion.autos.dptoCirculacionSelect)

            //wait for xhr request to be finished... 
            await pendingXHR.waitForAllXhrFinished();
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbClase)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbClase).value = conf.cotizacion.autos.claseCmb;
            }, data.HDI)

            await page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
            }, data.HDI)
            console.log("Scraper HDI : Timeout espere...")
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
            }, data.HDI)
            console.log("Scraper HDI : Timeout finalizado...")
            await page.waitForSelector(data.HDI.cotizacion.autos.btnCargar)
            await page.click(data.HDI.cotizacion.autos.btnCargar)
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios)
            await page.click(data.HDI.cotizacion.autos.cmbAnios)
            await page.select(data.HDI.cotizacion.autos.cmbAnios, data.HDI.cotizacion.autos.aniosSelect)
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios)
            await page.click(data.HDI.cotizacion.autos.cmbAnios)
            await console.log("Scraper HDI : Terminando Formulario");
            await console.log("Scraper HDI : Generando PDF");
            console.log("Scraper HDI : cargando tipo de vehiculo")
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
            }, data.HDI)
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo)
            await page.click(data.HDI.cotizacion.autos.cmbTipo)
            await page.select(data.HDI.cotizacion.autos.cmbTipo, data.HDI.cotizacion.autos.tipoCmbIn)
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo)
            await page.click(data.HDI.cotizacion.autos.cmbTipo)
            console.log("Scraper HDI : cargando tipo de vehiculo seleccionado")
            console.log("Scraper HDI : Seleccionando HDI")
            await page.waitForSelector(data.HDI.cotizacion.autos.btnCargar)
            await page.click(data.HDI.cotizacion.autos.btnCargar)
            console.log("HDI seleccionado")
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios)
            await page.click(data.HDI.cotizacion.autos.cmbAnios)
            await page.select(data.HDI.cotizacion.autos.cmbAnios, data.HDI.cotizacion.autos.aniosSelect)
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios)
            await page.click(data.HDI.cotizacion.autos.cmbAnios)
            console.log("finalizando : HDI")
            //Crear Cotizacion
            console.log("Scraper HDI : Cotizando valor del auto")
            await page.waitForSelector("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_btnCotizar")
            await page.click("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_btnCotizar")
            //Continuar
            await page.waitForSelector("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_Btn_ContinuarAutorizaciones.TextoSolicitud")
            await page.click("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_Btn_ContinuarAutorizaciones.TextoSolicitud")
            const element = await page.$("#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_txtVlrTotal");
            const elValue = await page.evaluate(element => element.textContent, element);
            console.log("Valor total => ", elValue)
        } catch (error) {
            await browser.close();
            console.log(error);
            throw new Error('Error scrap HDI')
        }

    }
}