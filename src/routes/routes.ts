
import {BolivarBot} from '../controller/BolivarBot'
class Routes {
    app:any
    constructor(app_:any){
        this.app = app_
    }
    appRoutes(){
        this.app.post("/aseguradora",(req:any,res:any)=>{
            let body = req.body
            let nombreAseguradora = body.nombre
            //new ScrapUnitario().onScrapper(nombreAseguradora)
            new BolivarBot().cotizar();
            res.send('OK')
        })
    }
}

export {Routes}