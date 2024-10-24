/**
 * Función que pone todo la primera letra en mayúscula mientras que las demás en minúscula.
 * @param {String} palabra palabra u oración que se modificará.
 * @returns {String} Retorna la palabra modificada.
 */
function capitalize(palabra) {
    return palabra[0].toUpperCase() + palabra.substring(1).toLowerCase()
}
/**
 * Función que agrupa el día y hora actual según la zona que se haya establecido.
 * @param {String} zona Es el nombre de la zona que se quiere saber. 
 * @param {Number} dias_agregados Son los próximos días que se agregan al día actual
 * @returns {String[]} Entregará la lista con el día y la hora respectivamente en una lista.
 */
function dia_hora_por_pais(zona, dias_agregados=0) {
    //Números importantes en getday: 2 y 6
    let dia = new Date()
    dia.setDate(dia.getDate()+dias_agregados)
    let hora = new Date("January 1, 2022 20:00:00")
    return [dia.toLocaleDateString('es-ES', {timeZone: zona}), hora.toLocaleTimeString('es-ES', {timeZone: zona})]
}
/**
 * Función que cuenta los días para la siguiente guerra.
 * @returns {Number} Retorna el número de días que separa para las próximas guerras.
 */
function proxima_guerra_numero() {
    let hoy = new Date()
    let proxima_guerra = hoy.getDay()
    while (true)
        if (proxima_guerra === 2 || proxima_guerra === 6)
            break
        else
            proxima_guerra++
    return Math.abs(hoy.getDay()-proxima_guerra)
}
/**
 * Función que calcula las fechas de los países.
 * @returns Retorna todos los países que estén la fecha y hora respectiva.
 */
function fecha(es_hoy=true) {
    let lista_paises = [
        dia_hora_por_pais('America/Santiago', proxima_guerra_numero()),
        dia_hora_por_pais('America/Argentina/Buenos_Aires', proxima_guerra_numero()),
        dia_hora_por_pais('America/Sao_Paulo', proxima_guerra_numero())]
    let nombre_paises = ['Chile', 'Argentina', 'Brasil']
    let nombre = `Horario en: ${nombre_paises[0]} ${lista_paises[0][1]}`
    for (let i = 1; i < lista_paises.length; i++)
        nombre = `${nombre}, ${nombre_paises[i]} ${lista_paises[i][1]}`
    return nombre
}
/**
 * Función que calcula la fecha de la próxima guerra según donde se encuentre el servidor.
 * @returns Retorna la fecha de la próxima guerra.
 */
function proxima_guerra() {
    return `${dia_hora_por_pais('America/Sao_Paulo', proxima_guerra_numero())[0]}`
}

module.exports = {
    capitalize,
    proxima_guerra
}