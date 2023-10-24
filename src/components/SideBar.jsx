import { useEffect, useState } from "react";
import { useAccountContext } from "../Context/AccountContext";
import { FormCreatingChannel } from "./Forms/FormCreatingChannel";
import { axiosFetch } from "../api/api-get";
import { NavLink } from "react-router-dom";

export function SideBar() {
  const {
    dispatch,
    state: { isOpenChannelForm, workSpaceName },
  } = useAccountContext();

  const [isChannelHideList, setIsChannelHideList] = useState(true);
  const [isDirectMessageList, setIsDirectMessageList] = useState(true);

  useEffect(() => {
    async function getAllChannels() {
      try {
        const res = await axiosFetch.get(`/channels`);
        const allChannel = res.data.data;
        localStorage.setItem("getAllChannels", JSON.stringify(allChannel));
        dispatch({ type: "GET_ALL_CHANNELS", payload: allChannel });
      } catch (error) {
        console.log("Error getting channels");
      }
    }
    getAllChannels();
  }, [dispatch]);

  return (
    <section className="bg-[rgba(255,255,255,0.75)]">
      <div className=" text-3xl font-bold h-[5rem] border-b-[1px] border-b-gray-400 p-6 flex gap-2 items-center justify-between">
        <p>
          <span>{workSpaceName || "Avion School"}</span>
          <i className="fa-solid fa-angle-down ml-2 text-xl"></i>
        </p>

        <i className="fa-regular fa-pen-to-square text-gray-600 text-2xl"></i>
      </div>
      <div className="relative p-6 ">
        <p className="text-2xl py-3 text-gray-600 font-medium rounded-md mb-4 cursor-pointer">
          <span
            onClick={() => setIsChannelHideList((list) => !list)}
            className="hover:bg-[rgba(255,255,255,0.25)] py-1 px-2 rounded-lg "
          >
            <i
              className={`${
                isChannelHideList
                  ? "fa-solid fa-caret-down"
                  : "fa-solid fa-caret-right"
              } `}
            ></i>{" "}
          </span>
          <span className="btn__channel hover:bg-[rgba(255,255,255,0.25)] py-2 pl-4 pr-8 rounded-lg relative ">
            Channels{" "}
            <i className="fa-solid fa-angle-down absolute right-2 text-[1.2rem] top-5 hidden"></i>
          </span>
        </p>

        {isChannelHideList && <AllChannelList />}

        <p className="relative text-2xl py-3 text-gray-600 font-medium rounded-md  hover:cursor-pointer">
          <i
            className="fa-solid fa-plus mr-2"
            onClick={() => {
              dispatch({
                type: "SHOW_MODAL",
                payload: { name: "isOpenChannelForm", value: true },
              });
            }}
          ></i>{" "}
          Add Channels
        </p>
        <p className="text-2xl py-3 text-gray-600 font-medium rounded-md mb-4 cursor-pointer">
          <span
            onClick={() => setIsDirectMessageList((msg) => !msg)}
            className="hover:bg-[rgba(255,255,255,0.25)] py-1 px-2 rounded-lg "
          >
            <i
              className={`${
                isDirectMessageList
                  ? "fa-solid fa-caret-down"
                  : "fa-solid fa-caret-right"
              } `}
            ></i>{" "}
          </span>
          Direct messages
        </p>
        {isDirectMessageList && <AllDirectMessage />}
      </div>

      {isOpenChannelForm && <FormCreatingChannel />}
    </section>
  );
}

function AllDirectMessage() {
  const {
    state: { allDirectMessage, accountLogIn },
    dispatch,
  } = useAccountContext();
  return (
    <ul>
      {allDirectMessage.map((user) => (
        <NavLink
          key={user?.id}
          onClick={() => dispatch({ type: "SELECTED_USER", payload: user })}
          to={`/dashboard/directMessage/${user?.id}`}
          className="user__list text-2xl flex gap-4 ml-4 mb-2 font-medium text-slate-600 py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-[#daa5dc] hover:text-white "
        >
          <li className=" flex gap-4">
            <img src={user?.image} alt="" className="w-8 rounded-lg" />
            <span>
              {user?.name} {accountLogIn.id === user?.id ? "(you)" : ""}{" "}
            </span>
            <span
              onClick={() =>
                dispatch({
                  type: "DELETE_USER_DIRECT_MESSAGE",
                  payload: user.id,
                })
              }
              className="btn__delete hidden"
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          </li>
        </NavLink>
      ))}
    </ul>
  );
}

function AllChannelList() {
  const {
    state: { allChannels },
  } = useAccountContext();

  return (
    <ul>
      {allChannels.map((channel) => (
        <NavLink
          key={channel.id}
          to={`${channel.id}`}
          className="channel__list text-2xl flex gap-4 ml-4 mb-2 font-medium text-slate-600 py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-[#daa5dc] hover:text-white "
        >
          <li className=" flex gap-4">
            <span>
              <i className="fa-solid fa-hashtag"></i>
            </span>
            <span>{channel?.name}</span>
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
