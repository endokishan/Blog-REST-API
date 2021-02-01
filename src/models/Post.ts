import * as mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true },
    title : { type : String, required : true},
    content: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }]
});

postSchema.virtual('Total_Comment').get(function () {
    return this.comments.length;
});

export default mongoose.model('posts', postSchema);