// src/models/User.ts
import mongoose, {Document, Schema} from "mongoose"

interface IUser extends Document {
  googleId?: string
  githubId?: string
  displayName: string
  // Aquí puedes agregar más campos según tus necesidades, como email, avatar, etc.
}

const UserSchema: Schema = new Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true // Permite valores nulos y sigue siendo único
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true // Permite valores nulos y sigue siendo único
  },
  displayName: {
    type: String,
    required: true
  }
  // Puedes agregar más campos aquí
})

const User = mongoose.model<IUser>("User", UserSchema)

export {User, IUser}
