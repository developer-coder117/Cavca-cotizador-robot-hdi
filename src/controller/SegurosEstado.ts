import puppeteer from 'puppeteer';
import {Comparacion} from '../utils/scraperUtils';

import data from '../data/config.json'
import {GlobalFunction} from './GlobalFunction'
const { PendingXHR } = require('pending-xhr-puppeteer');
export class SEBot  implements GlobalFunction {
    public login(): Promise<void> {
        throw new Error("Method not implemented.");
    } 
    public verify(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async cotizar() {
        const browser = await puppeteer.launch({
            headless:false,
            slowMo:50
        });
        const page = await browser.newPage();
        await page.goto(data.SegurosEstado.url);
        await page.setViewport({
            width: 1080,
            height: 720
        })
        const pendingXHR = new PendingXHR(page);
        try {
            await pendingXHR.waitForAllXhrFinished();
            await page.click(data.SegurosEstado.formLogin)
            await page.waitForSelector(data.SegurosEstado.login.user)
            await page.type(data.SegurosEstado.login.user,data.SegurosEstado.credentials.user)
            await page.waitForSelector(data.SegurosEstado.login.password)
            await page.type(data.SegurosEstado.login.password,data.SegurosEstado.credentials.pass)
            await page.waitForSelector(data.SegurosEstado.login.btn)
            await page.click(data.SegurosEstado.login.btn)
            await Promise.all([
                page.goto(data.SegurosEstado.formParams.formOptions),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
                    ]);
            await pendingXHR.waitForAllXhrFinished()
            await Promise.all([
                page.goto(data.SegurosEstado.formParams.frame),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
                    ]);
            await page.click(data.SegurosEstado.formParams.option)
            await pendingXHR.waitForAllXhrFinished()
            await Promise.all([
            await page.click(data.SegurosEstado.formParams.newForm),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
                 ]);
            //formulario1
            await pendingXHR.waitForAllXhrFinished()
            //Parte 1
            await page.waitForSelector(data.SegurosEstado.formulario1.selectIdDoc)
            await page.select(data.SegurosEstado.formulario1.selectIdDoc,data.SegurosEstado.formulario1.idDoc)
            await page.waitForSelector(data.SegurosEstado.formulario1.fieldNumId)
            await page.type(data.SegurosEstado.formulario1.fieldNumId,data.SegurosEstado.formulario1.valNumId)
            await page.waitForSelector(data.SegurosEstado.formulario1.Nom);
            await page.type(data.SegurosEstado.formulario1.Nom,data.SegurosEstado.formulario1.NomVal);
            await page.waitForSelector(data.SegurosEstado.formulario1.Apellido);
            await page.type(data.SegurosEstado.formulario1.Apellido,data.SegurosEstado.formulario1.valApellido);
            await page.waitForSelector(data.SegurosEstado.formulario1.selectGen);
            await page.select(data.SegurosEstado.formulario1.selectGen,data.SegurosEstado.formulario1.Genero);
            await page.waitForSelector(data.SegurosEstado.formulario1.bd);
            await page.type(data.SegurosEstado.formulario1.bd,data.SegurosEstado.formulario1.bdval)
            await page.select(data.SegurosEstado.formulario1.estadoCivil,data.SegurosEstado.formulario1.estadoCival)
            await page.select(data.SegurosEstado.formulario1.trabajo,data.SegurosEstado.formulario1.trabajoIn)
            await page.waitForSelector(data.SegurosEstado.formulario1.emailField)
            await page.type(data.SegurosEstado.formulario1.emailField,data.SegurosEstado.formulario1.emailAddress)
            await page.waitForSelector(data.SegurosEstado.formulario1.tel)
            await page.type(data.SegurosEstado.formulario1.tel,data.SegurosEstado.formulario1.telNumber)
            await page.waitForSelector(data.SegurosEstado.formulario1.direccion)
            await page.type(data.SegurosEstado.formulario1.direccion,data.SegurosEstado.formulario1.direccionNumber)
            await page.waitForSelector(data.SegurosEstado.formulario1.direccion)
            await page.type(data.SegurosEstado.formulario1.direccion,data.SegurosEstado.formulario1.direccionNumber)
            //Parte 2 
            await page.waitForSelector(data.SegurosEstado.formulario1.secondpart)
            await page.click(data.SegurosEstado.formulario1.secondpart)
            await pendingXHR.waitForAllXhrFinished()
            await page.waitForSelector(data.SegurosEstado.formulario2.selectProducto)
            await page.select(data.SegurosEstado.formulario2.selectProducto,data.SegurosEstado.formulario2.valueProducto)
            await pendingXHR.waitForAllXhrFinished()
            await page.waitForSelector(data.SegurosEstado.formulario2.zonaCirculacion)
            await page.select(data.SegurosEstado.formulario2.zonaCirculacion,data.SegurosEstado.formulario2.zonaValue)
            await pendingXHR.waitForAllXhrFinished()
            await page.waitForSelector(data.SegurosEstado.formulario2.marca)
            await page.type(data.SegurosEstado.formulario2.marca,data.SegurosEstado.formulario2.marcaValue)
            await page.waitForSelector(data.SegurosEstado.formulario2.clase)
            await page.type(data.SegurosEstado.formulario2.clase,data.SegurosEstado.formulario2.claseValue)
            await page.waitForSelector(data.SegurosEstado.formulario2.placa)
            await page.type(data.SegurosEstado.formulario2.placa,data.SegurosEstado.formulario2.placaIn)
            await pendingXHR.waitForAllXhrFinished()
            //Parte 3 
            await page.waitForSelector(data.SegurosEstado.formulario2.thirdPart)
            await page.click(data.SegurosEstado.formulario2.thirdPart)
            await pendingXHR.waitForAllXhrFinished()
            }  catch (error) {
            console.log("Error")
            await page.waitFor(100000)
            await browser.close();
            console.log(error);
            throw new Error('Error scrap Seguros del estado')
                              }
                            }
                        }

