const { mensaje } = require('../functions/functions.mensaje.js')
module.exports = {
    nombre: 'unidades',
    descripcion: 'Mostrará detalles de 3 categorías a elegir: infantería, caballería y distancia.',
    execute(message, client) {
        let msj = mensaje('Unidades', `Selecciona el listado de unidades\n
        :dagger: **Infantería**
        :horse: **Caballería**
        :bow_and_arrow: **Distancia**`)
        message.channel.send(msj).then(msg => {
            msg.react('🗡️')
            msg.react('🐴')
            msg.react('🏹')
            const filter = (reaction, user) => {
                return ['🗡️', '🐴', '🏹'].includes(reaction.emoji.name) && user.id == message.author.id;
            }
            msg.awaitReactions(filter, { max: 1, time: 10000 }).then(collect => {
                const reaction = collect.first()
                if(reaction.emoji.name === '🗡️')
                    client.commands.get('infanteria').execute(msg)
                else if(reaction.emoji.name === '🐴')
                    client.commands.get('caballeria').execute(msg)
                else if(reaction.emoji.name === '🏹')
                    client.commands.get('distancia').execute(msg)
            }).catch(e => {
                console.log('Llamaron al comando unidades y nadie contestó')})
        })
    }
}