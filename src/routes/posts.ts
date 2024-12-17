import express from "express";
import {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getPostById,
} from "../controllers/postsController";
import upload from "../middlewares/upload";

const router = express.Router();


// API Endpoints
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", upload.single("image"), createPost);
router.put("/:id", upload.single("image"), updatePost);
router.delete("/:id", deletePost);

export default router;