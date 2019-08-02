import express =  require('express')
import bodyparser = require ('body-parser')
import {ejecutar} from '../controller/test'
import data from '../data/config.json'
import {Routes} from '../routes/routes'
import {HdiBot} from '../controller/HdiBot'
import {MapfreBot} from '../controller/MapfreBot'
import { SbsBot } from '../controller/SbsBot';
import { AxaBot } from '../controller/AxaBot';
import { SEBot } from '../controller/SegurosEstado';
export default class  Server{
    app:express.Application 
    port:number
    constructor(puerto:number){
        this.port = puerto
        this.app = express()
    }
    static init(port:number){
        return new Server(port)
    }
    //zona de middlewares
    appConfig(){
        this.app.use(bodyparser.urlencoded({extended:false}))
        this.app.use(bodyparser.json())
    }
    //Incluimos archivos para rutas
    includeRoutes(){
        new Routes(this.app).appRoutes()
    }
    start(callback:Function) {
        this.app.listen(this.port,callback())
        //new HdiBot().cotizar();
        //new MapfreBot().cotizar();
        //new SbsBot().cotizar();
        //new AxaBot().cotizar();
        new SEBot().cotizar()
        this.appConfig()
        this.includeRoutes()
    }
}
