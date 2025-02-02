import { productsModel } from "./models/productsModel.js"

export class ProductManager {

    static async getProducts(page) {

            return await productsModel.paginate(
                {},
                {
                    page, 
                    limit: 5,
                    lean: true,
                    sort: {price:1}
                })
        }
    
        static async getProductBy(filtro={}){ 

            return await productsModel.findOne(filtro).lean()
        }

        static async addProduct(producto){
            let nuevoProducto=await productsModel.create(producto)
            return nuevoProducto.toJSON()
        }

        static async updateProduct(id, producto){
            return await productsModel.findByIdAndUpdate(id, producto, {new:true}).lean()
        }

        static async deleteProduct(id){
            return await productsModel.findByIdAndDelete(id).lean()
        }
}
