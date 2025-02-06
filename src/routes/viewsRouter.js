import {Router} from 'express'
import { ProductManager } from '../dao/ProductosMongoManager.js'
import { errores } from '../utilidades.js'
export const router=Router()

router.get('/products',async (req,res)=>{

    let {page, limit, sort}=req.query
    if(!page){
        page=1
    }
    if (!limit) {
        limit = 10;
    }
    if (!sort) {
        sort = 'asc';
    }


    try {
            let {docs: products, totalPages, hasPrevPage, prevPage, hasNextPage, nextPage}=await ProductManager.getProducts({ page, limit, sort })


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

router.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await ProductManager.getProductBy({ _id: pid });
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).render("productDetails", product);
    } catch (error) {
        errores(res, error);
    }
});

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

