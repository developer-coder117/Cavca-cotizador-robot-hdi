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
const config_json_1 = __importDefault(require("../data/config.json"));
const { PendingXHR } = require('pending-xhr-puppeteer');
class SbsBot {
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
            yield page.goto(config_json_1.default.SBS.url);
            yield page.setViewport({
                width: 1080,
                height: 720
            });
            const pendingXHR = new PendingXHR(page);
            try {
                const page = yield browser.newPage();
                //Path default de descarga
                //await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: process.env.dirUserDataBotSbs });
                yield page.goto(config_json_1.default.SBS.url);
                //Definimos ancho display navegador
                yield page.setViewport({
                    width: 1080,
                    height: 720
                });
                //===========
                //zona logueo
                //==========
                yield console.log("Inicio de login");
                yield page.waitForSelector(config_json_1.default.SBS.login.txtUser);
                yield page.type(config_json_1.default.SBS.login.txtUser, config_json_1.default.SBS.credentials.user);
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.login.txtPass);
                yield page.type(config_json_1.default.SBS.login.txtPass, config_json_1.default.SBS.credentials.pass);
                yield page.click(config_json_1.default.SBS.login.btnLogin);
                yield console.log("Fin de login");
                //fin zona logueo
                //zona seleccionar cotizador Auto o Hogar
                yield console.log("Incio zona cotizador");
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.cotizaAuto);
                yield page.click(config_json_1.default.SBS.menu.cotizaAuto);
                //fin zona cotizador
                //=============================
                //zona Menu datos del asegurado
                //============================
                yield console.log("Inicio zona menu datos del asegurado");
                let inTipoDoc = "1"; //Datos cedula desde la View 1-->cc 2-->nit 3-->ce
                if (inTipoDoc == "1" || inTipoDoc == "3") //Si selecciona cc o ce debe seguir este flujo
                 {
                    //Seleccionamos tipo de documento 
                    yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                    yield page.waitForSelector(config_json_1.default.SBS.menu.datosAsegurado.cmbTipoDoc);
                    yield page.click(config_json_1.default.SBS.menu.datosAsegurado.cmbTipoDoc);
                    yield page.select(config_json_1.default.SBS.menu.datosAsegurado.cmbTipoDoc, inTipoDoc);
                    yield page.waitForSelector(config_json_1.default.SBS.menu.datosAsegurado.cmbTipoDoc);
                    yield page.click(config_json_1.default.SBS.menu.datosAsegurado.cmbTipoDoc);
                    //Ingresamos numero de documento
                    yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                    yield page.waitForSelector(config_json_1.default.SBS.menu.datosAsegurado.txtNumIdent);
                    yield page.type(config_json_1.default.SBS.menu.datosAsegurado.txtNumIdent, config_json_1.default.SBS.menu.datosAsegurado.nDocumento);
                    //Ingresamos primer apellido    
                    yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                    yield page.waitForSelector(config_json_1.default.SBS.menu.datosAsegurado.txtApe1);
                    yield page.type(config_json_1.default.SBS.menu.datosAsegurado.txtApe1, config_json_1.default.SBS.menu.datosAsegurado.valueTxtApellido);
                    //Ingresamos segundo apellido
                    yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                    yield page.waitForSelector(config_json_1.default.SBS.menu.datosAsegurado.txtApe2);
                    yield page.type(config_json_1.default.SBS.menu.datosAsegurado.txtApe2, config_json_1.default.SBS.menu.datosAsegurado.valueTxtApellido2);
                    //Ingresamos nombres
                    yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                    yield page.waitForSelector(config_json_1.default.SBS.menu.datosAsegurado.txtNombres);
                    yield page.type(config_json_1.default.SBS.menu.datosAsegurado.txtNombres, config_json_1.default.SBS.menu.datosAsegurado.valueTxtNombres);
                    yield console.log("Fin datos del asegurado");
                }
                else if (inTipoDoc == "2") { //Si selecciona tarjeta de identidad se debe llenar un campo mas
                    //Seleccionamos el tipo de documento
                    yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                    yield page.waitForSelector(config_json_1.default.SBS.menu.datosAsegurado.cmbTipoDoc);
                    yield page.click(config_json_1.default.SBS.menu.datosAsegurado.cmbTipoDoc);
                    yield page.select(config_json_1.default.SBS.menu.datosAsegurado.cmbTipoDoc, inTipoDoc);
                    yield page.waitForSelector(config_json_1.default.SBS.menu.datosAsegurado.cmbTipoDoc);
                    yield page.click(config_json_1.default.SBS.menu.datosAsegurado.cmbTipoDoc);
                    //Ingresamos el numero de la identificacion
                    yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                    yield page.waitForSelector(config_json_1.default.SBS.menu.datosAsegurado.txtNumIdent);
                    yield page.type(config_json_1.default.SBS.menu.datosAsegurado.txtNumIdent, "93082712788");
                    yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                    yield page.waitForSelector(config_json_1.default.SBS.menu.datosAsegurado.txtNit);
                    yield page.type(config_json_1.default.SBS.menu.datosAsegurado.txtNit, config_json_1.default.SBS.menu.datosAsegurado.valueNit);
                }
                //Fin zona datos del asegurado
                //=============================
                //Zona para datos del conductor
                //=============================
                let inTipoDocCondutor = "1";
                //Seleccionamos tipo de documento //Si es nit nos sirven estas lineas de codigo
                /*
                await page.waitFor(500 + RandomizeWaits())
                await page.waitForSelector(data.SBS.menu.datosConductor.cmbTipoDocConductor)
                await page.click(data.SBS.menu.datosConductor.cmbTipoDocConductor)
                await page.select(data.SBS.menu.datosConductor.cmbTipoDocConductor,inTipoDocCondutor)
                await page.waitForSelector(data.SBS.menu.datosConductor.cmbTipoDocConductor)
                await page.click(data.SBS.menu.datosConductor.cmbTipoDocConductor)*/
                //genero segun dato de entrada del front
                let genero = "";
                let inGenero = "Femenino";
                if (scraperUtils_1.Comparacion(inGenero, "Masculino") == true) {
                    genero = "1";
                }
                else {
                    genero = "2";
                }
                //Seleccionamos el genero 
                yield console.log("Inicio datos del coductor asegurado");
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosConductor.cmbGeneroConductor);
                yield page.click(config_json_1.default.SBS.menu.datosConductor.cmbGeneroConductor);
                yield page.select(config_json_1.default.SBS.menu.datosConductor.cmbGeneroConductor, genero);
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosConductor.cmbGeneroConductor);
                yield page.click(config_json_1.default.SBS.menu.datosConductor.cmbGeneroConductor);
                //Ingresamos Fecha de nacimiento
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosConductor.txtFchNacimientoConductor);
                yield page.type(config_json_1.default.SBS.menu.datosConductor.txtFchNacimientoConductor, config_json_1.default.SBS.menu.datosConductor.valueTxtFchNacimientoConductor);
                //Fin datos del conductor asegurado del vehiculo
                //=================================
                //Informacion de contacto asegurado
                //=================================
                //Seleccionamos la ciudad de contacto por deafult se esta escogiendo bogota
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.informacionContactoAsegu.cmbCiudadContacto);
                yield page.click(config_json_1.default.SBS.menu.informacionContactoAsegu.cmbCiudadContacto);
                yield page.select(config_json_1.default.SBS.menu.informacionContactoAsegu.cmbCiudadContacto, config_json_1.default.SBS.menu.informacionContactoAsegu.selectedCiudadContacto);
                yield page.waitForSelector(config_json_1.default.SBS.menu.informacionContactoAsegu.cmbCiudadContacto);
                yield page.click(config_json_1.default.SBS.menu.informacionContactoAsegu.cmbCiudadContacto);
                //Ingresamos la direccion de contacto
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.informacionContactoAsegu.txtDireccionContacto);
                yield page.type(config_json_1.default.SBS.menu.informacionContactoAsegu.txtDireccionContacto, config_json_1.default.SBS.menu.informacionContactoAsegu.valueTxtDireccionContacto);
                //Ingresamos  telefono fijo de contacto
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.informacionContactoAsegu.txtTelContacto);
                yield page.type(config_json_1.default.SBS.menu.informacionContactoAsegu.txtTelContacto, config_json_1.default.SBS.menu.informacionContactoAsegu.valueTxtTelContacto);
                //Ingresamos telefono celular de contacto
                yield page.waitFor(1000 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.informacionContactoAsegu.txtCelContacto);
                yield page.type(config_json_1.default.SBS.menu.informacionContactoAsegu.txtCelContacto, config_json_1.default.SBS.menu.informacionContactoAsegu.valueTxtCelContacto);
                //Ingresamos email de contacto
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.informacionContactoAsegu.txtEmailContacto);
                yield page.type(config_json_1.default.SBS.menu.informacionContactoAsegu.txtEmailContacto, config_json_1.default.SBS.menu.informacionContactoAsegu.valueTxtEmailContacto);
                //Fin informacion de contacto del asegurado
                //==================
                //datos del vehiculo
                //==================
                yield console.log("Inicio datos del vehiculo");
                //codido fasecolsa
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosVehiculo.txtCodFasecolda);
                yield page.type(config_json_1.default.SBS.menu.datosVehiculo.txtCodFasecolda, config_json_1.default.SBS.menu.datosVehiculo.valueTxtFasecolda);
                //espera recuperar cursos
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosVehiculo.body);
                yield page.click(config_json_1.default.SBS.menu.datosVehiculo.body);
                //año modelo
                let anio = "2010";
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosVehiculo.cmbAnioModelo);
                yield page.click(config_json_1.default.SBS.menu.datosVehiculo.cmbAnioModelo);
                yield page.select(config_json_1.default.SBS.menu.datosVehiculo.cmbAnioModelo, config_json_1.default.SBS.menu.datosVehiculo.selectedAnioModelo);
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosVehiculo.cmbAnioModelo);
                yield page.click(config_json_1.default.SBS.menu.datosVehiculo.cmbAnioModelo);
                //seleccionamos si el  vehiculo es cero kilometros
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosVehiculo.cmbCeroKm);
                yield page.select(config_json_1.default.SBS.menu.datosVehiculo.cmbCeroKm, config_json_1.default.SBS.menu.datosVehiculo.selectedCeroKm);
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosVehiculo.cmbCeroKm);
                yield page.click(config_json_1.default.SBS.menu.datosVehiculo.cmbCeroKm);
                //Ingresamos placas del vehiculo
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosVehiculo.txtPlacas);
                yield page.type(config_json_1.default.SBS.menu.datosVehiculo.txtPlacas, config_json_1.default.SBS.menu.datosVehiculo.valueTxtPlacas);
                //Seleccionamos la ciudad de circulacion
                yield page.waitFor(2000 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosVehiculo.cmbCiudadCirculacion);
                yield page.click(config_json_1.default.SBS.menu.datosVehiculo.cmbCiudadCirculacion);
                yield page.select(config_json_1.default.SBS.menu.datosVehiculo.cmbCiudadCirculacion, config_json_1.default.SBS.menu.datosVehiculo.selectedCiudadCirculacion);
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosVehiculo.cmbCiudadCirculacion);
                yield page.click(config_json_1.default.SBS.menu.datosVehiculo.cmbCiudadCirculacion);
                //Seleccionamos el usuo del vehiculo
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosVehiculo.cmbUsoVehiculo);
                yield page.click(config_json_1.default.SBS.menu.datosVehiculo.cmbUsoVehiculo);
                yield page.select(config_json_1.default.SBS.menu.datosVehiculo.cmbUsoVehiculo, config_json_1.default.SBS.menu.datosVehiculo.selectUsoVehiculo);
                yield page.waitForSelector(config_json_1.default.SBS.menu.datosVehiculo.cmbUsoVehiculo);
                yield page.click(config_json_1.default.SBS.menu.datosVehiculo.cmbUsoVehiculo);
                //Fin datos del vehiculo
                //================================
                //Zona datos responsabilidad civil  -->Duda con el valor de responsabilidad civil que elige
                //=================================
                yield console.log("Inicio datos de responsabilidad civil");
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.responsabilidadCivil.cmbRc);
                yield page.click(config_json_1.default.SBS.menu.responsabilidadCivil.cmbRc);
                yield page.select(config_json_1.default.SBS.menu.responsabilidadCivil.cmbRc, config_json_1.default.SBS.menu.responsabilidadCivil.selectedRc);
                yield page.waitForSelector(config_json_1.default.SBS.menu.responsabilidadCivil.cmbRc);
                yield page.click(config_json_1.default.SBS.menu.responsabilidadCivil.cmbRc);
                //Fin datos responsabilidad civil
                //==================================
                //Zona de datos para los deducibles  --> Duda deben quedar todos en 0 % ? 
                //=================================
                //Fin datos para los deducibles
                //==============================
                //Planes o paquetes de cobertura y cotizar
                //==============================
                yield console.log("Inicio planes de cobertura");
                //seleccionamos vehiculo de reemplazo por siniestro
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.planesCobertura.reemSiniestro);
                yield page.click(config_json_1.default.SBS.menu.planesCobertura.reemSiniestro);
                //Seleccionamos gastos transporte perdidas parciales
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.planesCobertura.transPerParciales);
                yield page.click(config_json_1.default.SBS.menu.planesCobertura.transPerParciales);
                //Seleccionamos gastos transporte por perdidas totales
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.planesCobertura.transPerTotales);
                yield page.click(config_json_1.default.SBS.menu.planesCobertura.transPerTotales);
                //Seleccionamos llantas estalladas
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.planesCobertura.llantasEstalladas);
                yield page.click(config_json_1.default.SBS.menu.planesCobertura.llantasEstalladas);
                //Seleccionamos pequeños accesorios
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.planesCobertura.peqAccesorios);
                yield page.click(config_json_1.default.SBS.menu.planesCobertura.peqAccesorios);
                //Seleccionamos tramites de transito
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.planesCobertura.tramitesTransito);
                yield page.click(config_json_1.default.SBS.menu.planesCobertura.tramitesTransito);
                //Seleccionamos Accidentes personales asegurado y ocupantes
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.planesCobertura.accPersonales);
                yield page.click(config_json_1.default.SBS.menu.planesCobertura.accPersonales);
                //Seleccionamos billetera protegida
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.planesCobertura.billeteraProtegida);
                yield page.click(config_json_1.default.SBS.menu.planesCobertura.billeteraProtegida);
                //Seleccionamos Reemplazo de llaves del vehiculo
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.planesCobertura.reemplazoLlaves);
                yield page.click(config_json_1.default.SBS.menu.planesCobertura.reemplazoLlaves);
                //Duda preguntar si debemos seleccionar asistencia platino y documentos protegidos
                //Seleccionamos el plan de cobertura full
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.planesCobertura.rdPlanFulll);
                yield page.click(config_json_1.default.SBS.menu.planesCobertura.rdPlanFulll);
                //Click en el btn cotizar
                yield page.waitFor(500 + scraperUtils_2.RandomizeWaits());
                yield page.waitForSelector(config_json_1.default.SBS.menu.planesCobertura.btnCotizar);
                yield page.click(config_json_1.default.SBS.menu.planesCobertura.btnCotizar);
                //Duda Preguntar si debe descargar el pdf }
            }
            catch (e) {
                yield browser.close();
                console.log(e);
                throw new Error("Error scrapper SBS");
            }
        });
    }
}
exports.SbsBot = SbsBot;
