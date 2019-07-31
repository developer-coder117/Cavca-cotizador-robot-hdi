import puppeteer from 'puppeteer';
import { Comparacion } from '../utils/scraperUtils';
import data from '../data/config.json'
import { GlobalFunction } from './GlobalFunction'

const { PendingXHR } = require('pending-xhr-puppeteer');

export class AxaBot implements GlobalFunction {
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
        await page.goto(data.AXA.url);
        await page.setViewport({
            width: 1080,
            height: 720
        })
        const pendingXHR = new PendingXHR(page);
        try {
            console.log("AXA scraper : buscando input usuario");
            await page.waitForSelector(data.AXA.login.user);
            console.log("AXA scraper : introduciendo numero de cedula de usuario");
            await page.type(data.AXA.login.user, data.AXA.credentials.user);
            console.log("AXA scraper : buscando input password");
            await page.waitForSelector(data.AXA.login.pass);
            console.log("AXA scraper : introduciendo password de usuario");
            await page.type(data.AXA.login.pass, data.AXA.credentials.pass);
            console.log("AXA scraper : seleccionando boton");
            await page.waitForSelector(data.AXA.login.btn);
            await page.click(data.AXA.login.btn);
            console.log("AXA scraper :  iniciando sesion espere...")
            await page.waitForNavigation();
            console.log("AXA scraper :  buscando formulario")
            await page.goto(data.AXA.redirect.form);
            console.log("AXA scraper :  redireccionando espere...")
            console.log("AXA scraper :  seleccionando tipo de documento espere...")
            await page.waitForSelector(data.AXA.menu.cmbIdDocument);
            console.log("AXA scraper :  click boton de seleccion")
            await page.click(data.AXA.menu.cmbIdDocument);
            console.log("AXA scraper :  escribiendo espere...")
            await page.type(data.AXA.menu.cmbIdDocument, data.AXA.menu.cmbIdDocumentIn);
        } catch (error) {
            await browser.close();
            console.log(error);
            throw new Error('Error scrap HDI')
            }
    }
}