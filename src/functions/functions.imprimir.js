/**
 * Función que filtra por color las unidades.
 * @param {String[]} unidades_color Lista con las unidades según el tipo y principalmente el color.
 * @param {Number} index_color Posición de la lista de unidad que se medirá.
 * @returns {String} Si existe más de una unidad, tendrá información de las unidades, los nombres; caso contrario advertirá que existe unidades de ese color.
 */
function mostrar_por_color(unidades_color, index_color) {
    if (unidades_color[index_color].length === 0)
        return 'No existe unidades de este tipo.'
    let info = ''
    for (const unidad of unidades_color[index_color]) {
        info = info + `*${unidad[0]}\n`
    }
    return info
}

module.exports = {
    mostrar_por_color
}