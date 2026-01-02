import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";
import axios from "../utils/axiosAPI";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      post: 0,
      email: null,
      accountDetails: null,

      signUp: async (UserDetails) => {
        const newForm = new FormData();
        newForm.append(
          "name",
          UserDetails.firstName + " " + UserDetails.lastName
        );
        newForm.append("email", UserDetails.email);
        newForm.append("password", UserDetails.password);
        newForm.append("image", UserDetails.image);

        try {
          const response = axios.post("/api/user/register", newForm, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.promise( response, {
              loading: "Creating user...",
              success: "User created successfully",
              error: (err) =>
                err?.response?.data?.message || "Something went wrong",
            }
          );

          const res = await response;
          set({ email });
          return true;
        } catch (error) {
          console.log(error)
        }
      },

      OTPverify: async (id, otp) => {
        console.log(id, otp);
        return toast
          .promise(
            axios.post(`/api/user/compliteRes/${id}`, {
              userOpt: otp,
            }),
            {
              loading: "Verifying user...",
              success: "User verified successfully",
              error: (err) =>
                err?.response?.data?.message || "Something went wrong",
            }
          )
          .then((response) => response.data);
      },

      logIn: async (userData) => {
        try {
          const res = axios.post("/api/user/login", {
            email: userData.email,
            password: userData.password,
          });

          toast.promise(res, {
            loading: "Loading...",
            success: (res) => res.data.message || "User login successfully",
            error: (err) =>
              err.response.data.message || "Internal Server Error",
          });

          const data = await res;
          set({ user: data.data.user, post: data.data.post });
          localStorage.setItem("adminToken", "true");
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      updateImage: async (image) => {
          const newForm = new FormData();
          newForm.append("image", image);
          try {
            const response = axios.put("/api/user/updateProfileImage");
            toast.promise(response, {
              loading: "Loading..!",
              success: (res) => res.data.message || "Profile update successfuly..!",
              error: (err) => err?.response?.data?.message || "Something went wrong",
            });

            const res = await response;
            set({ user: res.data.user });
          } catch (error) {
            console.log(error);
          }
      },

      logOut: () => {
        localStorage.setItem("adminToken", "flase");
        set({ user: null, post: 0 });
        toast.success("User logged out");
      },

      accountDetailsFun: async () => {
        try {
          const response = await axios.get("/api/user/getAccountDetails");
          
          set({ accountDetails: response.data.response });
        } catch (error) {
          console.log(error);
        }
      },

      verifyAuth: async () => {
        try {
          const res = await axios.post("/api/user/verifyWithAuth");
          if (!res.data || !res.data.user) return false;
          console.log(res.data);
          set({ user: res.data.user });
          set({ post: res.data.post });
          return res.data.user;
        } catch (error) {
          console.error("Error verifying authentication:", error);
          return false;
        }
      },
    }),
    {
      name: "user-storage", // Key in localStorage
      partialize: (state) => ({ user: state.user, post: state.post }), // Only persist these fields
    }
  )
);

export default useUserStore;
