import express from "express"
import session from "express-session"
import passport from "passport"
import dotenv from "dotenv"
import mongoose from "mongoose"
import "./config/auth" // Importa el archivo de configuración de Passport
import authRoutes from "./routes/authRoutes"
import {connectDB} from "./config/database"

// Cargar variables de entorno
dotenv.config()

// Verificar que las variables de entorno necesarias están definidas
const requiredEnvVars = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
  "MONGODB_URL"
]
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Error: ${envVar} is not defined in the .env file`)
    process.exit(1)
  }
})

// Conectar a la base de datos MongoDB
connectDB()

const app = express()

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
