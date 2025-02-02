import express from 'express';
import { engine } from "express-handlebars"
import { Server } from 'socket.io'

import { router as productsRouter } from './routes/productsRouter.js';
import { router as cartsRouter } from './routes/cartsRouter.js';
import { router as vistasRouter } from './routes/viewsRouter.js';
import { connectDB } from './connectdb.js';

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public")) 

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", vistasRouter)

app.get('/', (req, res) => {

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

app.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await ProductManager.getProducts();
        res.render('realtimeproducts', { products });
    } catch (error) {
        res.status(500).json({ message: 'Error al leer los productos' });
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

const io = new Server(server)

io.on("connection", (socket) => {
    console.log(`Se conectó un cliente con id ${socket.id}`)


    socket.emit("saludo", "Bienvenido al server. Identificate!")

    socket.on('addProduct', async (product) => {
        try {
            const products = await ProductManager.getProducts();
            products.push(product);
            await this.grabaArchivo(products);
            io.emit('updateProducts', products);
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    });
})

connectDB(
    "mongodb+srv://EcommercePalma:Coder.Coder117@cluster0.me1zx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    "ecommercePalma"
)