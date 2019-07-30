import puppeteer from 'puppeteer';
import path from 'path';
import promiseRetry from 'promise-retry';
import replace from 'replace-in-file';
import fs from 'fs';
import fse from 'fs-extra';
//Block image function
async function blockImage(page:any){
    page.on('request', (req:any) => {
        if (req.resourceType() === 'image') {
            req.abort();
        } else {
            req.continue();
        }
    });
                                    }
export {blockImage}
//Block alert function
async function blockAlert(page:any){
    page.on('dialog', async (dialog: { dismiss: () => void; }) => {
        await dialog.dismiss();
    });
}
export {blockAlert}
//Repair browser function
async function repairBrowser(puppeteer:any, path:any){
    const repairBrowser = await puppeteer.launch({
        headless: process.env.headlessState || false,
        userDataDir: path
    });
    return repairBrowser.close();
}
export {repairBrowser}
//Randomize Waits, random timeouts
 function RandomizeWaits(){
    let random_wait = 1000;
        random_wait += Math.floor(Math.random() * 2) * 1000;
        random_wait += Math.floor(Math.random() * 9) * 100;
        random_wait += Math.floor(Math.random() * 9) * 10;
        random_wait += Math.floor(Math.random() * 9) * 1;
        return random_wait;
}
export {RandomizeWaits}
const waitForResponse = (page:any, url:any) => {
    return new Promise(resolve => {
        page.on("response", function callback(response:any){
            if (response.url() === url) {
                resolve(response);
                page.removeListener("response",callback)
            }
        })
    })
}; export {waitForResponse}
function Comparacion(str1:string, str2:string){
     function normalize(str:string) {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
            to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
            mapping:any = {};
        for (var i = 0, j = from.length; i < j; i++)
            mapping[from.charAt(i)] = to.charAt(i);
        return function(str:string) {
            var ret = [];
            for (var i = 0, j = str.length; i < j; i++) {
                var c = str.charAt(i);
                if (mapping.hasOwnProperty(str.charAt(i)))
                    ret.push(mapping[c]);
                else
                    ret.push(c);
            }
            return ret.join('');
        }
    };

    let minuscula = (str1 = "") => {
        str1 = str1.toLowerCase()
        return str1
    }

    if (normalize(minuscula(str1)) == normalize(minuscula(str2))) {
        return true;
    } else {
        return false;
    }
}
export {Comparacion}

async function dividirCadena(str1:string, separador:string){
    let arrayDeCadenas = str1.split(separador);
    return arrayDeCadenas;
}
export {dividirCadena}

async function reintentar(nomFuncion:any, resq:any, nom:any) { 
    let retorno = null;
    if (nom == 'bolibar') {
        retorno = {
            value1: 0,
            value2: 0,
            value3: 0
        }

    } else {
        retorno = { value: 0 }
    }

    try {
        const value = await promiseRetry((retry, number) => {
            console.log('attempt number', number);
            return nomFuncion(resq)
                .catch(retry);
        }, { retries: 0 });

        return value || retorno;
    } catch (e) {
        return retorno;
    }
}
export {reintentar}

async function cambiaDirectorioDescarga(botNameDir:string, dirUserDataBot:string) {
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({
        headless: process.env.headlessState || false,
        userDataDir: dirUserDataBot
    })

    try {
        const page = await browser.newPage();
    } finally {
        await browser.close();
    }

    let file = await path.normalize(`${dirUserDataBot}/Default/Preferences`);
    let conf = await fs.readFileSync(file);
    // @ts-ignore
    let confSavefile = await JSON.stringify(JSON.parse(conf).savefile);
    // @ts-ignore
    let confDownload = await JSON.stringify(JSON.parse(conf).download);
    console.log('savefile', confSavefile);
    console.log('confDownload', confDownload);
    let rutaDescarga = await path.normalize(`${process.cwd()}/Download/${botNameDir}`);
    rutaDescarga = await "\"" + rutaDescarga + "\"";
    rutaDescarga = await rutaDescarga.replace(/\\/g, '\\\\')
    console.log('savefile a remplazar', `{"default_directory":${rutaDescarga},"directory_upgrade":true}`);
    console.log('savefile a remplazar', `{"default_directory":${rutaDescarga}}`);


    try {

        const options1 = {
            files: file,
            from: confSavefile,
            to: `{"default_directory":${rutaDescarga}}`,
        };
        console.log('opcion 1', options1);
        const changes = await replace(options1);
        console.log('Modified files 1:', changes.join(', '));
    } catch (error) {
        console.error('Error occurred:', error);
    }

    try {
        const options2 = {
            files: file,
            from: confDownload,
            to: `{"default_directory":${rutaDescarga},"directory_upgrade":true}`,
        };
        const changes = await replace(options2);
        console.log('Modified files 2:', changes.join(', '));
    } catch (error) {
        console.error('Error occurred:', error);
    }
}
export {cambiaDirectorioDescarga}
async function copiaUserDataDirdefault (pathRootUserData:string){
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: pathRootUserData
    });
    try {
        const page = await browser.newPage();
        await page.goto("http://www.google.cl");
        await browser.close();
    } catch (e) {

        await browser.close();
        throw new Error(e)
    }

    const fse = require('fs-extra');
    await fse.copy('Module/ConfigDefaultBrowser', `${pathRootUserData}/Default/`)
        .then(() => console.log('Directorio dataUser copiado!'))
        .catch((err: any) => console.error(err));
}
export {copiaUserDataDirdefault}

async function copiaPreferenciaBot(pathRoorUserData:string, bot:any) {
    await fse.copy(`Module/ConfigDefaultBrowser/Preferences_${bot}`, `${pathRoorUserData}/Default/Preferences`)
        .then(() => console.log(`Directorio Preferences_${bot} copiado!`))
        .catch((err:any) => console.error(err));
}
export {copiaPreferenciaBot}