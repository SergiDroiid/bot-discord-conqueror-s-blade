const { mensaje } = require('../functions/functions.mensaje.js')
const { distancia } = require('../functions/functions.datos.js')
const { mostrar_por_color } = require('../functions/functions.imprimir.js')
module.exports = {
    nombre: 'distancia',
    descripcion: 'Mostrará todas las unidades de distancia, ordenadas por edad.',
    execute(message) {
        let msj = mensaje(':bow_and_arrow: Distancia', `\n`, [
            {name: 'Amarillo', value: `${mostrar_por_color(distancia, 0)}`},
            {name: 'Morado', value: `${mostrar_por_color(distancia, 1)}`},
            {name: 'Azul', value: `${mostrar_por_color(distancia, 2)}`},
            {name: 'Verde', value: `${mostrar_por_color(distancia, 3)}`},
            {name: 'Blanco', value: `${mostrar_por_color(distancia, 4)}`}
        ])
        message.channel.send(msj)
    }
}