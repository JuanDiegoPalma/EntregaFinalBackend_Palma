import {Router} from 'express'
import { ProductManager } from '../dao/ProductosMongoManager.js'
import { errores } from '../utilidades.js'
export const router=Router()

router.get('/products',async (req,res)=>{

    let {page}=req.query
    if(!page){
        page=1
    }

    try {
            let {docs: products, totalPages, hasPrevPage, prevPage, hasNextPage, nextPage}=await ProductManager.getProducts(page)


    res.status(200).render(
        "products",
        {
            products,
            totalPages, 
            hasPrevPage, 
            prevPage, 
            hasNextPage, 
            nextPage
        })
    } catch (error) {
        errores(error,res)
    }

})

router.get('/realtimeproducts', async (req,res)=>{
    try {
        let products=await ProductManager.getProducts()

    res.render("realTimeProducts", {
        products
    })
    } catch (error) {
        errores(error,res)
        
    }

})

