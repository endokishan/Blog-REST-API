import { body, param } from "express-validator";
import Comment from "../models/Comment";
import Post from "../models/Post";

export class CommentValidators {
    static addComment() {
        return [body('comment', 'Comment is Required').isString(),
        param('id', 'Post ID is Required').custom((id, { req }) => {
            return Post.findOne({ _id: id }).then((post) => {
                if (post) {
                    req.post = post;
                    return true;
                } else {
                    throw new Error("Post Does Not Exist");
                };
            });
        })];
    };

    static editComment() {
        return [body('comment', 'Updated Comment is Required').isString()];
    };

    static deleteComment() {
        return [param('id').custom((id, {req}) => {
            return Comment.findOne( {_id : id}).then((comment) => {
                if (comment) {
                    req.comment = comment;
                    return true;
                } else {
                    throw new Error('Comment Does not Exist');
                }
            })
        })]
    }
};