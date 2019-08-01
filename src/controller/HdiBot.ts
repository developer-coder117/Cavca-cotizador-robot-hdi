import puppeteer from 'puppeteer';
import { Comparacion } from '../utils/scraperUtils';
import data from '../data/config.json'
import { GlobalFunction } from './GlobalFunction'

const { PendingXHR } = require('pending-xhr-puppeteer');

/* Interface del bot HDI*/
interface RootObject {
    HDI: HDI;
  }
  
  interface HDI {
    url: string;
    credentials: Credentials;
    login: Login;
    menus: Menus;
    cotizacion: Cotizacion;
    thisbody: string;
  }
  
  interface Cotizacion {
    encabezadoBtn: string;
    Intermediario: Intermediario2;
    asegurado: Asegurado;
    autos: Autos;
  }
  
  interface Autos {
    txtPlaca: string;
    txtPlacaIn: string;
    cmbModelo: string;
    ModeloIn: string;
    txtFasecolda: string;
    txtFasecoldaIn: string;
    cmbMarca: string;
    MarcaCmb: string;
    cmbClase: string;
    claseCmb: string;
    cmbTipo: string;
    tipoCmbIn: string;
    tipoTextValue: string;
    cmbDptoCirculacion: string;
    dptoCirculacionSelect: string;
    btnCargar: string;
    cmbAnios: string;
    aniosSelect: string;
    btnCotizar: string;
    valorCot: string;
    btnCont1: string;
    btnCont2: string;
    btnGuardar: string;
    btnImprimir: string;
  }
  
  interface Asegurado {
    lblAsegurado: string;
    cmbTipoDoc: string;
    cmbSelect: string;
    txtNumDoc: string;
    nDocumento: string;
    nDocumentoIn: string;
    estrato: string;
    estratoSelect: string;
    nivelEduc: string;
    nivelEducSelect: string;
    rbMasculino: string;
    rbFemenino: string;
    txtFechaNac: string;
    txtFecNacIn: string;
    txtEdad: string;
    btn: string;
  }
  
  interface Intermediario2 {
    txtComision: string;
    valorCot: string;
    btnCont: string;
  }
  
  interface Menus {
    intermediario: Intermediario;
    polizaElec: string;
    opSol: string;
    cexped: string;
    cotizacion: string;
    nuevoCexped: string;
  }
  
  interface Intermediario {
    cmb: string;
    cmbSelect: string;
    btn: string;
  }
  
  interface Login {
    input: Input;
  }
  
  interface Input {
    user: string;
    password: string;
    btn: string;
  }
  
  interface Credentials {
    user: string;
    pass: string;
  }
  
  export class HdiBot  implements GlobalFunction {
      
      public async init(): Promise<void> {
          const browser = await puppeteer.connect({
              browserWSEndpoint: 'wss://190.96.70.210:3000/?token=f2adff44-a8d7-11e9-9bc4-88d7f6e23c92'
            });
      }
     
      public login(): Promise<any> {
          throw new Error("Method not implemented.");
      }
      
      public verify(): Promise<void> {
          throw new Error("Method not implemented.");
      }
  
      public async cotizar() {
          /*const browser = await puppeteer.connect({
              browserWSEndpoint: 'wss://190.96.70.210:3000/?token=f2adff44-a8d7-11e9-9bc4-88d7f6e23c92'
            });*/
        const browser = await puppeteer.launch({
              headless:false,
              //slowMo:60
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
      await page.click(data.HDI.cotizacion.asegurado.lblAsegurado,{delay:1000})
      //wait for xhr request to be finished... 
      await pendingXHR.waitForAllXhrFinished();
      await console.log("Scraper HDI : Tipo de documento...");
      await page.waitForSelector(data.HDI.cotizacion.asegurado.cmbTipoDoc)
      //wait for xhr request to be finished... 
      await pendingXHR.waitForAllXhrFinished();
      await console.log("Scraper HDI : Evaluando campos");
      await page.click(data.HDI.cotizacion.asegurado.cmbTipoDoc,{delay:1000})
      await page.select(data.HDI.cotizacion.asegurado.cmbTipoDoc, data.HDI.cotizacion.asegurado.cmbSelect)
      await page.waitForSelector(data.HDI.cotizacion.asegurado.cmbTipoDoc)
      await console.log("Scraper HDI : Tipo de documento seleccionando");
      await page.click(data.HDI.cotizacion.asegurado.cmbTipoDoc,{delay:1000})
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

      if (Comparacion(data.HDI.cotizacion.asegurado.rbMasculino, "Masculino")==true){
         
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
      console.log('Placa : ',data.HDI.cotizacion.autos.txtPlacaIn);

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
      //Type and wait just for await and unlock new fields // escribe y espera para desbloquear los demas campos,
      // este campo es redundante porque se autogenera sin embargo se requiere escribir en el 
      //para obtener un evento de la pagina
      await page.type(data.HDI.cotizacion.autos.txtFasecolda, data.HDI.cotizacion.autos.txtFasecoldaIn,{delay:1000})
      await page.click("body")
      //wait for xhr request to be finished... 
      console.log("Seleccionando Marca : ",data.HDI.cotizacion.autos.MarcaCmb)
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.HDI.cotizacion.autos.cmbMarca)
      await page.evaluate((conf) => {
          document.querySelector(conf.cotizacion.autos.cmbMarca).value = conf.cotizacion.autos.MarcaCmb;
      }, data.HDI)
    
      //wait for xhr request to be finished...
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.HDI.cotizacion.autos.cmbDptoCirculacion)
      await page.click(data.HDI.cotizacion.autos.cmbDptoCirculacion)
      await page.click("body")
      //wait for xhr request to be finished... 
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.HDI.cotizacion.autos.cmbDptoCirculacion)
      await page.click(data.HDI.cotizacion.autos.cmbDptoCirculacion)
      await page.select(data.HDI.cotizacion.autos.cmbDptoCirculacion, data.HDI.cotizacion.autos.dptoCirculacionSelect)
      await page.click("body")
      //wait for xhr request to be finished... 
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.HDI.cotizacion.autos.cmbClase)
      await page.evaluate((conf) => {
          document.querySelector(conf.cotizacion.autos.cmbClase).value = conf.cotizacion.autos.claseCmb;
      }, data.HDI, {delay:500})
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo)
      await page.evaluate((conf) => {
          document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
      }, data.HDI)
      await pendingXHR.waitForAllXhrFinished();
      console.log("Scraper HDI : Timeout espere...")
      await page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo)
      await page.evaluate((conf) => {
          document.querySelector(conf.cotizacion.autos.cmbTipo).value = conf.cotizacion.autos.tipoCmbIn;
      }, data.HDI)
      await pendingXHR.waitForAllXhrFinished();
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
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo)
      await page.click(data.HDI.cotizacion.autos.cmbTipo)
      await page.select(data.HDI.cotizacion.autos.cmbTipo, data.HDI.cotizacion.autos.tipoCmbIn)
      await page.waitForSelector(data.HDI.cotizacion.autos.cmbTipo)
      await page.click(data.HDI.cotizacion.autos.cmbTipo)
      await pendingXHR.waitForAllXhrFinished();
      console.log("Scraper HDI : cargando tipo de vehiculo seleccionado")
      console.log("Scraper HDI : Seleccionando HDI")
      await page.waitForSelector(data.HDI.cotizacion.autos.btnCargar)
      await page.click(data.HDI.cotizacion.autos.btnCargar)
      console.log("HDI seleccionado")
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios)
      await page.click(data.HDI.cotizacion.autos.cmbAnios)
      await page.select(data.HDI.cotizacion.autos.cmbAnios, data.HDI.cotizacion.autos.aniosSelect)
      await page.waitForSelector(data.HDI.cotizacion.autos.cmbAnios)
      await page.click(data.HDI.cotizacion.autos.cmbAnios)
      await pendingXHR.waitForAllXhrFinished();
      console.log("finalizando : HDI")
      await page.click("body")
      //Crear Cotizacion
      console.log("Scraper HDI : Cotizando valor del auto")
      await page.waitForSelector("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_btnCotizar")
      await page.click("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_btnCotizar")
      //Continuar
      await page.waitForSelector("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_Btn_ContinuarAutorizaciones.TextoSolicitud")
      await page.click("input#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_Btn_ContinuarAutorizaciones.TextoSolicitud", {delay:500})
     // const element=await page.$eval("#ctl00_ContentPlaceHolder1_ctl08_wucAutos1_txtVlrTotal");
      //let elValue = await page.$eval(data.MAPFRE.resultados.valorCot, item => item.innerHTML);
      let elValue="$20.000.000"
      console.log("Valor total => ",elValue)  
          } catch (error) {
              await browser.close();
              console.log(error);
              throw new Error('Error scrap HDI')
          }
              }
                 }