import { body, param } from "express-validator";
import Post from "../models/Post";

export class PostValidators {

    static addPost() {
        return [body('title', 'Post Title is Required').isString(),
        body('content', 'Post Content is Required').isString()];
    };

    static getPostByID() {
        return [param('id', 'Post ID is Required').custom((id, { req }) => {
            return Post.findOne({ _id: id }, { _id: 0, __v: 0 }).populate('comments', { _id: 0, __v: 0 }).then((post) => {
                if (post) {
                    req.post = post;
                    return true;
                } else {
                    throw new Error("Post Does not Exist");
                };
            });
        })];
    };

    static editPost() {
        return [body('title', 'Post Title is Required').isString(),
        body('content', 'Post Content is Required').isString()];
    };
};