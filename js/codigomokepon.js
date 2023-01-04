const seccionSeleccionarAtaque=document.getElementById("escoger-ataque")// traeos la seccion a ocultar
const seccionReiniciar=document.getElementById("reiniciar")
const botonSelecMascota=document.getElementById('boton-selecmascotas')//traer documnto y elemento con id:::()

const botonReiniciar=document.getElementById("boton-reiniciar")


const seccionSeleccionarMascota=document.getElementById("escoger-mascota")

const spanMascotaJugador=document.getElementById("mascotaJugador")

const spanMascotaEnemiga=document.getElementById("mascotaEnemiga")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const seccionMensajes=document.getElementById("resultado")
const ataquesDelJugador=document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo=document.getElementById("ataques-del-enemigo")
const contenedorDePersonajes=document.getElementById("contenedorDePersonajes")

const contenedorAtaques=document.getElementById("contenedorAtaques")

const selectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let mokepones =[]
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionesDeMokepones
let inputHopopotom
let inputTerrierom
let inputCharizart
let personajeJugador
let personajeJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo 
let botonFuego
let botonAgua
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let botonTierra
let victoriasJugador= 0
let victoriasEnemigo= 0
let vidasJugador= 3
let vidasEnemigo= 3
let lienzo= mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./imagesmokepon/mapas.jpg"

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -20
const anchoMaximoDelMapa = 600
if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa -20
}

alturaQueBuscamos = anchoDelMapa * 600/800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class PersonajesMokepon {
    constructor(nombre, foto, vidas, id =null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vidas = vidas
        this.ataques = []
        this.ancho = 50
        this.alto = 50
        this.x = aleatorio(0,mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
       
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0

    } 
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipopotom = new PersonajesMokepon("Hipopotom", "./imagesmokepon/hipopotom.png", 5)
let terrierom = new PersonajesMokepon("Terrierom", "./imagesmokepon/terripon.png", 5)
let charizart = new PersonajesMokepon("Charizart", "./imagesmokepon/charizart.png", 5)

const HIPOPOTOM_ATAQUES = [
    { nombre: "AGUA! 💧", id: "boton-agua" },
    { nombre: "AGUA! 💧", id: "boton-agua" },
    { nombre: "AGUA! 💧", id: "boton-agua" },
    { nombre: "FUEGO! 🔥", id: "boton-fuego" },
    { nombre: "TIERRA! 🌱", id: "boton-tierra" }
]
hipopotom.ataques.push(...HIPOPOTOM_ATAQUES)
const TERRERIEROM_ATAQUES = [
    { nombre: "TIERRA! 🌱", id: "boton-tierra" },
    { nombre: "TIERRA! 🌱", id: "boton-tierra" },
    { nombre: "TIERRA! 🌱", id: "boton-tierra" },
    { nombre: "AGUA! 💧", id: "boton-agua" },
    { nombre: "FUEGO! 🔥", id: "boton-fuego" }
]
terrierom.ataques.push(...TERRERIEROM_ATAQUES)
const CHARIZART_ATAQUES = [
    { nombre: "FUEGO! 🔥", id: "boton-fuego" },
    { nombre: "FUEGO! 🔥", id: "boton-fuego" },
    { nombre: "FUEGO! 🔥", id: "boton-fuego" },    
    { nombre: "AGUA! 💧", id: "boton-agua" },    
    { nombre: "TIERRA! 🌱", id: "boton-tierra" }
]
charizart.ataques.push(...CHARIZART_ATAQUES)


mokepones.push(hipopotom,terrierom,charizart)/* aca ponemos las variables con toda su info al array o arreglo []  */

function iniciarJuego(){ //en esta funcion se llama para cargar todo el html: window.addEventListener("load", iniciarJuego)
    

seccionSeleccionarAtaque.style.display ="none"//style.display = "none" se esconde la seccion con id.
selectionVerMapa.style.display="none"

mokepones.forEach((mokepon) =>{ /* ciclos: manipulando el dom con iteraciones... forma de iterar todos los elementos de un arreglo */
    opcionesDeMokepones = `
    <input type="radio" name="mascotas" id=${mokepon.nombre} />
    <label class="tarjeta-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
    </label>
    `
    contenedorDePersonajes.innerHTML +=  opcionesDeMokepones 
    
    inputHopopotom=document.getElementById("Hipopotom")//con    hacemos una variable dandole propiedad de llamado
    inputTerrierom=document.getElementById("Terrierom")
    inputCharizart=document.getElementById("Charizart")
})

seccionReiniciar.style.display = "none"

botonSelecMascota.addEventListener("click", seleccionarMascota)//el elemento lo traemos y le damos click 

botonReiniciar.addEventListener("click", reiniciarJuego)

unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
    
        .then(function (res){
            
            if (res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascota(){
    
    //seccionSeleccionarAtaque.style.display ="flex"//al momento de llegar al punto de lectura q se necesita se actiba con block
    
    seccionSeleccionarMascota.style.display = "none"
    
   
     //funsion fillrect hace un rectangulo dentro del camvas.. posicion en x,y anchoy alto
    

    if (inputHopopotom.checked){
        spanMascotaJugador.innerHTML= inputHopopotom.id
        personajeJugador = inputHopopotom.id

    } else if (inputTerrierom.checked){
        spanMascotaJugador.innerHTML= inputTerrierom.id
        personajeJugador = inputTerrierom.id
    } else if (inputCharizart.checked){
        spanMascotaJugador.innerHTML= inputCharizart.id
        personajeJugador = inputCharizart.id
    } else {
        alert("Selecciona alguna mascota")
    }

    seleccionarMokepon(personajeJugador)

    extraerAtaques(personajeJugador)
    selectionVerMapa.style.display="flex"
    iniciarMapa()
    
}

function seleccionarMokepon(personajeJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            mokepon: personajeJugador
        })
    })
}

function extraerAtaques(personajeJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (personajeJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}


function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{ 
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
       
        contenedorAtaques.innerHTML += ataquesMokepon
        
    })
    botonFuego=document.getElementById("boton-fuego")
    botonAgua=document.getElementById("boton-agua")
    botonTierra=document.getElementById("boton-tierra")

    botones=document.querySelectorAll(".BAtaque") /* query. estamosdiciendo q seleccione a todos los documenteos q tengan algo.en este caso una clase. las clases se pueden repetir pero los id no.. es mala practica */
    
   
}

function secuenciaAtaque(){
    /* iteramos botones y con el foreach. por cada boton q exista en arreglo de botones tiene q hacer algo. */
    botones.forEach((boton) =>{
        /* para todos los botones va a ser un evento en este caso click. la e es el evento mismo a traer, con esto va a mostrar el evento q esta realizando */
        boton.addEventListener("click", (e) =>{
            if (e.target.textContent ==="AGUA! 💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true

            }else if (e.target.textContent ==="FUEGO! 🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            
            }else {
                    ataqueJugador.push("TIERRA")
                    console.log(ataqueJugador)
                    boton.style.background = "#112f58"
                    boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
    
}

function seleccionarMascotaEnemigo(enemigo){
    
    let mascotaAleatorio=aleatorio(0,mokepones.length -1)
    spanMascotaEnemiga.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo=enemigo.ataques

    secuenciaAtaque()

}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio=aleatorio(0,ataquesMokeponEnemigo.length -1)
    if (ataqueAleatorio==0 || ataqueAleatorio==1){
        ataqueEnemigo.push("FUEGO")
    } else if(ataqueAleatorio==3 || ataqueAleatorio==4){
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
    
}

function iniciarPelea (){
    if (ataqueJugador.length ===5) {
        
        combate()
    }
}
function indexAmbosOponentes(jugador,enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
            
            spanVidasJugador.innerHTML = victoriasJugador
        
        } else if (ataqueJugador[index]=="FUEGO" && ataqueEnemigo[index]=="TIERRA"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index]=="AGUA" && ataqueEnemigo[index]=="FUEGO"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index]=="TIERRA" && ataqueEnemigo[index]=="AGUA"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo

        }
        
    }
    revisarVidas()
}
function revisarVidas(){
    if (victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("esto fue un empate")

    } else if (victoriasJugador>victoriasEnemigo){
        crearMensajeFinal("ganaste")    
    }else {
        crearMensajeFinal("lo siento, perdiste")
    }

}

function crearMensaje(resultado){//crear mensajes
    

    
    let nuevoAtaqueJugador=document.createElement("p")
    let nuevoAtaqueEnemigo=document.createElement("p")

    seccionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
        
    
    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}
function crearMensajeFinal(resultadoFinal){//crear mensajes
    
    
    seccionMensajes.innerHTML="Tu mascota tiene "+victoriasJugador+ ", La mascota del enemigo tiene "+victoriasEnemigo+", "+resultadoFinal
    


   
    
    seccionReiniciar.style.display = "block"
}
function reiniciarJuego(){
    location.reload()//funcion de reiniciar cualquier locacion
}

function aleatorio(min,max) {//llamar a la funcion aletoriedad cuando se requiera
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pintarCanvas(){

    personajeJugadorObjeto.x = personajeJugadorObjeto.x + personajeJugadorObjeto.velocidadX
    personajeJugadorObjeto.y = personajeJugadorObjeto.y + personajeJugadorObjeto.velocidadY

    lienzo.clearRect(0,0,mapa.width, mapa.height)//funson para limpiar pantalla
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    
    personajeJugadorObjeto.pintarMokepon()

    enviarPosicion(personajeJugadorObjeto.x, personajeJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon){
        mokepon.pintarMokepon()
        revisarColicion(mokepon)
    })

}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res){
        if (res.ok) {
            res.json()
                .then(function ({enemigos}){
                    console.log(enemigos)
                    
                    mokeponesEnemigos = enemigos.map(function (enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipopotom") {
                            mokeponEnemigo = new PersonajesMokepon("Hipopotom", "./imagesmokepon/hipopotom.png", 5)
                        } else if (mokeponNombre === "Terrierom") {
                            mokeponEnemigo = new PersonajesMokepon("Terrierom", "./imagesmokepon/terripon.png", 5)
                        } else if (mokeponNombre === "Charizart") {
                            mokeponEnemigo = new PersonajesMokepon("Charizart", "./imagesmokepon/charizart.png", 5)
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        return mokeponEnemigo
                    })
                })
        }
    })

}

function moverDerecha(){
    personajeJugadorObjeto.velocidadX= +5
    

}
function moverIzquierda(){
    personajeJugadorObjeto.velocidadX= -5
    

}
function moverArriba(){
    personajeJugadorObjeto.velocidadY= -5
    

}
function moverAbajo(){
    personajeJugadorObjeto.velocidadY= +5
    

}
function detenerMovimiento(){
    personajeJugadorObjeto.velocidadX=0
    personajeJugadorObjeto.velocidadY=0
}
function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
    
        default:
            break;
    }
}
function iniciarMapa(){

    personajeJugadorObjeto = obtenerObjetoMascota(personajeJugador)
    intervalo = setInterval(pintarCanvas,50)

    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}
function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (personajeJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }

}
function revisarColicion(enemigo){

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaPersonaje = personajeJugadorObjeto.y
    const abajoPersonaje = personajeJugadorObjeto.y + personajeJugadorObjeto.alto
    const izquierdaPersonaje = personajeJugadorObjeto.x
    const derechaPersonaje = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho
   

    if (
        abajoPersonaje < arribaEnemigo ||
        arribaPersonaje > abajoEnemigo ||
        derechaPersonaje < izquierdaEnemigo ||
        izquierdaPersonaje > derechaEnemigo
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    seccionSeleccionarAtaque.style.display ="flex"
    selectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
    alert("colicion "+"con "+ enemigo.nombre)
}

window.addEventListener("load", iniciarJuego)// cargar en todo el codigo

