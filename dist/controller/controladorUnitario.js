"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScrapUnitario {
    onScrapper(nombre_aseguradora) {
        switch (nombre_aseguradora) {
            case "Bolivar":
            /*    scrapSbs(data).then((respuesta)=>{
                    console.log(respuesta)
                })
                break;*/
            default:
                console.log("Valor por default");
                break;
        }
    }
}
exports.ScrapUnitario = ScrapUnitario;
