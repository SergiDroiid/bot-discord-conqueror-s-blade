const { mensaje } = require('../functions/functions.mensaje.js')
const { caballeria } = require('../functions/functions.datos.js')
const { mostrar_por_color } = require('../functions/functions.imprimir.js')
module.exports = {
    nombre: 'caballeria',
    descripcion: 'Mostrará todas las unidades de caballeria, ordenadas por edad.',
    execute(message) {
        let msj = mensaje(':horse: Caballería', `\n`, [
            {name: 'Amarillo', value: `${mostrar_por_color(caballeria, 0)}`},
            {name: 'Morado', value: `${mostrar_por_color(caballeria, 1)}`},
            {name: 'Azul', value: `${mostrar_por_color(caballeria, 2)}`},
            {name: 'Verde', value: `${mostrar_por_color(caballeria, 3)}`},
            {name: 'Blanco', value: `${mostrar_por_color(caballeria, 4)}`}
        ])
        message.channel.send(msj)
    }
}