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
const path_1 = __importDefault(require("path"));
const promise_retry_1 = __importDefault(require("promise-retry"));
const replace_in_file_1 = __importDefault(require("replace-in-file"));
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
//Block image function
function blockImage(page) {
    return __awaiter(this, void 0, void 0, function* () {
        page.on('request', (req) => {
            if (req.resourceType() === 'image') {
                req.abort();
            }
            else {
                req.continue();
            }
        });
    });
}
exports.blockImage = blockImage;
//Block alert function
function blockAlert(page) {
    return __awaiter(this, void 0, void 0, function* () {
        page.on('dialog', (dialog) => __awaiter(this, void 0, void 0, function* () {
            yield dialog.dismiss();
        }));
    });
}
exports.blockAlert = blockAlert;
//Repair browser function
function repairBrowser(puppeteer, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const repairBrowser = yield puppeteer.launch({
            headless: process.env.headlessState || false,
            userDataDir: path
        });
        return repairBrowser.close();
    });
}
exports.repairBrowser = repairBrowser;
//Randomize Waits, random timeouts
function RandomizeWaits() {
    let random_wait = 1000;
    random_wait += Math.floor(Math.random() * 2) * 1000;
    random_wait += Math.floor(Math.random() * 9) * 100;
    random_wait += Math.floor(Math.random() * 9) * 10;
    random_wait += Math.floor(Math.random() * 9) * 1;
    return random_wait;
}
exports.RandomizeWaits = RandomizeWaits;
function Comparacion(str1, str2) {
    function normalize(str) {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc", mapping = {};
        for (var i = 0, j = from.length; i < j; i++)
            mapping[from.charAt(i)] = to.charAt(i);
        return function (str) {
            var ret = [];
            for (var i = 0, j = str.length; i < j; i++) {
                var c = str.charAt(i);
                if (mapping.hasOwnProperty(str.charAt(i)))
                    ret.push(mapping[c]);
                else
                    ret.push(c);
            }
            return ret.join('');
        };
    }
    ;
    let minuscula = (str1 = "") => {
        str1 = str1.toLowerCase();
        return str1;
    };
    if (normalize(minuscula(str1)) == normalize(minuscula(str2))) {
        return true;
    }
    else {
        return false;
    }
}
exports.Comparacion = Comparacion;
function dividirCadena(str1, separador) {
    return __awaiter(this, void 0, void 0, function* () {
        let arrayDeCadenas = str1.split(separador);
        return arrayDeCadenas;
    });
}
exports.dividirCadena = dividirCadena;
function reintentar(nomFuncion, resq, nom) {
    return __awaiter(this, void 0, void 0, function* () {
        let retorno = null;
        if (nom == 'bolibar') {
            retorno = {
                value1: 0,
                value2: 0,
                value3: 0
            };
        }
        else {
            retorno = { value: 0 };
        }
        try {
            const value = yield promise_retry_1.default((retry, number) => {
                console.log('attempt number', number);
                return nomFuncion(resq)
                    .catch(retry);
            }, { retries: 0 });
            return value || retorno;
        }
        catch (e) {
            return retorno;
        }
    });
}
exports.reintentar = reintentar;
function cambiaDirectorioDescarga(botNameDir, dirUserDataBot) {
    return __awaiter(this, void 0, void 0, function* () {
        const puppeteer = require('puppeteer');
        const browser = yield puppeteer.launch({
            headless: process.env.headlessState || false,
            userDataDir: dirUserDataBot
        });
        try {
            const page = yield browser.newPage();
        }
        finally {
            yield browser.close();
        }
        let file = yield path_1.default.normalize(`${dirUserDataBot}/Default/Preferences`);
        let conf = yield fs_1.default.readFileSync(file);
        // @ts-ignore
        let confSavefile = yield JSON.stringify(JSON.parse(conf).savefile);
        // @ts-ignore
        let confDownload = yield JSON.stringify(JSON.parse(conf).download);
        console.log('savefile', confSavefile);
        console.log('confDownload', confDownload);
        let rutaDescarga = yield path_1.default.normalize(`${process.cwd()}/Download/${botNameDir}`);
        rutaDescarga = (yield "\"") + rutaDescarga + "\"";
        rutaDescarga = yield rutaDescarga.replace(/\\/g, '\\\\');
        console.log('savefile a remplazar', `{"default_directory":${rutaDescarga},"directory_upgrade":true}`);
        console.log('savefile a remplazar', `{"default_directory":${rutaDescarga}}`);
        try {
            const options1 = {
                files: file,
                from: confSavefile,
                to: `{"default_directory":${rutaDescarga}}`,
            };
            console.log('opcion 1', options1);
            const changes = yield replace_in_file_1.default(options1);
            console.log('Modified files 1:', changes.join(', '));
        }
        catch (error) {
            console.error('Error occurred:', error);
        }
        try {
            const options2 = {
                files: file,
                from: confDownload,
                to: `{"default_directory":${rutaDescarga},"directory_upgrade":true}`,
            };
            const changes = yield replace_in_file_1.default(options2);
            console.log('Modified files 2:', changes.join(', '));
        }
        catch (error) {
            console.error('Error occurred:', error);
        }
    });
}
exports.cambiaDirectorioDescarga = cambiaDirectorioDescarga;
function copiaUserDataDirdefault(pathRootUserData) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({
            headless: false,
            userDataDir: pathRootUserData
        });
        try {
            const page = yield browser.newPage();
            yield page.goto("http://www.google.cl");
            yield browser.close();
        }
        catch (e) {
            yield browser.close();
            throw new Error(e);
        }
        const fse = require('fs-extra');
        yield fse.copy('Module/ConfigDefaultBrowser', `${pathRootUserData}/Default/`)
            .then(() => console.log('Directorio dataUser copiado!'))
            .catch((err) => console.error(err));
    });
}
exports.copiaUserDataDirdefault = copiaUserDataDirdefault;
function copiaPreferenciaBot(pathRoorUserData, bot) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs_extra_1.default.copy(`Module/ConfigDefaultBrowser/Preferences_${bot}`, `${pathRoorUserData}/Default/Preferences`)
            .then(() => console.log(`Directorio Preferences_${bot} copiado!`))
            .catch((err) => console.error(err));
    });
}
exports.copiaPreferenciaBot = copiaPreferenciaBot;
