"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const Post_1 = require("../models/Post");
class PostController {
    static addPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.user_id;
            const title = req.body.title;
            const content = req.body.content;
            try {
                const data = {
                    user_id: userId,
                    title: title,
                    content: content,
                    created_at: new Date(),
                    updated_at: new Date()
                };
                let post = yield new Post_1.default(data).save();
                res.send(post);
            }
            catch (e) {
                next(e);
            }
            ;
        });
    }
    ;
    static getPostByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.user_id;
            const page = parseInt(req.query.page) || 1;
            const perPage = 2;
            let currentPage = page;
            let prevPage = page === 1 ? null : page - 1;
            let pageToken = page + 1;
            let totalPages;
            try {
                const postCount = yield Post_1.default.countDocuments({ user_id: userId });
                totalPages = Math.ceil(postCount / perPage);
                if (totalPages === page || totalPages === 0) {
                    pageToken = null;
                }
                if (page > totalPages) {
                    throw new Error(`No More Post to Show, Total Pages : ${totalPages}`);
                }
                const posts = yield Post_1.default.find({ user_id: userId }, { user_id: 0, __v: 0 }).populate('comments', { _id: 0, __v: 0 }).skip((perPage * page) - perPage).limit(perPage);
                res.json({
                    post: posts,
                    pageToken: pageToken,
                    totalPages: totalPages,
                    currentPage: currentPage,
                    prevPage: prevPage
                });
            }
            catch (e) {
                next(e);
            }
            ;
        });
    }
    ;
    static getAllPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const perPage = 2;
            let currentPage = page;
            let prevPage = page === 1 ? null : page - 1;
            let pageToken = page + 1;
            let totalPages;
            try {
                const postCount = yield Post_1.default.estimatedDocumentCount({});
                totalPages = Math.ceil(postCount / perPage);
                if (totalPages === page || totalPages === 0) {
                    pageToken = null;
                }
                if (page > totalPages) {
                    throw new Error(`No More Post to Show, Total Pages : ${totalPages}`);
                }
                const posts = yield Post_1.default.find({}, { __v: 0 }).populate('comments', { _id: 0, __v: 0 }).skip((perPage * page) - perPage).limit(perPage);
                res.json({
                    post: posts,
                    pageToken: pageToken,
                    totalPages: totalPages,
                    currentPage: currentPage,
                    prevPage: prevPage
                });
            }
            catch (e) {
                next(e);
            }
            ;
        });
    }
    ;
    static getPostByID(req, res, next) {
        res.json({
            post: req.post,
            Total_Comment: req.post.Total_Comment
        });
    }
    ;
    static editPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const PostId = req.params.id;
            const PostTitle = req.body.title;
            const PostContent = req.body.content;
            try {
                const updatedPost = yield Post_1.default.findByIdAndUpdate({ _id: PostId }, { title: PostTitle, content: PostContent, updated_at: new Date() }, { new: true }).populate('comments', { _id: 0, __v: 0 });
                if (updatedPost) {
                    res.send(updatedPost);
                }
                else {
                    throw new Error('Post Does Not Exist');
                }
                ;
            }
            catch (e) {
                next(e);
            }
            ;
        });
    }
    ;
    static deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = req.post;
            try {
                yield post.remove();
                res.send(post);
            }
            catch (e) {
                next(e);
            }
            ;
        });
    }
    ;
}
exports.PostController = PostController;
;
