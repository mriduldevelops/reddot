import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  image: {
    type: String, // Image URL or file path
    required: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default BlogModel;