import Like from "../models/likes.model.js";
import Post from "../models/post.model.js";

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Like.create({ postId: id, userId });
    await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } });

    res.status(200).json({ message: "Post liked" });

  } catch (error) {
    if (error.code === 11000) {
      // Duplicate like
      return res.status(400).json({ message: "You already liked this post" });
    }
    console.error("Like error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
