const { mensaje } = require('../functions/functions.mensaje.js')
const path = require('path')
module.exports = {
    nombre: 'meta',
    descripcion: 'Mostrará la casa actual en cb.',
    execute(message, client, channel_id) {
        let msj = mensaje(' META DE UNIDADES EN ESTA SEASON', `\n`, [], 
                          path.join(__dirname, `../images/imagenes/`), 'meta.png', 'logocasa.png')
        message.channel.send(msj).catch(e => {console.log(`${e}`)})
    }
}