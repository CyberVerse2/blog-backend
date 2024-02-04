import { catchAsync } from '../../common/utils/errorHandler.js';
import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js';
import { createBlog, getBlogById, getBlogs, updateBlog, deleteBlog } from './blog.service.js';

export const httpCreateBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const { user } = req;

  if (!(title && content)) throw new AppError('Title and content are required', 400);

  const newBlog = await createBlog(title, content, user.id);
  if (!newBlog) throw new AppError('Error in creating blog', 500);

  return AppResponse.success(res, 201, newBlog, 'Blog created successfully');
});

export const httpGetBlogs = catchAsync(async (req, res) => {
  const { user } = req;
  const blogs = await getBlogs(user.id);
  if (!blogs) throw new AppError('Error in fetching blogs', 500);
  
  return AppResponse.success(res, 200, blogs, 'Blogs fetched successfully');
});

export const httpGetBlogById = catchAsync(async (req, res) => { 
  const { id } = req.params;

  const blog = await getBlogById(id);
  if (!blog) throw new AppError('Blog with the id not found', 404);

  return AppResponse.success(res, 200, blog, 'Blog fetched successfully');
});

export const httpUpdateBlog = catchAsync(async (req, res) => {  
  const { id } = req.params;
  const { title, content } = req.body;

  const updatedBlog = await updateBlog(id, title, content);
  if (!updatedBlog) throw new AppError('Error in updating blog', 500);

  return AppResponse.success(res, 200, updatedBlog, 'Blog updated successfully');
});

export const httpDeleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const blog = await deleteBlog(id);
  if (!blog) throw new AppError('Error in deleting blog', 500);

  return AppResponse.success(res, 200, null, 'Blog deleted successfully');
});

