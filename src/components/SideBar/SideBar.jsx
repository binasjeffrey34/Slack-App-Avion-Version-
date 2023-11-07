import { useState } from "react";
import { useAccountContext } from "../../Context/AccountContext";
import { FormCreatingChannel } from "../Forms/FormCreatingChannel";
import useAllChannels from "../../hooks/useAllChannels";
import { AllChannelList } from "./AllChannelList";
import { AllDirectMessage } from "./AllDirectMessage";

export function SideBar() {
  const [isChannelHideList, setIsChannelHideList] = useState(true);
  const [isDirectMessageList, setIsDirectMessageList] = useState(true);
  const {
    state: { isOpenChannelForm, workSpaceName },
    handleModal,
  } = useAccountContext();

  useAllChannels();

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
            onClick={() => handleModal("isOpenChannelForm", true)}
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