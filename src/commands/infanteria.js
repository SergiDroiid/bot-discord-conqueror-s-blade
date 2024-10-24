const { mensaje } = require('../functions/functions.mensaje.js')
const { infanteria } = require('../functions/functions.datos.js')
const { mostrar_por_color } = require('../functions/functions.imprimir.js')
module.exports = {
    nombre: 'infanteria',
    descripcion: 'Mostrará todas las unidades de infantería, ordenadas por edad.',
    execute(message) {
        let msj = mensaje(':dagger: Infantería', `\n`, [
            {name: 'Amarillo', value: `${mostrar_por_color(infanteria, 0)}`},
            {name: 'Morado', value: `${mostrar_por_color(infanteria, 1)}`},
            {name: 'Azul', value: `${mostrar_por_color(infanteria, 2)}`},
            {name: 'Verde', value: `${mostrar_por_color(infanteria, 3)}`},
            {name: 'Blanco', value: `${mostrar_por_color(infanteria, 4)}`}
        ])
        message.channel.send(msj)
    }
}