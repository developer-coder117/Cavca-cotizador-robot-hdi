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
            await Promise.all([
                await page.click(data.AXA.login.btn),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
                console.log("Espere... "),
                                                  ]);
            console.log("AXA scraper :  iniciando sesion espere...")

            console.log("AXA scraper :  buscando formulario")
            
            await Promise.all([
                await page.goto(data.AXA.redirect.form),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
                console.log("Espere... "),
                              ]);
                pendingXHR.waitForAllXhrRequest();
                page.click("body",{delay:400})
                console.log("Esperando elemento "),
                await page.waitForSelector('.row #People_DocumentNumber')
                await page.click('.row #People_DocumentNumber')
  
                await page.waitForSelector('fieldset > .row > .col-md-6 > .has-success > .labelhalf')
                await page.click('fieldset > .row > .col-md-6 > .has-success > .labelhalf')
  

        } catch (error) {
            await browser.close();
            console.log(error);
            throw new Error('Error scrap HDI')
            }
    }
}