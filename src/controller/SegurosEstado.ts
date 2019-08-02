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
            }  catch (error) {
            console.log("Error")
            await page.waitFor(100000)
            await browser.close();
            console.log(error);
            throw new Error('Error scrap Seguros del estado')
                              }
                            }
                        }

