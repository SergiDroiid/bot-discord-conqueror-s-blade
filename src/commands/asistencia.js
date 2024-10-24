const { proxima_guerra } = require('../functions/functions.js')
const { mensaje } = require('../functions/functions.mensaje.js')
const { ordenar_nombres, remover_elemento_lista } = require('../functions/functions.datos.js')
module.exports = {
    nombre: 'asistencia',
    descripcion: 'Desplegará un mensaje para confirmar la asistencia.',
    async execute(message, comando_completo, client, channel_id) {
        let codigo = comando_completo.split(/ /g)
        if (codigo.length == 2)
            if (codigo[1].length > 8)
                channel_id = codigo[1]
        if (channel_id < 2)
            channel_id = message.channel.id
        let lista_usuarios = [['---'], ['---'], ['---']],
            lista_id = [['---'], ['---'], ['---']]
        let msj = mensaje('Asistencia', `Marcar asistencia para la guerra ${proxima_guerra()}`)
        msj.addFields(
            {name: 'Asisten', value: '---', inline: true},
            {name: 'No asisten', value: '---', inline: true},
            {name: 'Tal vez asistan', value: '---', inline: true}
        )
        message.channel.send(`@everyone`)
        let msg_embed = await message.channel.send(msj)
        msg_embed.react('✅')
        msg_embed.react('❎')
        msg_embed.react('❔')
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return
            if (!reaction.message.guild) return
            if (reaction.message.channel.id == channel_id && msg_embed.id == reaction.message.id) {
                if (reaction.emoji.name === '✅') {
                    // console.log(reaction.users.cache.find(e => e.id == user.id))
                    lista_id[0].push(user.id)
                    lista_usuarios[0].push(user.username)
                    // console_name_id(user.username, user.id, true, 's')
                } else if (reaction.emoji.name === '❎') {
                    lista_id[1].push(user.id)
                    lista_usuarios[1].push(user.username)
                    // console_name_id(user.username, user.id, true, 'n')
                } else if (reaction.emoji.name === '❔') {
                    lista_id[2].push(user.id)
                    lista_usuarios[2].push(user.username)
                    // console_name_id(user.username, user.id, true, '?')
                } else {
                    return
                }
                msg_embed.edit(mensaje('Asistencia', `Marcar asistencia para la guerra ${proxima_guerra()}`).addFields(
                    {name: 'Asisten', value: `${ordenar_nombres(lista_usuarios[0])}`, inline: true},
                    {name: 'No asisten', value: `${ordenar_nombres(lista_usuarios[1])}`, inline: true},
                    {name: 'Tal vez asistan', value: `${ordenar_nombres(lista_usuarios[2])}`, inline: true}
                ))
            }
        })
        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return
            if (!reaction.message.guild) return
            if (reaction.message.channel.id == channel_id && msg_embed.id == reaction.message.id) {
                if (reaction.emoji.name === '✅') {
                    remover_elemento_lista(lista_usuarios[0], user.username)
                    remover_elemento_lista(lista_id[0], user.id)
                    // console_name_id(user.username, user.id, false, 's')
                } else if (reaction.emoji.name === '❎') {
                    remover_elemento_lista(lista_usuarios[1], user.username)
                    remover_elemento_lista(lista_id[1], user.id)
                    // console_name_id(user.username, user.id, false, 'n')
                } else if (reaction.emoji.name === '❔') {
                    remover_elemento_lista(lista_usuarios[2], user.username)
                    remover_elemento_lista(lista_id[2], user.id)
                    // console_name_id(user.username, user.id, false, '?')
                } else {
                    return
                }
                msg_embed.edit(mensaje('Asistencia', `Marcar asistencia para la guerra ${proxima_guerra()}`).addFields(
                    {name: 'Asisten', value: `${ordenar_nombres(lista_usuarios[0])}`, inline: true},
                    {name: 'No asisten', value: `${ordenar_nombres(lista_usuarios[1])}`, inline: true},
                    {name: 'Tal vez asistan', value: `${ordenar_nombres(lista_usuarios[2])}`, inline: true}
                ))
            }
        })
    }
}

function console_name_id (name, id, ingresaS_N, participa) {
    console.log(`${ingresaS_N ? 'Marcó, ' : 'Desmarcó, '}Nombre: ${name} ID: ${id} ${participa == 's' ? 'asistirá' : 
    (participa == 's' ? 'no asistirá' : 
    (participa == '?' ? 'tal vez asistirá' : '')
    )}`)
}