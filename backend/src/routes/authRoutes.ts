import {Router} from "express"
import passport from "passport"
import {googleCallback, githubCallback} from "../controllers/authController"

const router = Router()

router.get("/google", passport.authenticate("google", {scope: ["profile"]}))
router.get(
  "/google/callback",
  passport.authenticate("google", {failureRedirect: "/"}),
  googleCallback
)

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}))
router.get(
  "/github/callback",
  passport.authenticate("github", {failureRedirect: "/"}),
  githubCallback
)

export default router
