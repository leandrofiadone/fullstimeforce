import passport from "passport"
import {
  Strategy as GoogleStrategy,
  VerifyCallback as GoogleVerifyCallback
} from "passport-google-oauth20"
import {
  Strategy as GitHubStrategy,
  Profile as GitHubProfile
} from "passport-github2"
import {User} from "./models/User"
import dotenv from "dotenv"

// Cargar variables de entorno
dotenv.config()

// Verificar que las variables de entorno estén cargadas
if (
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_CLIENT_SECRET
) {
  console.error(
    "Las variables de entorno para OAuth no están definidas correctamente."
  )
  process.exit(1)
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback"
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: passport.Profile,
      done: GoogleVerifyCallback
    ) => {
      let user = await User.findOne({googleId: profile.id})
      if (!user) {
        user = await new User({
          googleId: profile.id,
          displayName: profile.displayName
        }).save()
      }
      done(null, user)
    }
  )
)

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "/auth/github/callback"
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: GitHubProfile,
      done: (error: any, user?: any) => void
    ) => {
      let user = await User.findOne({githubId: profile.id})
      if (!user) {
        user = await new User({
          githubId: profile.id,
          displayName: profile.displayName
        }).save()
      }
      done(null, user)
    }
  )
)

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})
