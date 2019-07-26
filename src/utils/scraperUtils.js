"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer_1 = require("puppeteer");
var path_1 = require("path");
var promise_retry_1 = require("promise-retry");
var replace_in_file_1 = require("replace-in-file");
var fs_1 = require("fs");
var fs_extra_1 = require("fs-extra");
//Block image function
function blockImage(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            page.on('request', function (req) {
                if (req.resourceType() === 'image') {
                    req.abort();
                }
                else {
                    req["continue"]();
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.blockImage = blockImage;
//Block alert function
function blockAlert(page) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            page.on('dialog', function (dialog) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, dialog.dismiss()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.blockAlert = blockAlert;
//Repair browser function
function repairBrowser(puppeteer, path) {
    return __awaiter(this, void 0, void 0, function () {
        var repairBrowser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({
                        headless: process.env.headlessState || false,
                        userDataDir: path
                    })];
                case 1:
                    repairBrowser = _a.sent();
                    return [2 /*return*/, repairBrowser.close()];
            }
        });
    });
}
exports.repairBrowser = repairBrowser;
//Randomize Waits, random timeouts
function RandomizeWaits() {
    var random_wait = 1000;
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
    var minuscula = function (str1) {
        if (str1 === void 0) { str1 = ""; }
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
    return __awaiter(this, void 0, void 0, function () {
        var arrayDeCadenas;
        return __generator(this, function (_a) {
            arrayDeCadenas = str1.split(separador);
            return [2 /*return*/, arrayDeCadenas];
        });
    });
}
exports.dividirCadena = dividirCadena;
function reintentar(nomFuncion, resq, nom) {
    return __awaiter(this, void 0, void 0, function () {
        var retorno, value, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    retorno = null;
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
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, promise_retry_1["default"](function (retry, number) {
                            console.log('attempt number', number);
                            return nomFuncion(resq)["catch"](retry);
                        }, { retries: 0 })];
                case 2:
                    value = _a.sent();
                    return [2 /*return*/, value || retorno];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, retorno];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.reintentar = reintentar;
function cambiaDirectorioDescarga(botNameDir, dirUserDataBot) {
    return __awaiter(this, void 0, void 0, function () {
        var puppeteer, browser, page, file, conf, confSavefile, confDownload, rutaDescarga, options1, changes, error_1, options2, changes, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    puppeteer = require('puppeteer');
                    return [4 /*yield*/, puppeteer.launch({
                            headless: process.env.headlessState || false,
                            userDataDir: dirUserDataBot
                        })];
                case 1:
                    browser = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, , 4, 6]);
                    return [4 /*yield*/, browser.newPage()];
                case 3:
                    page = _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, browser.close()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [4 /*yield*/, path_1["default"].normalize(dirUserDataBot + "/Default/Preferences")];
                case 7:
                    file = _a.sent();
                    return [4 /*yield*/, fs_1["default"].readFileSync(file)];
                case 8:
                    conf = _a.sent();
                    return [4 /*yield*/, JSON.stringify(JSON.parse(conf).savefile)];
                case 9:
                    confSavefile = _a.sent();
                    return [4 /*yield*/, JSON.stringify(JSON.parse(conf).download)];
                case 10:
                    confDownload = _a.sent();
                    console.log('savefile', confSavefile);
                    console.log('confDownload', confDownload);
                    return [4 /*yield*/, path_1["default"].normalize(process.cwd() + "/Download/" + botNameDir)];
                case 11:
                    rutaDescarga = _a.sent();
                    return [4 /*yield*/, "\""];
                case 12:
                    rutaDescarga = (_a.sent()) + rutaDescarga + "\"";
                    return [4 /*yield*/, rutaDescarga.replace(/\\/g, '\\\\')];
                case 13:
                    rutaDescarga = _a.sent();
                    console.log('savefile a remplazar', "{\"default_directory\":" + rutaDescarga + ",\"directory_upgrade\":true}");
                    console.log('savefile a remplazar', "{\"default_directory\":" + rutaDescarga + "}");
                    _a.label = 14;
                case 14:
                    _a.trys.push([14, 16, , 17]);
                    options1 = {
                        files: file,
                        from: confSavefile,
                        to: "{\"default_directory\":" + rutaDescarga + "}"
                    };
                    console.log('opcion 1', options1);
                    return [4 /*yield*/, replace_in_file_1["default"](options1)];
                case 15:
                    changes = _a.sent();
                    console.log('Modified files 1:', changes.join(', '));
                    return [3 /*break*/, 17];
                case 16:
                    error_1 = _a.sent();
                    console.error('Error occurred:', error_1);
                    return [3 /*break*/, 17];
                case 17:
                    _a.trys.push([17, 19, , 20]);
                    options2 = {
                        files: file,
                        from: confDownload,
                        to: "{\"default_directory\":" + rutaDescarga + ",\"directory_upgrade\":true}"
                    };
                    return [4 /*yield*/, replace_in_file_1["default"](options2)];
                case 18:
                    changes = _a.sent();
                    console.log('Modified files 2:', changes.join(', '));
                    return [3 /*break*/, 20];
                case 19:
                    error_2 = _a.sent();
                    console.error('Error occurred:', error_2);
                    return [3 /*break*/, 20];
                case 20: return [2 /*return*/];
            }
        });
    });
}
exports.cambiaDirectorioDescarga = cambiaDirectorioDescarga;
function copiaUserDataDirdefault(pathRootUserData) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, e_2, fse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_1["default"].launch({
                        headless: false,
                        userDataDir: pathRootUserData
                    })];
                case 1:
                    browser = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 8]);
                    return [4 /*yield*/, browser.newPage()];
                case 3:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto("http://www.google.cl")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6:
                    e_2 = _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 7:
                    _a.sent();
                    throw new Error(e_2);
                case 8:
                    fse = require('fs-extra');
                    return [4 /*yield*/, fse.copy('Module/ConfigDefaultBrowser', pathRootUserData + "/Default/")
                            .then(function () { return console.log('Directorio dataUser copiado!'); })["catch"](function (err) { return console.error(err); })];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.copiaUserDataDirdefault = copiaUserDataDirdefault;
function copiaPreferenciaBot(pathRoorUserData, bot) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1["default"].copy("Module/ConfigDefaultBrowser/Preferences_" + bot, pathRoorUserData + "/Default/Preferences")
                        .then(function () { return console.log("Directorio Preferences_" + bot + " copiado!"); })["catch"](function (err) { return console.error(err); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.copiaPreferenciaBot = copiaPreferenciaBot;
