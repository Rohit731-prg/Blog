import cloudinary from "../config/cloudinary.js";
import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
  const { title, description, type } = req.body;
  if (!title || !description || !type) return res.status(400).json({ message: "All fields are required" });
  if (!["All", "Technology", "Politics", "Business & Finance", "Lifestyle", "Culture & Society"].includes(type)) {
    return res.status(400).json({ message: "Invalid Category" });
  }
  try {
    const userID = req.user._id;
    const user = req.user;
    const url = req.imageUrl;
    const image_ID = req.imageId;

    const newPost = new Post({
      title,
      description,
      type,
      image: url,
      user: user._id,
      image_ID,
      user: userID
    });
    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("user", "name image ");
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const user = req.user;
    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user", "-password -auth -otp");
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrandingBlogs = async (req, res) => {
  try {
    const response = await Post.find()
      .sort({ likes: -1 })
      .limit(4)
      .populate("user");
    res
      .status(200)
      .json({ message: "Posts fetched successfully", posts: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostByType = async (req, res) => {
  const { type } = req.body;
  if (!type) return res.status(400).json({ message: "Type is required" });
  try {
    const response = await Post.find({ type }).populate("user");
    res
      .status(200)
      .json({ message: "Posts fetched successfully", posts: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const result = await cloudinary.uploader.destroy(post.image_ID);
    if (result.result === "ok") {
      await Post.findByIdAndDelete(id);
      return res.status(200).json({ message: "Post deleted successfully" });
    } else {
      return res.status(500).json({ message: "Error deleting image..!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPostByPostID = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("user");
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const user = req.user;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(user._id)) {
      post.likes.pull(user._id);
    } else {
      post.likes.push(user._id);
    }
    await post.save();
    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const readPost = async (req, res) => {
  const { id } = req.params;
  try {
    const user = req.user;
    const post = await Post.findById(id);
    if (!post) return res.status(400).json({ message: "No post found! "});
    
    if (!post.reads.includes(user?._id)) {
      post.reads.push(user?.id);
      post.save();
      return res.status(200).json({ message: "Updated" });
    }
    return res.status(400).json({ message: "Already readed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updatePost = async (req, res) => {
  const { title, description, type } = req.body;
  const { id } = req.params;
  if (!title || !description || !type) return res.status(400).json({ message: "All fields are require" });
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(400).json({ message: "No post are found" });

    await Post.findByIdAndUpdate( id, { title: title, description: description, type: type }, { new: true });
    res.status(200).json({ message: "Post Update Successfully..!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}