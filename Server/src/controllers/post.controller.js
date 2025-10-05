import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, type } = req.body;

  if (!title || !description || !image || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const url = req.imageUrl;
    const image_ID = req.imageId;

    const newPost = new Post({ title, description, type, image: url, user: id, image_ID });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate("user");
        res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if ( !user ) return res.status(404).json({ message: "User not found" });

        const posts = await Post.find({ user: id }).sort({ createdAt: -1 }).populate("user");
        res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTrandingBlogs = async (req, res) => {
  try {
    const response = await Post.find().sort({ likes: -1 }).limit(4).populate("user");
    res.status(200).json({ message: "Posts fetched successfully", posts: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPostByType = async (req, res) => {
  const { type } = req.body;
  if( !type ) return res.status(400).json({ message: "Type is required" });
  try {
    const response = await Post.find({ type }).populate("user");
    res.status(200).json({ message: "Posts fetched successfully", posts: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const result = await cloudinary.uploader.destroy(post.image_ID);
    if (result.result === "ok") {
      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(500).json({ message: "Error deleting image..!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPostByPostID = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ message: "Post ID is required" });

    const post = await Post.findById(id).populate("user");
    if (!post) return res.status(404).json({ message: "Post not found" });
    
    res.status(200).json({ message: "Post fetched successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}