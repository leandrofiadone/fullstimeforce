import express from "express"
import passport from "passport"
import session from "express-session"
import dotenv from "dotenv"
import mongoose from "mongoose"
import "./auth" // Importa el archivo de configuración de Passport

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
mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

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

app.get("/auth/google", passport.authenticate("google", {scope: ["profile"]}))
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {failureRedirect: "/"}),
  (req, res) => {
    res.redirect("/")
  }
)

app.get(
  "/auth/github",
  passport.authenticate("github", {scope: ["user:email"]})
)
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {failureRedirect: "/"}),
  (req, res) => {
    res.redirect("/")
  }
)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
