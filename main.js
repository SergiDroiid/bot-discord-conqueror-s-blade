const Discord = require('discord.js')
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] })

const message = new Discord.Message()
client.config = require('./config.json');
const fs = require('fs')
const { buscar_unidad } = require('./src/functions/functions.datos.js')

const prefijo = '*'
let channel_id = ''

client.commands = new Discord.Collection()
const comandos = fs.readdirSync('./src/commands/').filter(archivo => archivo.endsWith('.js'))
for (const archivo of comandos) {
    const comando = require('./src/commands/' + archivo)
    client.commands.set(comando.nombre, comando)
}

client.on('ready', () => {
    console.log(`Buenas. El bot ${client.user.tag} se ha despertado`)
})

client.on('message', msg => {
    if (!msg.content.startsWith(prefijo) || msg.author.bot)
        return
    const args = msg.content.slice(prefijo.length).split(/ +/)
    const comando = args.shift().toLowerCase()
    const comando_completo = msg.content.slice(prefijo.length).toLowerCase()

    if (comando === 'meta'|| comando === 'prueba')
        client.commands.get('meta').execute(msg, client)
    if (comando === 'unidades')
        client.commands.get('unidades').execute(msg, client)
    else if (['infantería', 'infanteria', 'melee'].find(palabra => {return palabra === comando}))
        client.commands.get('infanteria').execute(msg)
    else if (['caballeria', 'caballería', 'caballo'].find(palabra => {return palabra === comando}) && comando_completo.split(/ /g).length === 1)
        client.commands.get('caballeria').execute(msg)
    else if (['distancia', 'rango'].find(palabra => {return palabra === comando}))
        client.commands.get('distancia').execute(msg)
    else if (comando === 'asistencia')
        client.commands.get('asistencia').execute(msg, comando_completo, client, channel_id)
    else {
        let unidad = buscar_unidad(comando_completo)
        if (unidad.length !== 0)
            client.commands.get('unidad').execute(msg, unidad, comando_completo)
    }
})

client.login(client.config.TOKEN)