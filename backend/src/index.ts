import express from "express"
import {connectDB, getDB} from "./database"

const app = express()
const port = 3000

connectDB()

app.get("/", async (req, res) => {
  try {
    const db = getDB()
    const collection = db.collection("mi-coleccion")
    const documents = await collection.find().toArray()
    res.json(documents)
  } catch (error) {
    res.status(500).send("Error al obtener los datos")
  }
})




app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
