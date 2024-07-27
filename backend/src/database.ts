import {MongoClient} from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const url =
  process.env.MONGODB_URL || "mongodb://localhost:27017/mi-base-de-datos"

let db: any

const connectDB = async () => {
  try {
    const client = new MongoClient(url)
    await client.connect()
    db = client.db() // Usa la base de datos definida en la URL
    console.log("MongoDB conectado")
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error)
    process.exit(1)
  }
}

const getDB = () => db

export {connectDB, getDB}
