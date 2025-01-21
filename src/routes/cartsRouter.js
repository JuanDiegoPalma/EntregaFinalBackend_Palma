import { Router } from "express";
import { CartManager } from "../dao/CartManager.js";


export const router = Router()

CartManager.setPath("./src/data/carrito.json")

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;  

    if (!cid || !pid) {
        return res.status(400).json({ message: 'Faltan parámetros cid o pid' });
    }

    try {
        const updatedCart = await CartManager.addProductToCart(cid, pid, quantity);

        if (!updatedCart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto' });
    }
});

router.post('/', async (req, res) => {
    const { products } = req.body;
    try {
        const newCart = await CartManager.createCart(products); 
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el carrito' });
    }
});

router.get('/', async (req, res) => {
    try {
        const allCarts = await CartManager.getAllCarts(); 
        res.status(200).json(allCarts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los carritos' });
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const products = await CartManager.getProductsFromCart(cid);
        if (!products) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});