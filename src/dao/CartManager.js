import fs from "fs" 
    let carritos = []; 
    let nextId = 1;
export class CartManager{
    static #path=""

    static setPath(rutaArchivo=""){
        this.#path=rutaArchivo
    }
    static createCart = async (products = []) => {
        const newCart = {
            id: nextId++, 
            products,
        };
        carritos.push(newCart);
        return newCart;
    }

    static getAllCarts = async () => {
        return carritos;
    }

    static getCartById = async (cid) => {
        try {
            const carritoId = parseInt(cid);
            if (isNaN(carritoId)) {
                throw new Error('El ID del carrito no es válido');
            }
    
            const carrito = carritos.find(c => c.id === carritoId);
            if (!carrito) {
                throw new Error('Carrito no encontrado');
            }
    
            return carrito;
        } catch (error) {
            console.error('Error al obtener el carrito por ID:', error);
            throw error;
        }
    }

    static getCartById = async (cid) => {
        try {
            const carritoId = parseInt(cid);
            if (isNaN(carritoId)) {
                throw new Error('El ID del carrito no es válido');
            }
    
            const carrito = carritos.find(c => c.id === carritoId);
            if (!carrito) {
                throw new Error('Carrito no encontrado');
            }
    
            return carrito;
        } catch (error) {
            console.error('Error al obtener el carrito por ID:', error);
            throw error;
        }
    }

    static addProductToCart = async (cid, pid) => {
        try {
            const carrito = await getCartById(cid);
            if (!carrito) return null;
    
            const productId = parseInt(pid);
            const existingProduct = carrito.products.find(p => p.product === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                carrito.products.push({ product: productId, quantity: 1 });
            }
    
            await this.#grabaArchivo(JSON.stringify(carrito, null, 5));
            return carrito;
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            throw error;
        }
    }

        static async #grabaArchivo(datos=""){
            if(typeof datos!="string"){
                throw new Error(`error método grabaArchivo - argumento con formato inválido`)
            }
            await fs.promises.writeFile(this.#path, datos)
        }
}