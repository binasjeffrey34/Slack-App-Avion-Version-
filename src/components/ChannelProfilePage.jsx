import { Link, useNavigate, useParams } from "react-router-dom";
import { useAccountContext } from "../Context/AccountContext";
import { useEffect } from "react";

export function ChannelProfilePage({ channelId }) {
  const { state, dispatch } = useAccountContext();
  const { allUsers, selectedUser } = state;
  const { userId } = useParams();
  const navigate = useNavigate();
  const option = {
    hour: "numeric",
    minute: "numeric",
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("selectedUser"));

    if (storedUser && storedUser.id === +userId) {
      dispatch({ type: "SELECTED_USER", payload: storedUser });
    } else {
      const user = allUsers.find((user) => user.id === +userId);

      if (user) {
        dispatch({ type: "SELECTED_USER", payload: user });
        localStorage.setItem("selectedUser", JSON.stringify(user));
      }
    }
  }, [userId, allUsers, dispatch]);

  return (
    <section className="bg-white w-[45rem]  text-xl border-l-[1px]">
      <div className=" h-[5rem] border-b-[1px] flex items-center justify-between px-8 text-3xl text-slate-800">
        <h1 className=" font-bold">Profile</h1>
        <i
          className="fa-solid fa-xmark cursor-pointer"
          onClick={() => {
            dispatch({
              type: "SHOW_MODAL",
              payload: { name: "isProfileOpen", value: false },
            });
            navigate(`/dashboard/${channelId}`);
          }}
        ></i>
      </div>
      <div className="p-8  border-b-[1px]">
        <img
          src={selectedUser?.image}
          alt=""
          className="w-96 rounded-lg mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          {selectedUser?.name}
        </h1>
        <p className="flex gap-2 items-center mb-6 text-2xl">
          <i className="fa-regular fa-clock"></i>{" "}
          <span>
            {new Intl.DateTimeFormat(navigator.language, option).format(
              new Date()
            )}
          </span>
          <span>local time</span>
        </p>
        <Link
          to={`/dashboard/directMessage/${userId}`}
          onClick={() => {
            dispatch({
              type: "SHOW_MODAL",
              payload: { name: "isProfileOpen", value: false },
            });
            dispatch({ type: "STORE_TO_DIRECT_MESSAGE", payload: userId });
          }}
        >
          <button className="w-full py-3 rounded-md border-[1px] border-slate-400 font-medium text-2xl ">
            {" "}
            <i className="fa-regular fa-comment"></i> Message
          </button>
        </Link>
      </div>

      <div className="p-8 ">
        <h2 className="font-bold mb-6 text-2xl text-slate-700">
          Contact Information
        </h2>
        <div className="flex items-center gap-4">
          <i className="fa-regular fa-envelope p-4 rounded-lg bg-gray-100 text-3xl"></i>
          <p>
            <span className="block text-gray-400 font-medium mb-1">
              Email Address
            </span>
            <a
              href="#"
              className="hover:underline hover:cursor-pointer text-2xl text-blue-600"
            >
              {selectedUser?.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
