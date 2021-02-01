import * as mongoose from 'mongoose';
import Post from './Post';

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true }
});

commentSchema.post('remove', (async doc => {
    const comment = doc as any;
    const post = await Post.findOne({comments : {$in: [comment._id]}});
    await Post.findOneAndUpdate({_id : post._id}, {$pull : {comments : comment._id}});
}))

export default mongoose.model('comments', commentSchema);