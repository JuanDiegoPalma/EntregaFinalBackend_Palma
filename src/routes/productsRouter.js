import { Router } from "express";
import {ProductManager} from "../dao/ProductosMongoManager.js";
import { errores } from "../utilidades.js";
import { isValidObjectId } from "mongoose";

export const router = Router()



router.get("/", async (req, res) => {
    const { limit, sort, page, filter}=req.query

    try {
        let products = await ProductManager.getProducts({ limit, sort, page, filter})

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ products });
    } catch (error) {
        errores(res, error)
    }

})

router.post("/", async(req, res) => {

    let {code, title, ...otros}=req.body
    if(!code || !title){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`code y title es requerido`})
    }
    try {

        let existe=await ProductManager.getProductBy({code})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Producto repetido con cod ${code}`})
        }

        let nuevoProduct=await ProductManager.addProduct({code, title, ...otros})

        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ payload: `Se dio de alta con exito!`, nuevoProduct});
    } catch (error) {
        errores(res, error)
    }


})

router.put("/:id", async (req, res) => {
    let { id } = req.params;
    if (!isValidObjectId(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Proporcione un id de MongoDB válido` });
    }

    let aModificar = req.body;
    if (aModificar.code) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'No está permitido modificar el code' });
    }

    try {
        if (aModificar.title) {
            let products = await ProductManager.getProducts();
            let existe = products.docs.find(p => p.title.toLowerCase() === aModificar.title.trim().toLowerCase() && p._id != id);
            if (existe) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `Ya existe un producto con title ${aModificar.title} en DB.` });
            }
        }

        let productoModificado = await ProductManager.updateProduct(id, aModificar);
        if (!productoModificado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ message: 'Se modificó el producto', productoModificado });
    } catch (error) {
        errores(res, error);
    }
});

router.delete("/:id", async(req, res) => {
    let {id} = req.params
    if(!isValidObjectId(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese un id de mongodb válido`})
    }
    let products=await ProductManager.getProducts()
if(products.length===0){
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error: `No hay productos a eliminar`})
}
try {
    let productoEliminado=await ProductManager.deleteProduct(id)
    if(!productoEliminado){
        res.setHeader('Content-Type','application/json');
        return res.status(404).json({error:`No existe producto con id ${id}`})
    }
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: `Se eliminó el producto`, productoEliminado });

} catch (error) {
    errores(res, error)
}


})
