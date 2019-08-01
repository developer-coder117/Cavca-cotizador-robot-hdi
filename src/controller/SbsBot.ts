import puppeteer from 'puppeteer';
import {Comparacion} from '../utils/scraperUtils';
import {RandomizeWaits} from '../utils/scraperUtils'
import data from '../data/config.json'
import {GlobalFunction} from './GlobalFunction'
const { PendingXHR } = require('pending-xhr-puppeteer');

export class SbsBot  implements GlobalFunction {
    public login(): Promise<void> {
        throw new Error("Method not implemented.");
    }    public verify(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async cotizar() {
      /*const browser = await puppeteer.connect({
        browserWSEndpoint: 'wss://190.96.70.210:3000/?token=f2adff44-a8d7-11e9-9bc4-88d7f6e23c92'
      });
      */ 
       const browser = await puppeteer.launch({
            headless:false,
            //slowMo:30
        });
        const page = await browser.newPage();
        await page.goto(data.SBS.url);
        await page.setViewport({
            width: 1080,
            height: 720
        })
        const pendingXHR = new PendingXHR(page);
        try {
      //=============
      //zona logueo
     //==============
      await pendingXHR.waitForAllXhrFinished();
      await console.log("Inicio de login")
      await page.waitForSelector(data.SBS.login.txtUser)
      await page.type(data.SBS.login.txtUser,data.SBS.credentials.user)
      await page.waitForSelector(data.SBS.login.txtPass)
      await page.type(data.SBS.login.txtPass,data.SBS.credentials.pass)
      await Promise.all([
        page.click(data.SBS.login.btnLogin),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        console.log("Espere... "),
                                          ]);
      await console.log("Fin de login")
      //fin zona logueo
      //zona seleccionar cotizador Auto o Hogar
      await pendingXHR.waitForAllXhrFinished();
      //Recupera el puntero
      await page.click("body")
      await console.log("Incio zona cotizador")
      await page.waitForSelector(data.SBS.menu.cotizaAuto)
      await page.click(data.SBS.menu.cotizaAuto,{delay:3000})
      //fin zona cotizador
      //=============================
      //zona Menu datos del asegurado
      //============================
      await console.log("Inicio zona menu datos del asegurado")
      let inTipoDoc = "1" //Datos cedula desde la View 1-->cc 2-->nit 3-->ce
      if(inTipoDoc == "1" || inTipoDoc == "3") //Si selecciona cc o ce debe seguir este flujo
      {   
        //Seleccionamos tipo de documento 
        await pendingXHR.waitForAllXhrFinished();
        await page.waitForSelector(data.SBS.menu.datosAsegurado.cmbTipoDoc)
        await page.click(data.SBS.menu.datosAsegurado.cmbTipoDoc)
        await page.select(data.SBS.menu.datosAsegurado.cmbTipoDoc,inTipoDoc)
        await page.waitForSelector(data.SBS.menu.datosAsegurado.cmbTipoDoc)
        await page.click(data.SBS.menu.datosAsegurado.cmbTipoDoc)
        //Ingresamos numero de documento
        await page.waitForSelector(data.SBS.menu.datosAsegurado.txtNumIdent)
        await page.type(data.SBS.menu.datosAsegurado.txtNumIdent,data.SBS.menu.datosAsegurado.nDocumento)
        //Ingresamos primer apellido    
        await page.waitForSelector(data.SBS.menu.datosAsegurado.txtApe1)
        await page.type(data.SBS.menu.datosAsegurado.txtApe1,data.SBS.menu.datosAsegurado.valueTxtApellido)
        //Ingresamos segundo apellido
        await page.waitForSelector(data.SBS.menu.datosAsegurado.txtApe2)
        await page.type(data.SBS.menu.datosAsegurado.txtApe2,data.SBS.menu.datosAsegurado.valueTxtApellido2)
        //Ingresamos nombres
        await page.waitForSelector(data.SBS.menu.datosAsegurado.txtNombres)
        await page.type(data.SBS.menu.datosAsegurado.txtNombres,data.SBS.menu.datosAsegurado.valueTxtNombres)
        await console.log("Fin datos del asegurado")
      }else if(inTipoDoc == "2"){  //Si selecciona tarjeta de identidad se debe llenar un campo mas
        //Seleccionamos el tipo de documento
        await page.waitForSelector(data.SBS.menu.datosAsegurado.cmbTipoDoc)
        await page.click(data.SBS.menu.datosAsegurado.cmbTipoDoc)
        await page.select(data.SBS.menu.datosAsegurado.cmbTipoDoc,inTipoDoc)
        await page.waitForSelector(data.SBS.menu.datosAsegurado.cmbTipoDoc)
        await page.click(data.SBS.menu.datosAsegurado.cmbTipoDoc)

        //Ingresamos el numero de la identificacion
        await page.waitForSelector(data.SBS.menu.datosAsegurado.txtNumIdent)
        await page.type(data.SBS.menu.datosAsegurado.txtNumIdent,"93082712788")

        await page.waitForSelector(data.SBS.menu.datosAsegurado.txtNit)
        await page.type(data.SBS.menu.datosAsegurado.txtNit,data.SBS.menu.datosAsegurado.valueNit)
      }
      //Fin zona datos del asegurado
       //=============================
       //Zona para datos del conductor
       //=============================
       let inTipoDocCondutor = "1"

      //genero segun dato de entrada del front
      let genero = ""
      let inGenero= "Femenino"
      
      if(Comparacion(inGenero,"Masculino") == true){
        genero = "1"
      }else{
        genero = "2"
      }

      //Seleccionamos el genero 
      await console.log("Inicio datos del coductor asegurado")
      await page.waitForSelector(data.SBS.menu.datosConductor.cmbGeneroConductor)
      await page.click(data.SBS.menu.datosConductor.cmbGeneroConductor)
      await page.select(data.SBS.menu.datosConductor.cmbGeneroConductor,genero)
      await page.waitForSelector(data.SBS.menu.datosConductor.cmbGeneroConductor)
      await page.click(data.SBS.menu.datosConductor.cmbGeneroConductor)

      //Ingresamos Fecha de nacimiento
      await page.waitForSelector(data.SBS.menu.datosConductor.txtFchNacimientoConductor)
      await page.type(data.SBS.menu.datosConductor.txtFchNacimientoConductor,data.SBS.menu.datosConductor.valueTxtFchNacimientoConductor)

      //Fin datos del conductor asegurado del vehiculo

      //=================================
      //Informacion de contacto asegurado
      //=================================

      //Seleccionamos la ciudad de contacto por deafult se esta escogiendo bogota
      //Espera request despues de fecha nacimiento
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.informacionContactoAsegu.cmbCiudadContacto)
      await page.click(data.SBS.menu.informacionContactoAsegu.cmbCiudadContacto)
      await page.select(data.SBS.menu.informacionContactoAsegu.cmbCiudadContacto,data.SBS.menu.informacionContactoAsegu.selectedCiudadContacto)
      await page.waitForSelector(data.SBS.menu.informacionContactoAsegu.cmbCiudadContacto)
      await page.click(data.SBS.menu.informacionContactoAsegu.cmbCiudadContacto)

      //Ingresamos la direccion de contacto
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.informacionContactoAsegu.txtDireccionContacto)
      await page.type(data.SBS.menu.informacionContactoAsegu.txtDireccionContacto,data.SBS.menu.informacionContactoAsegu.valueTxtDireccionContacto)

      //Ingresamos  telefono fijo de contacto
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.informacionContactoAsegu.txtTelContacto)
      await page.type(data.SBS.menu.informacionContactoAsegu.txtTelContacto,data.SBS.menu.informacionContactoAsegu.valueTxtTelContacto)

      //Ingresamos telefono celular de contacto
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.informacionContactoAsegu.txtCelContacto)
      await page.type(data.SBS.menu.informacionContactoAsegu.txtCelContacto,data.SBS.menu.informacionContactoAsegu.valueTxtCelContacto)

      //Ingresamos email de contacto
        await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.informacionContactoAsegu.txtEmailContacto)
      await page.type(data.SBS.menu.informacionContactoAsegu.txtEmailContacto,data.SBS.menu.informacionContactoAsegu.valueTxtEmailContacto)

      //Fin informacion de contacto del asegurado

      //==================
      //datos del vehiculo
      //==================
       await console.log("Inicio datos del vehiculo")

       //codido fasecolsa
     
       await page.waitForSelector(data.SBS.menu.datosVehiculo.txtCodFasecolda)
       await page.type(data.SBS.menu.datosVehiculo.txtCodFasecolda,data.SBS.menu.datosVehiculo.valueTxtFasecolda)

       //espera recuperar cursos
       await page.waitForSelector(data.SBS.menu.datosVehiculo.body)
       await page.click(data.SBS.menu.datosVehiculo.body)

       //año modelo
        let anio = "2010"
       await pendingXHR.waitForAllXhrFinished();
       await page.waitForSelector(data.SBS.menu.datosVehiculo.cmbAnioModelo)
       await page.click(data.SBS.menu.datosVehiculo.cmbAnioModelo)
       await page.select(data.SBS.menu.datosVehiculo.cmbAnioModelo,data.SBS.menu.datosVehiculo.selectedAnioModelo)
       await page.waitForSelector(data.SBS.menu.datosVehiculo.cmbAnioModelo)
       await page.click(data.SBS.menu.datosVehiculo.cmbAnioModelo,{delay:300})

       //seleccionamos si el  vehiculo es cero kilometros
       await pendingXHR.waitForAllXhrFinished();
       await page.waitForSelector(data.SBS.menu.datosVehiculo.cmbCeroKm)
       await page.select(data.SBS.menu.datosVehiculo.cmbCeroKm,data.SBS.menu.datosVehiculo.selectedCeroKm)
       await page.waitForSelector(data.SBS.menu.datosVehiculo.cmbCeroKm)
       await page.click(data.SBS.menu.datosVehiculo.cmbCeroKm,{delay:300})

      //Ingresamos placas del vehiculo
       //await page.waitFor(500 + RandomizeWaits())
       await page.waitForSelector(data.SBS.menu.datosVehiculo.txtPlacas)
       await page.type(data.SBS.menu.datosVehiculo.txtPlacas,data.SBS.menu.datosVehiculo.valueTxtPlacas)

       //Seleccionamos la ciudad de circulacioc¿n
       //await page.waitFor(3000 + RandomizeWaits())
       await page.waitForSelector(data.SBS.menu.datosVehiculo.cmbCiudadCirculacion)
       await page.click(data.SBS.menu.datosVehiculo.cmbCiudadCirculacion)
       await page.select(data.SBS.menu.datosVehiculo.cmbCiudadCirculacion,data.SBS.menu.datosVehiculo.selectedCiudadCirculacion)
       await page.waitForSelector(data.SBS.menu.datosVehiculo.cmbCiudadCirculacion)
       await page.click(data.SBS.menu.datosVehiculo.cmbCiudadCirculacion)

       //Seleccionamos el usuo del vehiculo
       await page.waitFor(500)
       await page.waitForSelector(data.SBS.menu.datosVehiculo.cmbUsoVehiculo)
       await page.click(data.SBS.menu.datosVehiculo.cmbUsoVehiculo)
       await page.select(data.SBS.menu.datosVehiculo.cmbUsoVehiculo,data.SBS.menu.datosVehiculo.selectUsoVehiculo)
       await page.waitForSelector(data.SBS.menu.datosVehiculo.cmbUsoVehiculo)
       await page.click(data.SBS.menu.datosVehiculo.cmbUsoVehiculo)
       
       //Fin datos del vehiculo

       //================================
       //Zona datos responsabilidad civil  -->Duda con el valor de responsabilidad civil que elige
      //=================================
      await console.log("Inicio datos de responsabilidad civil")
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.responsabilidadCivil.cmbRc)
      await page.click(data.SBS.menu.responsabilidadCivil.cmbRc)
      await page.select(data.SBS.menu.responsabilidadCivil.cmbRc,data.SBS.menu.responsabilidadCivil.selectedRc)
      await page.waitForSelector(data.SBS.menu.responsabilidadCivil.cmbRc)
      await page.click(data.SBS.menu.responsabilidadCivil.cmbRc,{delay:300})
      //Fin datos responsabilidad civil

      //==================================
      //Zona de datos para los deducibles  --> Duda deben quedar todos en 0 % ? 
      //=================================
      //Fin datos para los deducibles
      //==============================
      //Planes o paquetes de cobertura y cotizar
      //==============================
      await console.log("Inicio planes de cobertura")
      //seleccionamos vehiculo de reemplazo por siniestro
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.planesCobertura.reemSiniestro)
      await page.click(data.SBS.menu.planesCobertura.reemSiniestro,{delay:300})
      //Seleccionamos gastos transporte perdidas parciales
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.planesCobertura.transPerParciales)
      await page.click(data.SBS.menu.planesCobertura.transPerParciales,{delay:300})
      //Seleccionamos gastos transporte por perdidas totales
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.planesCobertura.transPerTotales)
      await page.click(data.SBS.menu.planesCobertura.transPerTotales,{delay:300})
      //Seleccionamos llantas estalladas
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.planesCobertura.llantasEstalladas)
      await page.click(data.SBS.menu.planesCobertura.llantasEstalladas,{delay:300})
      //Seleccionamos pequeños accesorios
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.planesCobertura.peqAccesorios)
      await page.click(data.SBS.menu.planesCobertura.peqAccesorios,{delay:300})
      //Seleccionamos tramites de transito
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.planesCobertura.tramitesTransito)
      await page.click(data.SBS.menu.planesCobertura.tramitesTransito,{delay:300})
      //Seleccionamos Accidentes personales asegurado y ocupantes
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.planesCobertura.accPersonales)
      await page.click(data.SBS.menu.planesCobertura.accPersonales,{delay:300})  
      //Seleccionamos billetera protegida
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.planesCobertura.billeteraProtegida)
      await page.click(data.SBS.menu.planesCobertura.billeteraProtegida,{delay:300}) 
      //Seleccionamos Reemplazo de llaves del vehiculo
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.planesCobertura.reemplazoLlaves)
      await page.click(data.SBS.menu.planesCobertura.reemplazoLlaves,{delay:300}) 
      //Duda preguntar si debemos seleccionar asistencia platino y documentos protegidos
      //Seleccionamos el plan de cobertura full
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.planesCobertura.rdPlanFulll)
      await page.click(data.SBS.menu.planesCobertura.rdPlanFulll,{delay:300})
      //Click en el btn cotizar
      await pendingXHR.waitForAllXhrFinished();
      await page.waitForSelector(data.SBS.menu.planesCobertura.btnCotizar)
      await page.click(data.SBS.menu.planesCobertura.btnCotizar,{delay:300})
        } catch (error) {
          console.log("Error")
            await page.waitFor(30000)
            await browser.close();
            console.log(error);
            throw new Error('Error scrap HDI')
        }
          }
            }

