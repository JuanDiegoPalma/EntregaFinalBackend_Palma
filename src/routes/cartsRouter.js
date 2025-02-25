import { Router } from 'express';
import { CartManager } from '../dao/CartMongoManager.js';

export const router = Router();

router.post('/', async (req, res) => {
    try {
        const newCart = await CartManager.createCart();
        res.status(201).json({ message: 'Carrito creado', id: newCart._id });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el carrito', error });
    }
});


router.get('/', async (req, res) => {
    try {
        const allCarts = await CartManager.getAllCarts();
        res.status(200).json({message:'este es el carrito', allCarts});
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los carritos', error });
    }
});



router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await CartManager.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.status(200).json({message: 'Carrito encontrado',cart});
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!quantity || isNaN(quantity) || quantity < 0) {
        return res.status(400).json({ message: 'Cantidad inválida' });
    }

    try {
        const updatedCart = await CartManager.updateProductQuantity(cid, pid, quantity);
        res.status(200).json({ message: 'Cantidad del producto actualizada', updatedCart });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la cantidad del producto en el carrito', error });
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const updatedCart = await CartManager.removeProductFromCart(cid, pid);
        res.status(200).json({message: 'Producto Eliminado del carrito', updatedCart});
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto del carrito', error });
    }
});

router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe contener un arreglo de productos' });
    }

    try {
        const updatedCart = await CartManager.updateCart(cid, products);
        res.status(200).json({ message: 'Carrito actualizado', updatedCart });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el carrito', error });
    }
});

router.put('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const updatedCart = await CartManager.updateProductQuantity(cid, pid, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la cantidad del producto en el carrito', error });
    }
});

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const updatedCart = await CartManager.clearCart(cid);
        res.status(200).json({message: 'carrito eliminado',updatedCart});
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar todos los productos del carrito', error });
    }
});