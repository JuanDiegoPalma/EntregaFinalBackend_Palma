import mongoose from "mongoose"


export const connectDB = async (url, dbName) => {
    try {
        await mongoose.connect(
            url,
            {
                dbName: dbName
            }
        )
        console.log(`Conexión a la base de datos exitosa`)  
    } catch (error) {
        console.log(`Error en la conexión a la base de datos: ${error.message}`)
    }
}