import { User } from '../user/user.schema.js';
import { Blog } from './blog.schema.js';

export async function createBlog(title, content, author) {
  return new Blog({ title, content, author });
}

export async function getBlogs(id) {
  const { blogs } = User.findById(id).populate('blogs').exec();
  return blogs;
}

export async function getBlogById(id) {
  return Blog.findById(id);
}

export async function updateBlog(id, title, content) {
  return Blog.findByIdAndUpdate(id, { title, content }, { new: true });
}

export async function deleteBlog(id) {
  return Blog.findByIdAndDelete(id);
}
