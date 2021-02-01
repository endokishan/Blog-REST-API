import Comment from "../models/Comment";

export class CommentController {
    static async addComment(req, res, next) {
        const content = req.body.comment;
        const post = req.post;

        try {
            const comment = new Comment({
                comment: content,
                created_at: new Date(),
                updated_at: new Date()
            });

            post.comments.push(comment);
            await Promise.all([comment.save(), post.save()]);
            res.send(comment);
        } catch (e) {
            next(e);
        };
    };

    static async editComment(req, res, next) {
        const conmment = req.body.comment;
        const commentId = req.params.id;

        try {
            const updatedComment = await Comment.findOneAndUpdate({ _id: commentId }, { comment: conmment, updated_at: new Date() }, { new: true });
            if (updatedComment) {
                res.send(updatedComment);
            } else {
                throw new Error('Comment Does Not Exist');
            };
        } catch (e) {
            next(e);
        };
    };

    static async deleteComment(req, res, next) {
        const comment = req.comment;
        try {
            comment.remove();
            res.send(comment);
        } catch (e) {
            next(e);
        };
    };
};