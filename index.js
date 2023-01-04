const express = require("express") //1. importamos express.js para poder utilizaro en el proyecto
const cors = require("cors")

const app = express() // 2. creammos una aplicacion con expressjs

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador {
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) =>{ // 3. le dijimos a expres que cuando en la url o raiz reciba una peticion responda hola
    
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")
    
    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if ( jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) =>{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0 

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if ( jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.i)

    res.send({
        enemigos
    })
})

app.listen(8080, () =>{ // 4. ñe decimos q escuche en el puerto 8080 las peticiones de los clietes para q les pueda responder
    console.log("servidor funcionando")
})