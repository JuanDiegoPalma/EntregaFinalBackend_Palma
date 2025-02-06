import { productsModel } from "./models/productsModel.js"

export class ProductManager {

    static async getProducts({ limit = 10, sort = 'asc', page = 1, filter ={} } = {}) {
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: { price: sort === 'asc' ? 1 : -1 },
            lean: true
        };

        const result = await productsModel.paginate(filter, options);
        return result;
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
