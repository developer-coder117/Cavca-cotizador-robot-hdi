import Server from './server/server'

const server = Server.init(3001)

server.start(()=>{
    console.log("Servidor arriba")
})

