import { protect } from "../../common/middlewares/protect.js";
import { Router as blogRouter } from "express";
import { httpCreateBlog, httpDeleteBlog, httpGetBlogById, httpGetBlogs, httpUpdateBlog } from "./blog.controller.js";

blogRouter.use(protect)

blogRouter.post("/", httpCreateBlog);
blogRouter.get("/", httpGetBlogs);
blogRouter.get("/:id", httpGetBlogById);
blogRouter.patch("/:id", httpUpdateBlog);
blogRouter.delete("/:id", httpDeleteBlog);

export default blogRouter