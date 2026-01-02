import { create } from 'zustand'
import api from '../utils/axiosAPI';
import toast from 'react-hot-toast';

const useSaveStore = create((set, get) => ({
    savePosts: null,

    getSavePost: async () => {
        try {
            const response = await api.get("/api/save/getAllPosts");
            set({ savePosts: response.data.posts });
        } catch (error) {
            console.log(error);
        }
    },

    addToSave: async (id) => {
        try {
            const response = api.post(`/api/save/savePost/${id}`);
            toast.promise(response, {
                loading: "Loading...",
                success: (res) => res.data.message || "Save successfully..!",
                error: (err) => err.response.data.message || err.message || "Internal Server Error"
            });

            await response;
            get().getSavePost();
        } catch (error) {
            console.log(error);
        }
    },

    deletePost: async (id) => {
        try {
            const response = api.delete(`/api/save/deleteSave/${id}`);
            toast.promise(response, {
                loading: "Loading..!",
                success: (res) => res.data.message || "Delete post successfully..!",
                error: (err) => err.response.data.message || err.message || "Internal Server Error"
            })

            await response;
            get().getSavePost();
        } catch (error) {
            console.log(error);
        }
    }
}));

export default useSaveStore;