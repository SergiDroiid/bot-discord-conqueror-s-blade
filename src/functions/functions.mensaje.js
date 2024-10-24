const { MessageEmbed, MessageAttachment } = require('discord.js')

function mensaje(titulo, descripcion, fields=[], dir_foto='', nom_foto_veterania='', nom_foto_unidad='', color='0xffff00', thumbnail_icon='') {
    const embed = new MessageEmbed()
    if (dir_foto.length > 1) {
        const attachment = new MessageAttachment(`${dir_foto}/${nom_foto_veterania}`, nom_foto_veterania)
        const attachment_thumbnail = new MessageAttachment(`${dir_foto}/${nom_foto_unidad}`, nom_foto_unidad)
        embed
        .setColor(color)
        .attachFiles(attachment_thumbnail)
        .setThumbnail(`attachment://${nom_foto_unidad}`)
        .setTitle(titulo)
        .setDescription(descripcion)
        .addFields(fields)
        .attachFiles(attachment)
        .setImage(`attachment://${nom_foto_veterania}`)
        return embed
    } else {
        embed
        .setColor(color)
        .setTitle(titulo)
        .setDescription(descripcion)
        .addFields(fields)
        return embed
    }
}

module.exports = {
    mensaje
}