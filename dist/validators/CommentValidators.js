"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidators = void 0;
const express_validator_1 = require("express-validator");
const Comment_1 = require("../models/Comment");
const Post_1 = require("../models/Post");
class CommentValidators {
    static addComment() {
        return [express_validator_1.body('comment', 'Comment is Required').isString(),
            express_validator_1.param('id', 'Post ID is Required').custom((id, { req }) => {
                return Post_1.default.findOne({ _id: id }).then((post) => {
                    if (post) {
                        req.post = post;
                        return true;
                    }
                    else {
                        throw new Error("Post Does Not Exist");
                    }
                    ;
                });
            })];
    }
    ;
    static editComment() {
        return [express_validator_1.body('comment', 'Updated Comment is Required').isString()];
    }
    ;
    static deleteComment() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Comment_1.default.findOne({ _id: id }).then((comment) => {
                    if (comment) {
                        req.comment = comment;
                        return true;
                    }
                    else {
                        throw new Error('Comment Does not Exist');
                    }
                });
            })];
    }
}
exports.CommentValidators = CommentValidators;
;
