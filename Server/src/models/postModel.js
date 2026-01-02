import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    image_ID: { type: String, default: "" },
    type: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comment: { type: Number, default: 0 },
    reads: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);
export default Post;