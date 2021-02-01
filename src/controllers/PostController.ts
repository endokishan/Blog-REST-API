import Post from "../models/Post";

export class PostController {
    static async addPost(req, res, next) {
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

            let post = await new Post(data).save();
            res.send(post);

        } catch (e) {
            next(e);
        };
    };

    static async getPostByUser(req, res, next) {
        const userId = req.user.user_id;
        const page = parseInt(req.query.page) || 1;
        const perPage = 2;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;

        try {
            const postCount = await Post.countDocuments({ user_id: userId });
            totalPages = Math.ceil(postCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw new Error(`No More Post to Show, Total Pages : ${totalPages}`)
            }

            const posts = await Post.find({ user_id: userId }, { user_id: 0, __v: 0 }).populate('comments', { _id: 0, __v: 0 }).skip((perPage * page) - perPage).limit(perPage);
            res.json({
                post: posts,
                pageToken: pageToken,
                totalPages: totalPages,
                currentPage: currentPage,
                prevPage: prevPage
            });
        } catch (e) {
            next(e);
        };
    };

    static async getAllPost(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const perPage = 2;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;

        try {
            const postCount = await Post.estimatedDocumentCount({});
            totalPages = Math.ceil(postCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw new Error(`No More Post to Show, Total Pages : ${totalPages}`)
            }

            const posts = await Post.find({}, { __v: 0 }).populate('comments', { _id: 0, __v: 0 }).skip((perPage * page) - perPage).limit(perPage);
            res.json({
                post: posts,
                pageToken: pageToken,
                totalPages: totalPages,
                currentPage: currentPage,
                prevPage: prevPage
            });
        } catch (e) {
            next(e);
        };
    };

    static getPostByID(req, res, next) {
        res.json({
            post: req.post,
            Total_Comment: req.post.Total_Comment
        });
    };

    static async editPost(req, res, next) {
        const PostId = req.params.id;
        const PostTitle = req.body.title;
        const PostContent = req.body.content;

        try {
            const updatedPost = await Post.findByIdAndUpdate({ _id: PostId }, { title: PostTitle, content: PostContent, updated_at: new Date() }, { new: true }).populate('comments', { _id: 0, __v: 0 });

            if (updatedPost) {
                res.send(updatedPost);
            } else {
                throw new Error('Post Does Not Exist');
            };
        } catch (e) {
            next(e);
        };
    };
};