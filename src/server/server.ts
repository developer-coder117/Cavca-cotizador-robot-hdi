import express =  require('express')
import bodyparser = require ('body-parser')
import {ejecutar} from '../controller/test'
import data from '../data/config.json'
import {Routes} from '../routes/routes'
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
    start(callback:Function){
        this.app.listen(this.port,callback())
        /*
        this.app.post('/', (req,res)=>{
            
            let scrap = new ScrapUnitario()
            scrap.onScrapper("SBS")
            res.send('Hola mundo')
        })*/
        this.appConfig()
        this.includeRoutes()
    }
}
