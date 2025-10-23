import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;