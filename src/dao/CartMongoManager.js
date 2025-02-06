import {cartModel} from "./models/cartModel.js"
import mongoose from 'mongoose';

export class CartManager {
    static async createCart() {
        const newCart = new cartModel();
        await newCart.save();
        return newCart;
    }

    static async getAllCarts() {
        return await cartModel.find().populate('productos.productId').lean();
    }

    static async getCartById(cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error('El ID del carrito no es válido');
        }
        return await cartModel.findById(cartId).populate('productos.productId').lean();
    }

    static async addProductToCart(cartId, productId, quantity = 1) {
        if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error('El ID del carrito o del producto no es válido');
        }

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const productIndex = cart.productos.findIndex(p => p.productId.toString() === productId);
        if (productIndex > -1) {
            cart.productos[productIndex].quantity += quantity;
        } else {
            cart.productos.push({ productId, quantity });
        }

        await cart.save();
        return cart;
    }

    static async removeProductFromCart(cartId, productId) {
        if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error('El ID del carrito o del producto no es válido');
        }

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        cart.productos = cart.productos.filter(p => p.productId.toString() !== productId);
        await cart.save();
        return cart;
    }

    static async updateCart(cartId, productos) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error('El ID del carrito no es válido');
        }

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        cart.productos = productos;
        await cart.save();
        return cart;
    }

    static async updateProductQuantity(cartId, productId, quantity) {
        if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error('El ID del carrito o del producto no es válido');
        }

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const productIndex = cart.productos.findIndex(p => p.productId.toString() === productId);
        if (productIndex > -1) {
            cart.productos[productIndex].quantity = quantity;
        } else {
            throw new Error('Producto no encontrado en el carrito');
        }

        await cart.save();
        return cart;
    }

    static async clearCart(cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw new Error('El ID del carrito no es válido');
        }

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        cart.productos = [];
        await cart.save();
        return cart;
    }
}