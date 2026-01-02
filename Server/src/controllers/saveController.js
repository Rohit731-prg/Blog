import Post from "../models/postModel.js";
import SaveModel from "../models/saveModel.js";

export const savePost = async (req, res) => {
    const { id } = req.params;
    try {
        const userID = req.user?._id
        const post = await Post.findById(id);
        if (!post) return res.status(400).json({ message: "No Post found" });
        const is_exist = await SaveModel.findOne({ user: userID, post: id });
        if (is_exist) return res.status(400).json({ message: "User already save this story "});

        await SaveModel.insertOne({ user: userID, post: id });
        return res.status(201).json({ message: "Post Save Successfully...!" });
    } catch (error) {
        return res.status(500).json({ message: error.mesage });
    }
};

export const getSavePost = async (req, res) => {
    try {
        const userID = req.user._id;
        const posts = await SaveModel.find({ user: userID }).populate("post user");
        if (!posts || posts.length == 0) return res.status(400).json({ message: "No Save Posts are available" });

        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(500).json({ message: error.mesage });
    }
};

export const deleteSavePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await SaveModel.findById(id);
        if (!post) return res.status(400).json({ message: "No post founded" });
        await SaveModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Delete Post Successfully..!" });
    } catch (error) {
        return res.status(500).json({ message: error.mesage });
    }
}