import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Post } from "../models/Post";

export class PostsService {
    private postRepository: Repository<Post>;

    constructor() {
        this.postRepository = AppDataSource.getRepository(Post);
    }

    async getAllPosts(offset: number, limit: number) {
        const [posts, totalCount] = await this.postRepository.findAndCount({
            skip: offset,
            take: limit,
        });

        return { posts, totalCount };
    }

    async getPostById(id: string): Promise<Post | null> {
        return this.postRepository.findOneBy({ id });
    }

    async createPost(title: string, content: string, image: string): Promise<Post> {
        const newPost = this.postRepository.create({ title, content, image });
        return this.postRepository.save(newPost);
    }

    async updatePost(
        id: string,
        title?: string,
        content?: string,
        image?: string
    ): Promise<Post | null> {
        const post = await this.getPostById(id);
        if (!post) return null;

        if (title) post.title = title;
        if (content) post.content = content;
        if (image) post.image = image;

        return this.postRepository.save(post);
    }

    async deletePost(id: string): Promise<boolean> {
        const result = await this.postRepository.delete(id);
        return result.affected !== 0;
    }
}
