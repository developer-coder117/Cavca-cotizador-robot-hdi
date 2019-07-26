
import {BolivarBot} from '../controller/BolivarBot'
class Routes {
    app:any
    constructor(app_:any){
        this.app = app_
    }
    appRoutes(){
        this.app.post("/hdi",(req:any,res:any)=>{
            new BolivarBot().cotizar();
            res.send('OK')
        })
    }
}

export {Routes}