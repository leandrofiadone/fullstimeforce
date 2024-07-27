// src/models/BlogPost.ts
import mongoose, {Schema, Document} from "mongoose"

interface IBlogPost extends Document {
  title: string
  content: string
  author: string
  createdAt: Date
  updatedAt: Date
}

const BlogPostSchema: Schema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

export default mongoose.model<IBlogPost>("BlogPost", BlogPostSchema)
