import { create } from 'zustand';
import axios from '../utils/axiosAPI';
import toast from 'react-hot-toast';
import useUserStore from './userStore';
import usePostStore from './postStore'; // ✅ Import the correct store

const useLikeStore = create((set, get) => ({
  addLike: async (postId) => {
    const user = useUserStore.getState().user;

    if (!user?._id) {
      toast.error("You must be logged in to like posts");
      return;
    }

    try {
      const likePromise = axios.post(`/api/like/addLike/${postId}`, {
        userId: user._id
      });

      await toast.promise(likePromise, {
        loading: "Liking post...",
        success: (res) => res.data.message,
        error: (err) => err?.response?.data?.message || "Something went wrong",
      });

      // ✅ Correct: refresh posts from the right store
      usePostStore.getState().getPosts();

    } catch (error) {
      console.error("Like failed:", error);
    }
  }
}));

export default useLikeStore;
