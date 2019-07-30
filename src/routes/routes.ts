
import {HdiBot} from '../controller/HdiBot'
class Routes {
    app:any
    constructor(app_:any){
        this.app = app_
    }
    appRoutes(){
        this.app.post("/hdi",(req:any,res:any)=>{
            new HdiBot().cotizar();
            res.send('OK')
        })
    }
}

export {Routes}