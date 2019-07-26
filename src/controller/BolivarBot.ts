import puppeteer from 'puppeteer';
import {RandomizeWaits} from '../utils/scraperUtils';
import {Comparacion} from '../utils/scraperUtils';
import data from '../data/config.json'
import {GlobalFunction} from './GlobalFunction'

export class BolivarBot  implements GlobalFunction {
    public login(): Promise<void> {
        throw new Error("Method not implemented.");
    }    public verify(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async cotizar() {
            const browser = await puppeteer.launch({
                headless:false,
                slowMo:30
            });
            const page = await browser.newPage();
            await page.goto(data.HDI.url);
            await page.setViewport({
                width: 1080,
                height: 720
            })
            //Login
            try {
                await page.type(data.HDI.login.input.user, data.HDI.credentials.user)
                await page.type(data.HDI.login.input.password, data.HDI.credentials.pass)
                await page.click(data.HDI.login.input.btn)
                console.log("Scraper HDI : fin Login");
    
    
            //menu
            await console.log("Scraper HDI : entrando a menu");
    
            await page.waitFor(500 + RandomizeWaits())
            await page.waitForSelector(data.HDI.menus.intermediario.cmb)
            await page.click(data.HDI.menus.intermediario.cmb)
            await console.log("Scraper HDI : Seleccionando intermediario");
            await page.select(data.HDI.menus.intermediario.cmb, data.HDI.menus.intermediario.cmbSelect)
    
            await page.waitForSelector(data.HDI.menus.intermediario.cmb)
            await page.click(data.HDI.menus.intermediario.cmb)
            await console.log("Scraper HDI : Intermediario seleccionado");
    
            await page.waitFor(500 + RandomizeWaits())
            await page.waitForSelector(data.HDI.menus.intermediario.btn)
            await page.click(data.HDI.menus.intermediario.btn)
            await console.log("Scraper HDI : Submit exitoso en intermediario");
    
            await page.waitFor(500 + RandomizeWaits())
            await page.waitForSelector(data.HDI.menus.polizaElec)
            await page.click(data.HDI.menus.polizaElec)
    
            await page.waitForSelector(data.HDI.menus.opSol)
            await page.click(data.HDI.menus.opSol)
    
            await page.waitFor(500 + RandomizeWaits())
            await page.waitForSelector(data.HDI.menus.cexped)
            await page.click(data.HDI.menus.cexped)
    
            await page.waitForSelector(data.HDI.menus.cotizacion)
            await page.click(data.HDI.menus.cotizacion)
    
            await page.waitFor(800 + RandomizeWaits())
            await page.waitForSelector(data.HDI.menus.nuevoCexped)
            await page.click(data.HDI.menus.nuevoCexped)
            await console.log("Scraper HDI : Saliendo menu");
    
            //cotizacion
            //encabezado
            await console.log("Scraper HDI : Ingreando Formulario");
    
            await page.waitFor(800 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.encabezadoBtn)
            await page.click(data.HDI.cotizacion.encabezadoBtn)
    
            //intermediario
            await page.waitFor(800 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.Intermediario.txtComision)
            await page.type(data.HDI.cotizacion.Intermediario.txtComision, data.HDI.cotizacion.Intermediario.valorCot)
            await console.log("Scraper HDI : Intermediario seleccionando comision");
            await page.waitFor(800 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.Intermediario.btnCont)
            await page.click(data.HDI.cotizacion.Intermediario.btnCont)
    
            //asegurado
            await page.waitFor(3000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.asegurado.lblAsegurado)
            await page.click(data.HDI.cotizacion.asegurado.lblAsegurado)
    
            await page.waitFor(1000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.asegurado.cmbTipoDoc)
            await page.click(data.HDI.cotizacion.asegurado.cmbTipoDoc)
            await page.select(data.HDI.cotizacion.asegurado.cmbTipoDoc, data.HDI.cotizacion.asegurado.cmbSelect)
            await page.waitForSelector(data.HDI.cotizacion.asegurado.cmbTipoDoc)
            await page.click(data.HDI.cotizacion.asegurado.cmbTipoDoc)
    
            await page.waitFor(1200 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.asegurado.txtNumDoc)
            await page.type(data.HDI.cotizacion.asegurado.txtNumDoc, data.HDI.cotizacion.asegurado.nDocumentoIn)
    
            await page.waitFor(500 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.asegurado.estrato)
            await page.click(data.HDI.cotizacion.asegurado.estrato)
    
            await page.waitFor(3000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.asegurado.estrato)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.asegurado.estrato).value = conf.cotizacion.asegurado.estratoSelect;
            }, data.HDI)
    
            await page.waitFor(1000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.asegurado.nivelEduc)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.asegurado.nivelEduc).value = conf.cotizacion.asegurado.nivelEducSelect;
            }, data.HDI)
    
            if (Comparacion(data.HDI.cotizacion.asegurado.rbMasculino, "Masculino")==true){
                await page.waitFor(3000 + RandomizeWaits())
                await page.waitForSelector(data.HDI.cotizacion.asegurado.rbMasculino)
                await page.evaluate((data) => {
                    document.querySelector(data.HDI.cotizacion.asegurado.rbMasculino).checked = true;
                }, data)
            } else {
                await page.waitFor(3000 + RandomizeWaits())
                await page.waitForSelector(data.HDI.cotizacion.asegurado.rbFemenino)
                await page.evaluate((data) => {
                    document.querySelector(data.HDI.cotizacion.asegurado.rbFemenino).checked = true;
                }, data)
            }
    
            await page.waitFor(5000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.asegurado.txtFechaNac)
            await page.evaluate((data) => {
                document.querySelector(data.HDI.cotizacion.asegurado.txtFechaNac).value = "17/07/2000";
            }, data)
    
    //        await page.waitFor(1000 + RandomizeWaits())
    //        await page.waitForSelector(data.HDI.cotizacion.asegurado.txtEdad)
    //        await page.evaluate((data.HDI, datosCrm) => {
    //            document.querySelector(data.HDI.cotizacion.asegurado.txtEdad).value = datosCrm.cliente.edad;
    //        }, data.HDI, datosCrm)
    
            await page.waitFor(500 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.asegurado.btn)
            await page.click(data.HDI.cotizacion.asegurado.btn)
    
            await page.waitFor(800 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.autos.txtPlaca)
            await page.type(data.HDI.cotizacion.autos.txtPlaca, data.HDI.cotizacion.autos.txtPlacaIn) //placa: 'EJY025'
            console.log('Placa : ',data.HDI.cotizacion.autos.txtPlacaIn);
            // let anio = String(data.HDI.cotizacion.autos.txtAnioDefault)
           // anio = anio.substr(0, 4)
    
            await page.waitFor(1000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbModelo)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbModelo).value = conf.cotizacion.autos.ModeloIn;
            }, data.HDI)
            console.log('Modelo : ', data.HDI.cotizacion.autos.ModeloIn);
            await page.waitFor(1000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.autos.txtFasecolda)
            await page.type(data.HDI.cotizacion.autos.txtFasecolda, data.HDI.cotizacion.autos.txtFasecoldaIn)
    
            await page.waitFor(1000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbMarca)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbMarca).value = conf.cotizacion.autos.MarcaCmb;
            }, data.HDI)
    
            await page.waitFor(3000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbDptoCirculacion)
            await page.click(data.HDI.cotizacion.autos.cmbDptoCirculacion)
    
            await page.waitFor(1000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbDptoCirculacion)
            await page.click(data.HDI.cotizacion.autos.cmbDptoCirculacion)
            await page.select(data.HDI.cotizacion.autos.cmbDptoCirculacion, data.HDI.cotizacion.autos.dptoCirculacionSelect)
    
            await page.waitFor(1000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbClase)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbClase).value = conf.cotizacion.autos.claseCmb;
            }, data.HDI)
    
            await page.waitFor(10000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
            }, data.HDI)
            console.log("Scraper HDI : Timeout espere...")
            await page.waitFor(4000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo)
            await page.evaluate((conf) => {
                document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
            }, data.HDI)
            console.log("Scraper HDI : Timeout finalizado...")
            await page.waitFor(2000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.autos.btnCargar)
            await page.click(data.HDI.cotizacion.autos.btnCargar)
    
            await page.waitFor(2000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios)
            await page.click(data.HDI.cotizacion.autos.cmbAnios)
    
            await page.select(data.HDI.cotizacion.autos.cmbAnios, data.HDI.cotizacion.autos.aniosSelect)
    
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios)
            await page.click(data.HDI.cotizacion.autos.cmbAnios)
            await console.log("Scraper HDI : Terminando Formulario");
            await console.log("Scraper HDI : Generando PDF");
            console.log("Scraper HDI : cargando tipo de vehiculo")
            await page.waitFor(1000 + RandomizeWaits())
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
            await page.waitFor(12000 + RandomizeWaits())
            console.log("Scraper HDI :Seleccionando HDI")
            await page.waitForSelector(data.HDI.cotizacion.autos.btnCargar)
            await page.click(data.HDI.cotizacion.autos.btnCargar)
            console.log("HDI seleccionado")
            await page.waitFor(2000 + RandomizeWaits())
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios)
            await page.click(data.HDI.cotizacion.autos.cmbAnios)
            await page.select(data.HDI.cotizacion.autos.cmbAnios, data.HDI.cotizacion.autos.aniosSelect)
            await page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios)
            await page.click(data.HDI.cotizacion.autos.cmbAnios)
            console.log("finalizando : HDI")
            //Crear Cotizacion
            await page.waitFor(2000 + RandomizeWaits())
            await page.waitForSelector("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_btnCotizar")
            await page.click("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_btnCotizar")
            //Continuar
            await page.waitFor(2000 + RandomizeWaits())
            await page.waitForSelector("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_Btn_ContinuarAutorizaciones.TextoSolicitud")
            await page.click("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_Btn_ContinuarAutorizaciones.TextoSolicitud")
            } catch (error) {
                await browser.close();
                console.log(error);
                throw new Error('Error scrap HDI')
            }
            
                                            }
                                        }