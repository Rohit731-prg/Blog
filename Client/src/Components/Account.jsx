import { Toaster } from "react-hot-toast";
import Sidebar from "./Auth/Sidebar";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Account() {
  const [image, setImage] = useState(null);
  const [preImage, setPreImage] = useState(false);
  const { user, logOut, accountDetailsFun, accountDetails, updateImage } = useUserStore();
  const navigate = useNavigate();
  const handelLogout = async () => {
    await logOut();
    localStorage.setItem("adminToken", "false");
    navigate("/");
  };

  const infoList = [
    { id: 1, name: "Total Upload Posts", value: accountDetails?.total_posts ? accountDetails?.total_posts : 0 },
    { id: 2, name: "Total Save Post", value: accountDetails?.total_save ? accountDetails?.total_save : 0  },
    { id: 3, name: "Total Likes", value: accountDetails?.total_likes ? accountDetails?.total_likes : 0  },
    { id: 4, name: "Total Comments", value: accountDetails?.total_comments ? accountDetails?.total_comments : 0  },
    { id: 5, name: "Total views", value: accountDetails?.total_views ? accountDetails?.total_views : 0  },
  ];

  const handelUpdateImage = async () => {
      await updateImage(image)
  }
  useEffect(() => {
    accountDetailsFun();
  }, []);
  return (
    <main className="min-h-screen bg-[#f9f9f9] text-gray-800 font-primary">
      <Sidebar />

      <aside className="ml-72 px-20 py-10">
        <section className="w-full flex flex-row justify-between items-center py-5 border-b-2 border-gray-400">
          <p>{user.name.split(" ")[0]}'s Account</p>
          <button
            className="px-10 py-2 rounded-full bg-red-600 text-white font-medium shadow-xl shadow-balck transition hover:scale-105"
            onClick={handelLogout}
          >
            SIGN OUT
          </button>
        </section>
        <section className="flex flex-row gap-20 mt-10">
          <section>
            <img
              src={preImage ? URL.createObjectURL(image) : user?.image}
              alt=""
              className="w-60 h-60 object-cover rounded-sm"
            />
            
            <button className="my-3 px-10 py-3 bg-cyan-500 font-medium rounded-full" onClick={() => {}}>
              Change Profile Image
            </button>

            <div className="mt-10">
              <p className="text-2xl font-medium">{user.name}</p>
              <p className="text-[16px] text-gray-500">{user.email}</p>

              {/* <p>Account create Date: {user?.createdAt.split("T")[0]}</p> */}
            </div>

          </section>
          <section>
            <p className="text-2xl font-medium ">{user?.name.split(" ")[0]}'s Post Information</p>

            <aside className="grid grid-cols-3 gap-5 mt-10">
              {infoList.map((info) => (
                <div key={info.id} className="px-10 py-5 rounded-lg bg-amber-300 text-center">
                    <p className="text-lg font-medium">{info.name}</p>
                    <p className="text-2xl text-gray-600 font-semibold">{info.value ? info.value : 0 }</p>
                </div>
              ))}
            </aside>
          </section>
          
        </section>
      </aside>
      <Toaster />
    </main>
  );
}

export default Account;
