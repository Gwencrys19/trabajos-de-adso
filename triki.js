const Indicacion_de_estado = document.querySelector('.Notificacion-juego'),
  Estado_del_juego = ["", "", "", "", "", "", "", "", ""],
  Ganadores = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  Mensaje_ganadores = () => `El Jugador ${Jugador_actual} Ha Ganado >.< !`,
  Mensaje_de_empate = () => `El Juego Ha Terminado En Empate!`,
  Turno_del_jugador = () => `Turno Del Jugador ${Jugador_actual}`


let Juego_activo = true,
  Jugador_actual = "O"



function main() {
  Pantalla_del_juego(Turno_del_jugador())
  listeners()
}

function listeners() {
  document.querySelector('.con-juego').addEventListener('click', Click_en_celda)
  document.querySelector('.Restablecer').addEventListener('click', Restablecer_juego)
}

function Pantalla_del_juego(message) {
  Indicacion_de_estado.innerHTML = message
}

function Restablecer_juego() {
  Juego_activo = true
  Jugador_actual = "X"
  Reinicar_juego()
  Pantalla_del_juego(Turno_del_jugador())
  document.querySelectorAll('.celdas').forEach(cell => cell.innerHTML = "")
}

function Click_en_celda(Click_celdaEvent ) {
  const Click_celda = Click_celdaEvent.target
  if (Click_celda.classList.contains('celdas')) {
    const Click_celdaIndex = Array.from(Click_celda.parentNode.children).indexOf(Click_celda)
    if (Estado_del_juego[Click_celdaIndex] !== '' || !Juego_activo) {
      return false
    }

    manjeo_de_celda(Click_celda, Click_celdaIndex)
    Resultado_de_validacion()
  }
}

function manjeo_de_celda(Click_celda , Click_celdaIndex) {
  Estado_del_juego[Click_celdaIndex] = Jugador_actual
  Click_celda.innerHTML = Jugador_actual 
}

function Resultado_de_validacion() {
  let Ronda_ganada = false
  for (let i = 0; i < Ganadores.length; i++) { 
    const Condicion_de_ganar = Ganadores[i] 
    let Posicion1 = Estado_del_juego[Condicion_de_ganar[0]],
      Posicion2 = Estado_del_juego[Condicion_de_ganar[1]],
      Posicion3 = Estado_del_juego[Condicion_de_ganar[2]] 

    if (Posicion1 === '' || Posicion2 === '' || Posicion3 === '') {
      continue; 
    }
    if (Posicion1 === Posicion2 && Posicion2 === Posicion3) {
      Ronda_ganada = true 
      break
    }
  }

  if (Ronda_ganada) {
    Pantalla_del_juego(Mensaje_ganadores())
    Juego_activo = false
    return
  }

  let Ronda_empatado = !Estado_del_juego.includes("") 
  if (Ronda_empatado) {
    Pantalla_del_juego(Mensaje_de_empate())
    Juego_activo = false
    return
  }

  Cambio_de_jugadores()
}

function Cambio_de_jugadores() {
  Jugador_actual = Jugador_actual === "X" ? "O" : "X"
  Pantalla_del_juego(Turno_del_jugador())
}

function Reinicar_juego() {
  let i = Estado_del_juego.length
  while (i--) {
    Estado_del_juego[i] = ''
  }
}

main()