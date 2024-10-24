const fs = require('fs')
const path = require('path')
/**
 * Función que discrimina entre el color de la unidad para su futuro almacenaje.
 * @param {String} color Color que caracteriza a la unidad respectiva a analizar.
 * @returns {Number} retorna la posición que se guardará la unidad.
 */
function color_unidad(color) {
    if(color === 'amarillo')        return 0
    else if (color === 'morado')    return 1
    else if (color === 'azul')      return 2
    else if (color === 'verde')     return 3
    else if (color === 'blanco')    return 4
    return 4
}
//nombre;info;lid;lid16;temp;recomend;otros_nombres->
//Nuevo
//nombre;lid;temporada;descripción;recomendación;otros_nombres->
/**
 * Tiene como funcionalidad almacenar los datos del archivo .csv sin el tipo y el color de la unidad.
 * @param {String[]} datos_unidad datos de la unidad con toda la información.
 * @returns {String[]} Retorna la lista con los datos necesarios.
 */
function datos_unidad_desordenados(datos_unidad) {
    let lista = []
    for (let i = 2; i <= 6; i++)
        lista.push(datos_unidad[i])
    lista.push(datos_unidad[7])
    if (datos_unidad.length > 8)
        for (let i = 8; i < datos_unidad.length; i++)
            if (datos_unidad[i].length > 1)
                lista.push(datos_unidad[i])
    return lista
}

// calidad;nombre;informacion;liderazgo;liderazgo16;tipo;temporada;recomendación;nombres->
// Nueva
// calidad;tipo_unidad;nombre;liderazgo;temporada;descripcion;recomendacion;nombre->
/**
 * Función que filtra los datos del archivo .csv para obtener y ordenar la información pertinente de cada unidad según su tipo y color.
 * @returns {String[][][]} Retorna todas las unidades ordenadas por tipo y discriminadas por su nivel.
 */
function manejo_datos () {
    file_path = path.join(__dirname, '../files/unidades.csv')
    const csv = fs.readFileSync(file_path, 'utf8')
    const lista = csv.toString().split('\n')
    //Orden: amarillo, morado, azul, verde, blanco
    let infanteria = [[], [], [], [], []],
        caballeria = [[], [], [], [], []],
        distancia = [[], [], [], [], []]
    for (const unidad of lista) {
        let datos_unidad = unidad.replace('\r', '').split(';')
        if (datos_unidad.length > 1 && datos_unidad !== undefined) {
            let color = datos_unidad[0].replace('﻿', '').toLowerCase()
            let tipo = datos_unidad[1].toLowerCase()
            if (tipo === 'infanteria')
                infanteria[color_unidad(color)].push(datos_unidad_desordenados(datos_unidad))
            else if (tipo === 'caballeria')
                caballeria[color_unidad(color)].push(datos_unidad_desordenados(datos_unidad))
            else if (tipo === 'distancia')
                distancia[color_unidad(color)].push(datos_unidad_desordenados(datos_unidad))
        }
    }
    return [infanteria, caballeria, distancia]
}

/**
 * Función que importa la información de las unidades hecha por la comunidad previamente filtrada.
 * Datos brutos: marca_temporal(publicación),nombre_usuario,nombre_unidad,recomendable(escala),descripción
 * 
 * Datos nuevos: nombre_unidad,recomendable(escala),descripción,nombre_usuario
 */
 function importar_informacion_unidad () {
    file_path = path.join(__dirname, '../files/datos_unidades.csv')
    const csv = fs.readFileSync(file_path, 'utf8')
    const lista = csv.toString().split('\n')
    let lista_nueva = []
    for (let index = 0; index < lista.length; index++) {
        let datos_unidad = lista[index].replace('\r', '').split(';')
        let lista_aux = []
        lista_aux.push(datos_unidad[2])
        lista_aux.push(datos_unidad[3])
        lista_aux.push(datos_unidad[4])
        lista_aux.push(datos_unidad[1])
        lista_nueva.push(lista_aux)
    }
    return lista_nueva
}

const datos_unidades = importar_informacion_unidad()
const unidades = manejo_datos()
const infanteria = unidades[0]
const caballeria = unidades[1]
const distancia = unidades[2]

function elegir_tipo (tipo) {
    if (tipo === 'infanteria')
        return infanteria
    else if (tipo === 'caballeria')
        return caballeria
    else if (tipo === 'distancia')
        return distancia
}
// Nombre de la unidad, tipo (infanteria, caballeria o distancia)

/**
 * Función que busca la unidad entre todo lo almacenado, obteniendo su información.
 * @param {String} nombre Nombre de la unidad que se está buscando.
 * @returns {String[]} Retorna la unidad con su información ordenada con el siguiente formato:
 * Liderazgo, temporada, descripción, recomendación, [nombres], [información]
 */
function buscar_unidad (nombre) {
    let lista = unidades
    for(const tipo of lista) {
        for (const unidad of tipo[0].concat(tipo[1]).concat(tipo[2]).concat(tipo[3]).concat(tipo[4])) {
            if (condicion_buscar_unidad(nombre, unidad)) {
                let nueva_lista = []
                for (let i = 1; i <= 4; i++)
                    nueva_lista.push(unidad[i])
                let lista_aux = []
                lista_aux.push(unidad[0])
                for (let i = 5; i < unidad.length; i++)
                    lista_aux.push(unidad[i])
                nueva_lista.push(lista_aux)
                let lista_toda_informacion = []
                for (const datos of datos_unidades) {
                    if (datos[0] == unidad[0]) {
                        let lista_auxiliar = []
                        lista_auxiliar.push(datos[1])
                        lista_auxiliar.push(datos[2])
                        lista_auxiliar.push(datos[3])
                        lista_toda_informacion.push(lista_auxiliar)
                    }
                }
                nueva_lista.push(lista_toda_informacion)
                return nueva_lista
            }
        }
    }
    return []
}
/**
 * Función que verifica los nombres si son correctos al arreglo de información entregado.
 * @param {String} nombre nombre de la unidad buscada
 * @param {String[]} unidad datos de la unidad entregada para comparar
 * @returns retorna verdadero si los parámetros concuerdan con al menos uno, caso contrario, falso.
 */
function condicion_buscar_unidad(nombre, unidad) {
    let lista = []
    lista.push(unidad[0])
    for (let index = 5; index <= unidad.length; index++) 
        lista.push(unidad[index])
    if (lista.find(nombre_unidad => nombre_unidad === nombre) !== undefined)
        return true
    else
        return false
}

/**
 * Función que transforma una lista de nombres en un string con todos los nombres en una columna.
 * @param {String[]} lista_nombre lista donde exista nombres,
 * @returns retorna un string de nombres en una columna.
 */
function ordenar_nombres (lista_nombre) {
    let nombres = ''
    for (const nombre of lista_nombre)
        nombres = `${nombres}${nombre}\n`
    if (nombres.length > 0)
        return nombres
    else
        return '---'
}
/**
 * Función que remueve un elemento de la lista.
 * @param {[]} lista lista que se buscará el elemento.
 * @param {String|Number} elemento_buscado elemento a buscar dentro de la lista.
 */
function remover_elemento_lista (lista, elemento_buscado) {
    for (let i = 0; i < lista.length; i++)
        if (lista[i] === elemento_buscado)
            lista.splice(i, 1)
}

module.exports = {
    infanteria,
    caballeria,
    distancia,
    buscar_unidad,
    ordenar_nombres,
    remover_elemento_lista
}