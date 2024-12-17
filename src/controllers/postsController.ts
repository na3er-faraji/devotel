import { NextFunction, Request, Response } from "express";
import { PostsService } from "../services/postsService";

const postsService = new PostsService();

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        // Get pagination parameters from the query string
        const page = parseInt(req.query.page as string) || 1; // Default to page 1
        const pageSize = parseInt(req.query.pageSize as string) || 10; // Default to 10 posts per page

        // Calculate offset and limit
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        // Fetch the posts with pagination
        const { posts, totalCount } = await postsService.getAllPosts(offset, limit);

        // Return the paginated posts along with metadata
        res.json({
            data: posts,
            pagination: {
                page,
                pageSize,
                totalCount,
                totalPages: Math.ceil(totalCount / pageSize), // Calculate total pages
            }
        });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching posts", error });
    }
};

export const getPostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const post = await postsService.getPostById(id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.json(post);
    } catch (error) {
        next(error); // Pass error to the next middleware (error handler)
    }
};

export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, content } = req.body;
    const image = (req as any).file?.path;

    if (!title || !content || !image) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

 
    const newPost = await postsService.createPost(title, content, image);
    res.status(201).json(newPost);
};

export const updatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { title, content } = req.body;
    const image = (req as any).file?.path;

    const updatedPost = await postsService.updatePost(id, title, content, image);
    if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
    }

    res.json(updatedPost);
};

export const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const isDeleted = await postsService.deletePost(id);
    if (!isDeleted) {
        res.status(404).json({ message: "Post not found" });
        return;
    }

    res.status(204).send();
};
