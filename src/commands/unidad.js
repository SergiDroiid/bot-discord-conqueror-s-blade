const { mensaje } = require('../functions/functions.mensaje.js')
const { capitalize } = require('../functions/functions.js')
const path = require('path')
module.exports = {
    nombre: 'unidad',
    descripcion: 'Mostrará la unidad respectiva que se llame con toda la información correspondiente.',
    execute(message, datos, nombre_llamado) {
        let nombres = `Unidad llamada con los sig. nombres: ${capitalize(datos[4][0])}`, 
            temporada
        for (let i = 1; i < datos[4].length; i++)
            nombres = nombres + `, ${capitalize(datos[4][i])}`
        if (datos[1].length > 1)
            temporada = {name: 'Temporada', value: `${capitalize(datos[1])}`, inline: true}
        else
            temporada = {name: 'Temporada', value: 'No incluye', inline: true}
        let info = ''
        for (const dato of datos[5]) {
            info = `${info}Por: **${dato[3]}**, **${dato[1].toUpperCase()}** - ${dato[2]}\n`
        }
        let msj = mensaje(`${capitalize(nombre_llamado)}`, `${nombres}\n${info}`, [
            {name: 'Liderazgo', value: `${datos[0]}`, inline: true},
            {name: 'Liderazgo -16%', value: `${Math.trunc(datos[0]*(1-0.16))}`, inline: true},
            temporada
        ], path.join(__dirname, `../images/unidades/${datos[4][0]}`), '1.png', '2.png')
        message.channel.send(msj).catch(e => {console.log(`${e}`)})
    }
}