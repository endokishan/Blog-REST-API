import * as mongoose from 'mongoose';
import Comment from './Comment';

const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }]
});

postSchema.post('remove', (async doc => {
    for (let id of (doc as any).comments) {
        await Comment.findOneAndDelete({_id : id});
    };
}));

postSchema.virtual('Total_Comment').get(function () {
    return this.comments.length;
});

export default mongoose.model('posts', postSchema);