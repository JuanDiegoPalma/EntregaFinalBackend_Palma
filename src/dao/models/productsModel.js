import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const productosCollection = 'productos'

const productosSchema = new mongoose.Schema(
    {
        code:{
            type: String,
            unique: true,
        },
        title: String,
        descrip: String,
        price: Number,
        status: Boolean,
        stock: Number,
        category: String,
        thumbnails: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
    })

    productosSchema.plugin(paginate)

    export const productsModel=mongoose.model(
        productosCollection, 
        productosSchema
    )