const { promises: fs } = require('fs')

class Contenedor{
    constructor(ruta){
        this.ruta = ruta
    }

    async save(nuevoObjeto){
        
        const objetos = await this.getAll()

        let newId
        if (objetos.length == 0){
            newId = 1
        }else {
           const ultimoId = parseInt(objetos[objetos.length - 1].id)
           newId = ultimoId + 1
        }

        objetos.push({...nuevoObjeto, id: newId})
        
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }


    async getById(id){
        const objetos = await this.getAll()
        const nuevoObjeto = objetos.filter(elemento => elemento.id === id)
        console.log(nuevoObjeto)
    }


    async getAll(){
        try {
                const objetos = await fs.readFile(this.ruta, 'utf8')
                return JSON.parse(objetos)
        } catch (error) {
                return []    
        }
    }


    async deleteById(id){
        const objetos = await this.getAll()
        const nuevoObjeto = objetos.filter(elemento => elemento.id !== id)
        if(nuevoObjeto.length === objetos.length){
            throw new Error(`error al borrar: no se encontro el id ${id}`)
        }
        try {
            await fs.writeFile(this.ruta, JSON.stringify(nuevoObjeto, null, 2))
        } catch (error) {
            
        }
    }
    async deleteAll(){
        const objetos = []
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2))
        } catch (error) {
            
        }
    }

}

const listaProductos = new Contenedor('./productos.txt')



listaProductos.getById(4)
