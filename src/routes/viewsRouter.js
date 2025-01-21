import {Router} from 'express'
import { ProductManager } from '../dao/ProductsManager.js'
import { errores } from '../utilidades.js'
export const router=Router()

router.get('/products',async (req,res)=>{
    let products=await ProductManager.getProducts()

    res.render("home", {
        products})
})

router.get('/realtimeproducts', async (req,res)=>{
    let products=await ProductManager.getProducts()

    res.render("realTimeProducts", {
        products
    })
})

