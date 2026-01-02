import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const postComment = async (req, res) => {
    console.log(req.params, req.body)
    const { id } = req.params;
    const { comment } = req.body;
    if (!comment) return res.status(400).json({ message: "Comment is not provided "});
    try {
        const userId = req.user._id;
        const post = await Post.findById(id);
        if (!post) return res.status(400).json({ message: "No Post found" });

        await Comment.insertOne({ post: id, user: userId, content: comment });
        await Post.updateOne({ _id: id }, { $inc: { comment: 1 } });
        res.status(201).json({ message: "Comment post successfully..!" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}

export const getCommentsByPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(400).json({ message: "No Post found..!" });

        const comments = await Comment.find({ post: id }).populate("user").sort({ createdAt: -1 });
        if (comments.length == 0) return res.status(404).json({ message: "No comments found for this post" });
        res.status(200).json({ comments });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}