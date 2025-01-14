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
        const carrito = carritos.find(c => c.id === parseInt(cid));
        return carrito;
    }

    static addProductToCart = async (cid, pid) => {
        const carrito = await getCartById(cid); 
        if (!carrito) return null;
    
        const existingProduct = carrito.products.find(p => p.product === parseInt(pid));
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            carrito.products.push({ product: parseInt(pid), quantity: 1 });
        }

        return carrito;
    }



        static async #grabaArchivo(datos=""){
            if(typeof datos!="string"){
                throw new Error(`error método grabaArchivo - argumento con formato inválido`)
            }
            await fs.promises.writeFile(this.#path, datos)
        }
}