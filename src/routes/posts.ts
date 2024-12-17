import express from "express";
import {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getPostById,
} from "../controllers/postsController";
import upload from "../middlewares/upload";
import authenticate from "../middlewares/authenticate";
import authorize from "../middlewares/authorize";

const router = express.Router();


// API Endpoints
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", upload.single("image"), createPost);
router.put("/:id", upload.single("image"), updatePost);
router.delete("/:id", authenticate, authorize(["admin"]), deletePost);

export default router;