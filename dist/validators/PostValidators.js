"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidators = void 0;
const express_validator_1 = require("express-validator");
const Post_1 = require("../models/Post");
class PostValidators {
    static addPost() {
        return [express_validator_1.body('title', 'Post Title is Required').isString(),
            express_validator_1.body('content', 'Post Content is Required').isString()];
    }
    ;
    static getPostByID() {
        return [express_validator_1.param('id', 'Post ID is Required').custom((id, { req }) => {
                return Post_1.default.findOne({ _id: id }, { _id: 0, __v: 0 }).populate('comments', { _id: 0, __v: 0 }).then((post) => {
                    if (post) {
                        req.post = post;
                        return true;
                    }
                    else {
                        throw new Error("Post Does not Exist");
                    }
                    ;
                });
            })];
    }
    ;
    static editPost() {
        return [express_validator_1.body('title', 'Post Title is Required').isString(),
            express_validator_1.body('content', 'Post Content is Required').isString()];
    }
    ;
    static deletePost() {
        return [express_validator_1.param('id', 'Post ID is Required').custom((id, { req }) => {
                return Post_1.default.findOne({ _id: id }, { __v: 0, user_id: 0 }).then((post) => {
                    if (post) {
                        req.post = post;
                        return true;
                    }
                    else {
                        throw new Error("Post Does not Exist");
                    }
                    ;
                });
            })];
    }
}
exports.PostValidators = PostValidators;
;
