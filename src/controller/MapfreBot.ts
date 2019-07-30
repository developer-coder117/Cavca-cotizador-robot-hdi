import puppeteer from 'puppeteer';
import {RandomizeWaits} from '../utils/scraperUtils';
import {Comparacion} from '../utils/scraperUtils';
import data from '../data/config.json'
import {GlobalFunction} from './GlobalFunction'

export class MapfreBot implements GlobalFunction{
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
        const page = await browser.newPage()
        await page.goto(data.MAPFRE.url);
            await page.setViewport({   
                width: 1200,
                height: 900
            })
            //login
            await console.log("Scraper Mapfre : ingresando a login");
            await page.waitForSelector(data.MAPFRE.login.user)
            await page.type(data.MAPFRE.login.user, data.MAPFRE.credentials.user)
            await page.waitForSelector(data.MAPFRE.login.pass)
            await page.type(data.MAPFRE.login.pass, data.MAPFRE.credentials.pass)
            await page.click(data.MAPFRE.login.submitBtn)
            await console.log("Scraper Mapfre : Termino de login");
            //Elegir seguro        
             //menú principal
             try{
             await console.log("Scraper Mapfre : Ingresando al menu");
             await console.log("Scraper Mapfre : Buscando selector...")
             await page.waitForSelector(data.MAPFRE.menuPrincipal.cotizar1)
             await console.log("Scraper Mapfre : Selector encontrado...")
             await page.click(data.MAPFRE.menuPrincipal.cotizar1)
             await console.log("Scraper Mapfre : Desplegando menu...")
             await console.log("Scraper Mapfre : Buscando selector...")
             await page.waitForSelector(data.MAPFRE.menuPrincipal.cotizar2)
             await console.log("Scraper Mapfre : Selector encontrado...")
             await page.click(data.MAPFRE.menuPrincipal.cotizar2)
             await console.log("Scraper Mapfre : Accediendo...")
             await console.log("Scraper Mapfre : Seleccionando tipo de seguro")
             await page.waitFor(10000)
             await page.waitForSelector(data.MAPFRE.TipoSeguros.checkSuperTrebol)
             await page.click(data.MAPFRE.TipoSeguros.checkSuperTrebol)
             await console.log("Scraper Mapfre : Confirmando tipo de seguro... ")
             await page.click(data.MAPFRE.TipoSeguros.btnCotizar)
             } catch (e) {
                await page.keyboard.press('Enter');
                console.log(e);
                await browser.close();
                throw new Error('Error scrap Mapfre')
            }
             //seguros a elegir
                 await page.waitForSelector(data.MAPFRE.TipoSeguros.checkSuperTrebol)
                 await page.click(data.MAPFRE.TipoSeguros.checkSuperTrebol)
             await page.waitForSelector(data.MAPFRE.TipoSeguros.btnCotizar)
             await page.click(data.MAPFRE.TipoSeguros.btnCotizar)
             //cotizacion
             //datos del seguro
             await page.waitFor(2000 + RandomizeWaits());
             await page.waitForSelector(data.MAPFRE.cotizacion.datoSeguro.txtPlaca)
             await page.type(data.MAPFRE.cotizacion.datoSeguro.txtPlaca, data.MAPFRE.cotizacion.datoSeguro.txtPlacaIn)
             await page.waitForSelector('body')
             await page.click('body')
             await page.waitFor(7000 + RandomizeWaits())
             await page.waitForSelector(data.MAPFRE.cotizacion.datoSeguro.cmbOficina)
             await page.click(data.MAPFRE.cotizacion.datoSeguro.cmbOficina)
             await page.select(data.MAPFRE.cotizacion.datoSeguro.cmbOficina, data.MAPFRE.cotizacion.datoSeguro.oficinaSelected)
             await page.waitForSelector(data.MAPFRE.cotizacion.datoSeguro.cmbOficina)
             await page.click(data.MAPFRE.cotizacion.datoSeguro.cmbOficina)
             //datos del riesgo
             let fechaNac = data.MAPFRE.cotizacion.datosRiesgo.txtFechaNac
             fechaNac = fechaNac.replace("/", "")
             fechaNac = fechaNac.replace("/", "")
             await page.waitFor(6000 + RandomizeWaits());
             await page.waitForSelector(data.MAPFRE.cotizacion.datosRiesgo.txtFechaNac)
             await page.type(data.MAPFRE.cotizacion.datosRiesgo.txtFechaNac, data.MAPFRE.cotizacion.datosRiesgo.txtFecNacValue)
             await page.waitForSelector('body')
             await page.click('body')
             await page.waitFor(5000 + RandomizeWaits())
             await page.waitForSelector(data.MAPFRE.cotizacion.datosRiesgo.cmbGenero)
             await page.click(data.MAPFRE.cotizacion.datosRiesgo.cmbGenero)
             //await page.select(data.MAPFRE.cotizacion.datosRiesgo.cmbGenero, genero)
             await page.waitForSelector(data.MAPFRE.cotizacion.datosRiesgo.cmbGenero)
             await page.click(data.MAPFRE.cotizacion.datosRiesgo.cmbGenero)
             await page.waitFor(5000 + RandomizeWaits())
             await page.waitForSelector(data.MAPFRE.cotizacion.datosRiesgo.cmbNumHijos)
             await page.click(data.MAPFRE.cotizacion.datosRiesgo.cmbNumHijos)
             await page.select(data.MAPFRE.cotizacion.datosRiesgo.cmbNumHijos, data.MAPFRE.cotizacion.datosRiesgo.numHijos)
             await page.waitForSelector(data.MAPFRE.cotizacion.datosRiesgo.cmbNumHijos)
             await page.click(data.MAPFRE.cotizacion.datosRiesgo.cmbNumHijos)
             await page.waitForSelector('body')
             await page.click('body')
             await page.waitFor(5000 + RandomizeWaits())
             await page.waitForSelector(data.MAPFRE.cotizacion.datosRiesgo.cmbCiudad)
             await page.click(data.MAPFRE.cotizacion.datosRiesgo.cmbCiudad)
             await page.select(data.MAPFRE.cotizacion.datosRiesgo.cmbCiudad, data.MAPFRE.cotizacion.datosRiesgo.ciudadSelected)
             await page.waitForSelector(data.MAPFRE.cotizacion.datosRiesgo.cmbCiudad)
             await page.click(data.MAPFRE.cotizacion.datosRiesgo.cmbCiudad)
             await page.waitFor(5000 + RandomizeWaits())
             await page.waitForSelector(data.MAPFRE.cotizacion.datosRiesgo.cmbRce)
             await page.click(data.MAPFRE.cotizacion.datosRiesgo.cmbRce)
             await page.select(data.MAPFRE.cotizacion.datosRiesgo.cmbRce, data.MAPFRE.cotizacion.datosRiesgo.rceSelected)
             await page.waitForSelector(data.MAPFRE.cotizacion.datosRiesgo.cmbRce)
             await page.click(data.MAPFRE.cotizacion.datosRiesgo.cmbRce)
             await page.waitFor(5000 + RandomizeWaits())
             await page.waitForSelector(data.MAPFRE.cotizacion.datosRiesgo.cmbDeducible)
             await page.click(data.MAPFRE.cotizacion.datosRiesgo.cmbDeducible)
             await page.select(data.MAPFRE.cotizacion.datosRiesgo.cmbDeducible, data.MAPFRE.cotizacion.datosRiesgo.deducibleSelected)
             await page.waitForSelector(data.MAPFRE.cotizacion.datosRiesgo.cmbDeducible)
             await page.click(data.MAPFRE.cotizacion.datosRiesgo.cmbDeducible)
             await page.waitFor(5000 + RandomizeWaits())
             await page.waitForSelector(data.MAPFRE.cotizacion.datosRiesgo.btnCotizar)
             await page.click(data.MAPFRE.cotizacion.datosRiesgo.btnCotizar)
             //resultados -- tabla
             await page.waitFor(20000 + RandomizeWaits())
             let valorCot = "10000"//await page.$eval(data.MAPFRE.resultados.valorCot, item => item.innerText);
             valorCot = valorCot.replace(".", "")
             valorCot = valorCot.replace(".", "")
             console.log(valorCot);
             await page.waitFor(1000 + RandomizeWaits())
             await page.waitForSelector(data.MAPFRE.resultados.caratula)
             await page.click(data.MAPFRE.resultados.caratula)
             await console.log("Scraper Mapfre : Termino de formulario");
             //pdf
             await console.log("Scraper Mapfre : Generando FDF");
             await page.waitFor(10000 + RandomizeWaits())
             let pages = await browser.pages()
             await pages[2].waitFor(6000 + RandomizeWaits())
             await pages[2].waitForSelector(data.MAPFRE.resultados.btnDescargar)
             await pages[2].click(data.MAPFRE.resultados.btnDescargar)
             await console.log("Scraper Mapfre : PDF Generado");
             let retorno = {
                 "value": `${valorCot}`
             }
             await pages[2].waitFor(15000 + RandomizeWaits())
             await browser.close();
    }
}
