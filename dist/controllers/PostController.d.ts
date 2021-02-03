export declare class PostController {
    static addPost(req: any, res: any, next: any): Promise<void>;
    static getPostByUser(req: any, res: any, next: any): Promise<void>;
    static getAllPost(req: any, res: any, next: any): Promise<void>;
    static getPostByID(req: any, res: any, next: any): void;
    static editPost(req: any, res: any, next: any): Promise<void>;
    static deletePost(req: any, res: any, next: any): Promise<void>;
}
