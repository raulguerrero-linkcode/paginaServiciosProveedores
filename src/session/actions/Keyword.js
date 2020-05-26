export const crearKeyword = texto => {

    const arregloKeywords = []
    const arregloPalabras = texto.match(/("[^"]+"|[<^"\s]+)/g)

    arregloPalabras.forEach(palabra => {
        let palabraResumida= ""

        palabra.split("").forEach(letra => {
            palabraResumida += letra
            arregloKeywords.push(palabraResumida.toLowerCase())
        })
    })

    let letraResumida=""
    texto.split("").forEach(letra => {
        letraResumida += letra
        arregloKeywords.push(letraResumida.toLowerCase())
    })

return arregloKeywords

}