import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useImageStore from "../store/imagesStore";
import useUserStore from "../store/userStore";
import { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [imageList, setImageList] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const images = useImageStore.getState().images;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await useUserStore.getState().logIn(details);
    if (res) {
      navigate(`/profile/${res.user._id}`);
    }
  };

  useEffect(() => {
    const init = async () => {
      const user = await useUserStore.getState().verifyAuth();
      console.log(user);
      if (user) {
        navigate(`/profile/${user._id}`);
      }

      if (images.length > 0) {
        const random = Math.floor(Math.random() * images.length);
        setImageList(images[random]);
      }
    };

    init();
  }, [navigate, images]);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center px-80 justify-center p-4">
        <div className="bg-zinc-800 rounded-3xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-2/5 h-52 md:h-auto">
            <img
              src={imageList}
              alt="Login Visual"
              className="w-full h-full object-cover"
            />
          </div>

          <main className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
            <p className="text-white text-3xl font-bold mb-6">Welcome Back</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                value={details.email}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                placeholder="Email"
                className="w-full px-4 py-2 rounded-xl bg-violet-200 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                type="text"
              />

              <div className="w-full flex items-center bg-violet-200 px-4 py-2 rounded-xl">
                <input
                  value={details.password}
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                  placeholder="Password"
                  className="w-full bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none"
                  type={passwordShow ? "text" : "password"}
                />
                <button
                  onClick={() => setPasswordShow(!passwordShow)}
                  type="button"
                  className="text-gray-700 ml-2"
                >
                  {passwordShow ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="text-right">
                <p className="text-sm text-white">
                  Forgot Password?{" "}
                  <span
                    onClick={() => navigate("/forgatePass")}
                    className="text-sky-400 cursor-pointer hover:underline"
                  >
                    Click Here
                  </span>
                </p>
              </div>

              <button
                className="w-full bg-violet-400 hover:bg-violet-500 text-white font-semibold py-2 rounded-xl transition"
                type="submit"
              >
                Submit
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/30"></div>
                <p className="text-white text-sm">or</p>
                <div className="flex-1 h-px bg-white/30"></div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 rounded-xl transition"
              >
                SIGN UP
              </button>
            </form>
          </main>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Login;